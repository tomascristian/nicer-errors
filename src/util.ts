export { pipe, groupBy, map, toPairs as entries, forEach } from "remeda";

export const values = <T>(obj: { [k: string]: T }) => Object.values(obj);

export const minBy = <T>(fn: (arg: T) => number) => (arr: T[]) => {
  return arr.reduce((a, v) => fn(v) < fn(a) ? v : a);
};