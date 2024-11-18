export class GetAllResponse<T> {
  data: T[];
  total: number;
  take: number;
  skip: number;
}
