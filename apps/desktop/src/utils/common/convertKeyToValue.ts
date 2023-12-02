export function convertKeyToValue<K extends string, V>(targetKeys: K[], object: Record<K, V>): V[] {
  const valueArr = targetKeys.map((key) => object[key]);
  return valueArr;
}
