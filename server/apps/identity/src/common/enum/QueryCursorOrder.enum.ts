import {  LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual } from 'typeorm';

export type TypeOrderEnum = '$gt' | '$lt';
export type TypeOppositeOrder = '$gte' | '$lte';
export enum QueryOrderEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export const getQueryOrder = (order: QueryOrderEnum): typeof MoreThan | typeof LessThan =>
  order === QueryOrderEnum.ASC ? MoreThan : LessThan;

export const getOppositeOrder = (order: QueryOrderEnum): typeof MoreThanOrEqual | typeof LessThanOrEqual =>
  order === QueryOrderEnum.ASC ? LessThanOrEqual : MoreThanOrEqual; 
