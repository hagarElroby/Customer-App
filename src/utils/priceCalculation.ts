import { formatToTwoDecimals } from "./formatToTwoDecimals";

interface PriceCalculation {
    was: string;
    now: string;
    saving: string;
  }
  
 export const calculatePrices = (unit: number, vat: number, tax: number, discount: number): PriceCalculation => {
    const was = unit + unit * vat + unit * tax;
    const now = was - was * discount;
    const saving = was - now;
  
    return { was:formatToTwoDecimals(was), now:formatToTwoDecimals(now), saving:formatToTwoDecimals(saving) };
  };
  
  