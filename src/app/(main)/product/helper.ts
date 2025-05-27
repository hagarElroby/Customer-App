import React, { useEffect, useState } from "react";
import { QuantityAndPrice, Variation } from "@/types/product";

const extractVariations = (variations: QuantityAndPrice[]) => {
  const [selectedFeatures, setSelectedFeatures] = useState<
    Record<string, string>
  >({});

  // Flatten variations to create a map of all possible selectable values
  const allVariations = variations.flatMap((v) => v.variation);

  // Create a mapping of variation properties to available values
  const featuresToBeSelected = allVariations.reduce(
    (acc, item) => {
      if (!acc[item.propertyName]) {
        acc[item.propertyName] = [];
      }
      if (!acc[item.propertyName].includes(item.propertyValueName)) {
        acc[item.propertyName].push(item.propertyValueName);
      }
      return acc;
    },
    {} as { [key: string]: string[] },
  );

  // Find all variations that match selected features
  const matchedVariations = variations.filter((variationObject) =>
    Object.entries(selectedFeatures).every(([key, value]) =>
      variationObject.variation.some(
        (item) => item.propertyName === key && item.propertyValueName === value,
      ),
    ),
  );

  // Update selected features when an option is clicked
  const onFeatureSelectClicked = (key: string, value: string) => {
    setSelectedFeatures((prev) => {
      const updatedFeatures = { ...prev };
      if (updatedFeatures[key] === value) {
        delete updatedFeatures[key]; // Unselect if already selected
      } else {
        updatedFeatures[key] = value;
      }
      return updatedFeatures;
    });
  };

  // Find the corresponding variation based on selected features
  const getVariationByFeatures = (features: Record<string, string>) => {
    return variations.find((variationObject) =>
      Object.entries(features).every(([key, value]) =>
        variationObject.variation.some(
          (item) =>
            item.propertyName === key && item.propertyValueName === value,
        ),
      ),
    );
  };

  useEffect(() => {
    const allowedFeaturesToBeSelected = matchedVariations
      .flatMap((v) => v.variation)
      .reduce(
        (acc, item) => {
          if (!acc[item.propertyName]) {
            acc[item.propertyName] = [];
          }
          if (!acc[item.propertyName].includes(item.propertyValueName)) {
            acc[item.propertyName].push(item.propertyValueName);
          }
          return acc;
        },
        {} as { [key: string]: string[] },
      );

    setSelectedFeatures((prev) => {
      const updatedFeatures = { ...prev };
      let hasChanges = false;

      // Auto-select a feature if only one option is available
      Object.entries(allowedFeaturesToBeSelected).forEach(([key, values]) => {
        if (values.length === 1 && updatedFeatures[key] !== values[0]) {
          updatedFeatures[key] = values[0];
          hasChanges = true;
        }
      });

      return hasChanges ? updatedFeatures : prev;
    });
  }, []);

  return {
    featuresToBeSelected,
    allowedFeaturesToBeSelected: matchedVariations
      .flatMap((v) => v.variation)
      .reduce(
        (acc, item) => {
          if (!acc[item.propertyName]) {
            acc[item.propertyName] = [];
          }
          if (!acc[item.propertyName].includes(item.propertyValueName)) {
            acc[item.propertyName].push(item.propertyValueName);
          }
          return acc;
        },
        {} as { [key: string]: string[] },
      ),
    getVariation: getVariationByFeatures,
    onFeatureSelectClicked,
  };
};

export { extractVariations };
