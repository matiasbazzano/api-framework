export interface Response<T> {
  data: T | null;
  status: number;
  headers: unknown;
}
