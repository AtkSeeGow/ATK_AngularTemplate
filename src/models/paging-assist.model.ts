export class PagingAssist<T> {
  recordsCount: number = 0;
  currentIndex: number = 0;
  pageSize: number = 0;
  target: T[] = [];
}