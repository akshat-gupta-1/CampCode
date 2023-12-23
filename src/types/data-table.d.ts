import '@tanstack/react-table';
declare module '@tanstack/react-table' {
  interface SortingFns {
    difficulty: SortingFn<unknown>;
  }
}
