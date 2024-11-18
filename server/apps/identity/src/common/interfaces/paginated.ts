export interface Edge<T> {
  cursor: string;
  node: T;
}

export interface PageInfo {
  endCursor: string;
  startCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface Paginated<T> {
  previousCount: number;
  currentCount: number;
  edges: Edge<T>[];
  pageInfo: PageInfo;
}
