export function transformJson(
  content: unknown | string,
  replacer?: (this: any, key: string, value: any) => any,
) {
  return JSON.stringify(content, replacer, 4);
}
