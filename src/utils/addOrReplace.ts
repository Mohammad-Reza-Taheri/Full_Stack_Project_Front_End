// export const addOrReplace = (arr:T, newItem, key = 'cat_id') => {
//   const index = arr.findIndex(item => item[key] === newItem[key]);
//   if (index === -1) return [...arr, newItem];
//   return arr.map((item, i) => (i === index ? newItem : item));
// };

export function addOrReplace<T, K extends keyof T>(
  arr: T[],
  newItem: T,
  key: K
): T[] {
  const index = arr.findIndex(item => item[key] === newItem[key]);
  if (index === -1) return [...arr, newItem];
  return arr.map((item, i) => (i === index ? newItem : item));
}
