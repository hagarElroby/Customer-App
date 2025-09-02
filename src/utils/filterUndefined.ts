// remove undefined or empty values from an object
export const cleanParams = (params: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== undefined && value !== "",
    ),
  );
};

export const cleanAllUndefined = <T>(obj: T): Partial<T> => {
  if (Array.isArray(obj)) {
    const cleanedArray = obj
      .map((item) => cleanAllUndefined(item))
      .filter((item) => {
        if (item == null) return false;
        if (Array.isArray(item)) return item.length > 0;
        if (typeof item === "object") return Object.keys(item).length > 0;
        return item !== "";
      });

    return cleanedArray as unknown as Partial<T>;
  }

  if (typeof obj === "object" && obj !== null) {
    const cleanedObj: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(obj)) {
      const cleanedValue = cleanAllUndefined(value);

      if (
        cleanedValue !== null &&
        cleanedValue !== undefined &&
        (!(typeof cleanedValue === "string") || cleanedValue !== "") &&
        !(Array.isArray(cleanedValue) && cleanedValue.length === 0) &&
        !(
          typeof cleanedValue === "object" &&
          !Array.isArray(cleanedValue) &&
          Object.keys(cleanedValue).length === 0
        )
      ) {
        cleanedObj[key] = cleanedValue;
      }
    }

    return cleanedObj as Partial<T>;
  }

  return obj;
};
