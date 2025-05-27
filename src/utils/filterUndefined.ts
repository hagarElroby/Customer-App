// take updated data

export function filterUndefinedValues<T extends { [key: string]: any }>(
  obj: T,
): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== undefined),
  ) as T;
}

// remove undefined or empty values from an object
export const cleanParams = (params: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== undefined && value !== "",
    ),
  );
};

export function cleanParamsArray<T extends Record<string, any>>(
  params: T,
): Partial<T> {
  const cleanedParams: Partial<T> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      !(Array.isArray(value) && value.length === 0) // ⛔ skip empty arrays
    ) {
      cleanedParams[key as keyof T] = value;
    }
  });

  return cleanedParams;
}
