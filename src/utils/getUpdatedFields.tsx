export const getUpdatedFields = (original: any, updated: any) => {
  const updatedFields: any = {};
  for (const key in updated) {
    if (updated[key] !== original[key]) {
      updatedFields[key] = updated[key];
    }
  }
  return updatedFields;
};

export const getChangedFields = (original: any, updated: any): any => {
  const changes: any = {};

  for (const key in updated) {
    // Handle arrays of objects
    if (Array.isArray(updated[key]) && Array.isArray(original[key])) {
      const originalArray = original[key];
      const updatedArray = updated[key];
      const arrayChanges = [];

      updatedArray.forEach((updatedItem: any, index: number) => {
        const originalItem = originalArray[index];
        if (!originalItem) {
          // New item added
          arrayChanges.push(updatedItem);
        } else {
          // Check if any key in the object has changed
          const itemChanges = getChangedFields(originalItem, updatedItem);
          if (Object.keys(itemChanges).length > 0) {
            // If any key changes, include the entire updated object
            arrayChanges.push(updatedItem);
          }
        }
      });

      // Add removed items from the original array
      if (originalArray.length > updatedArray.length) {
        for (let i = updatedArray.length; i < originalArray.length; i++) {
          arrayChanges.push({ ...originalArray[i], _removed: true });
        }
      }

      if (arrayChanges.length > 0) {
        changes[key] = arrayChanges;
      }
    }
    // Handle nested objects
    else if (
      typeof updated[key] === "object" &&
      updated[key] !== null &&
      typeof original[key] === "object" &&
      original[key] !== null
    ) {
      const nestedChanges = getChangedFields(original[key], updated[key]);
      if (Object.keys(nestedChanges).length > 0) {
        changes[key] = nestedChanges;
      }
    }
    // Handle primitive values
    else if (updated[key] !== original[key]) {
      changes[key] = updated[key];
    }
  }

  return changes;
};
