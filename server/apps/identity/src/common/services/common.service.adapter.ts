import { Base } from '@common/dtos/base.domain';
import { CursorTypeEnum } from '@common/dtos/cursorType';
import { getOppositeOrder, getQueryOrder, QueryOrderEnum } from '@common/enum/QueryCursorOrder.enum';
import { CommonService } from '@common/interfaces/common.service';
import { Paginated } from '@common/interfaces/paginated';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import {
  Brackets,
  FindOperator,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  QueryFailedError,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';




@Injectable()
export class CommonServiceAdapter extends CommonService {
  /**
   * Takes an entity array and returns the paginated type of that entity array
   * It uses cursor pagination as recommended in https://relay.dev/graphql/connections.htm
   */
  public paginate<T>(
    instances: T[],
    currentCount: number,
    previousCount: number,
    cursor: keyof T,
    first: number,
    innerCursor?: string,
  ): Paginated<T> {
    const pages: Paginated<T> = {
      currentCount,
      previousCount,
      edges: [],
      pageInfo: {
        endCursor: '',
        startCursor: '',
        hasPreviousPage: false,
        hasNextPage: false,
      },
    };
    const len = instances.length;

    if (len > 0) {
      for (let i = 0; i < len; i++) {
        pages.edges.push(
          CommonServiceAdapter.createEdge(instances[i], cursor, innerCursor),
        );
      }
      pages.pageInfo.startCursor = pages.edges[0].cursor;
      pages.pageInfo.endCursor = pages.edges[len - 1].cursor;
      pages.pageInfo.hasNextPage = currentCount > first;
      pages.pageInfo.hasPreviousPage = previousCount > 0;
    }

    return pages;
  }

  public formatTitle(title: string): string {
    return title
      .trim()
      .replace(/\n/g, ' ')
      .replace(/\s\s+/g, ' ')
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (l) => l.toUpperCase()));
  }

  public async validateEntity(entity: Base): Promise<void> {
    const errors = await validate(entity);

    if (errors.length > 0)
      throw new BadRequestException('Entity validation failed');
  }

  public override async saveEntity<T extends Base>(
    repo: Repository<T>,
    entity: T,
    message: string,
  ): Promise<T> {
    await this.validateEntity(entity);
    return this.throwDuplicateError(repo.save(entity), entity, message);
  }

  /**
   * Checks is an error is of the code 23505, PostgreSQL's duplicate value error,
   * and throws a conflict exception
   */
  public async throwDuplicateError<T>(
    promise: Promise<T>,
    entity: T,
    message?: string,
  ): Promise<T> {
    try {
      return await promise;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        // PostgreSQL
        if (error.driverError?.code === '23505') {
          throw new ConflictException(
            message ??
              `Valor duplicado en la base de datos para: ${JSON.stringify(entity)}`,
          );
        }
        // MySQL
        if (error.driverError?.code === 'ER_DUP_ENTRY') {
          throw new ConflictException(
            message ??
              `Valor duplicado en la base de datos para: ${JSON.stringify(entity)}`,
          );
        }
      } else {
        throw new BadRequestException(error);
      }
    }
  }

  public override async updateEntity<T extends Base>(
    repo: Repository<T>,
    entity: T,
    message: string,
  ): Promise<T> {
    await this.validateEntity(entity);
    return this.throwDuplicateError(repo.preload(entity), entity, message);
  }

  public async throwInternalError<T>(promise: Promise<T>): Promise<T> {
    try {
      return await promise;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private static getFilters<T>(
    cursor: keyof T,
    decoded: string | number | Date,
    order:
      | typeof MoreThan
      | typeof LessThan
      | typeof MoreThanOrEqual
      | typeof LessThanOrEqual,
    innerCursor?: string,
  ): Brackets | Record<string, FindOperator<any>> {
    // Verifica si hay un `innerCursor` para hacer un filtro anidado
    if (innerCursor) {
      return new Brackets((qb) => {
        qb.where(
          `${String(cursor)}.${innerCursor} ${order === MoreThan ? '>' : '<'} :decoded`,
          { decoded },
        );
      });
    }

    const operator = order(decoded);
    return {
      [String(cursor)]: operator,
    };
  }

  public async queryBuilderPagination<T>(
    alias: string,
    cursor: keyof T,
    cursorType: CursorTypeEnum,
    first: number,
    order: QueryOrderEnum,
    qb: SelectQueryBuilder<T>,
    after?: string,
    innerCursor?: string,
  ): Promise<Paginated<T>> {
    const aliasCursor = `${alias}.${String(cursor)}`;
    let prevCount = 0;

    // Si hay un cursor `after`, se decodifica y aplica en la consulta
    if (after) {
      const decoded = this.decodeCursor(after, cursorType);
      const oppositeOrder = getOppositeOrder(order);

      // Genera una consulta temporal para contar los resultados previos al cursor
      const tempQb = qb.clone();
      tempQb.andWhere(
        CommonServiceAdapter.getFilters(
          cursor,
          decoded,
          oppositeOrder,
          innerCursor,
        ),
      );
      prevCount = await tempQb.getCount();
      const normalOd = getQueryOrder(order);
      qb.andWhere(
        CommonServiceAdapter.getFilters(cursor, decoded, normalOd, innerCursor),
      );
    }

    // Clona el queryBuilder para contar el total sin límite
    const countQb = qb.clone();
    const condition = CommonService.getOrderBy(cursor, order, innerCursor);
    const [count, entities]: [number, T[]] = await this.throwInternalError(
      Promise.all([
        countQb.getCount(),
        qb.addSelect(`${alias}.*`)
          .orderBy(condition)
          .limit(first)
          .getMany(),
      ]),
    );

    // Retorna el resultado paginado
    return this.paginate(
      entities,
      count,
      prevCount,
      cursor,
      first,
      innerCursor,
    );
  }
}
