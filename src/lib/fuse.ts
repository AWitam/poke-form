import Fuse, { IFuseOptions } from "fuse.js";

export const createFuseInstance = <T>(data: T[], options: IFuseOptions<T>) =>
  new Fuse(data, options);
