import { TaskProp } from "../types/types";


export const sortFn = (a: TaskProp, b: TaskProp,sortMethod:any): number => {
    if (sortMethod) {
      return a[sortMethod].localeCompare(b[sortMethod], "en", {
        sensitivity: "base",
      });
    }
    return 0;
  };