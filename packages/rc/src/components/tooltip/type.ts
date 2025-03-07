export type ChildrenType<T> =
  | React.ReactNode
  | ((params: T) => React.ReactNode);
