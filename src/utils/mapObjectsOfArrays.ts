import { mapObject } from './mapObject';

export function mapObjectsOfArrays<
  T extends Record<string, any>,
  K extends keyof T,
>(sourceArray: T[], excludeKeys: K[]): Array<Omit<T, K>> {
  return sourceArray.map((sourceObj) => mapObject(sourceObj, excludeKeys));
}
