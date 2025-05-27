export const Flags = {
  100: { flag: "100", description: "Firebase ID token has invalid signature." },
  101: { flag: "101", description: "User Already Exist !!" },
  102: { flag: "102", description: "Password Not Valid." },
  103: { flag: "103", description: "User Not Found." },
  104: {
    flag: "104",
    description:
      "User does not have permission to access the desired resource.",
  },
  105: {
    flag: "105",
    description:
      "User is not  authorized to remove refresh token for the user.",
  },
  106: { flag: "106", description: "Invalid Token !!" },
  107: {
    flag: "107",
    description: "MisMatch between phone number and token phone number !!",
  },
  108: {
    flag: "108",
    description: "Too many attempts. Please try again after an hour.",
  },
  109: {
    flag: "109",
    description: "Please wait for a minute before trying again.",
  },
  110: { flag: "110", description: "Invalid OTP !!" },
  111: { flag: "111", description: "OTP Expired." },
  112: { flag: "112", description: "Too many attempts. Code Removed." },
  113: { flag: "113", description: "Token Is Expired !!" },
  114: { flag: "114", description: "File Extension Not Allowed !!" },
  115: { flag: "115", description: "File Size Exceeds the limit !!" },
  116: {
    flag: "116",
    description:
      "Your account is under review, please wait for the admin to approve.",
  },
  117: {
    flag: "117",
    description: " Your account is inactive, please contact customer support.",
  },
  118: {
    flag: "118",
    description: "Your account is blocked, please contact customer support.",
  },
  119: {
    flag: "119",
    description: "Your account is deleted, please contact customer support.",
  },
  120: { flag: "120", description: "Token required !!" },
  121: { flag: "121", description: "Category Already Exist." },
  122: { flag: "122", description: "Sub Category Already Exist." },
  123: { flag: "123", description: "Category Not Found." },
  124: { flag: "124", description: "Sub Category Not Found." },
  125: { flag: "125", description: "Subjects not found" },
  126: { flag: "126", description: "Notification not found." },
  127: {
    flag: "127",
    description: "there is no campaign with this time Range.",
  },
  128: { flag: "128", description: "Campaign Not Found." },
  129: { flag: "129", description: "System unit Already Exist." },
  130: { flag: "130", description: "Property Not Found." },
  131: { flag: "131", description: "Property Value Already Exist." },
  132: { flag: "132", description: "System Unit Not Found." },
  133: { flag: "133", description: "Sub Category Not Active." },
  134: { flag: "134", description: "Property Value Not Found." },
  135: { flag: "135", description: "Property Already Exist." },
  136: { flag: "136", description: "Seller Not Found." },
  137: { flag: "137", description: "Properties Miss Match With Sub Category." },
  138: {
    flag: "138",
    description: "Stock not match with the variation group.",
  },
  139: {
    flag: "139",
    description: "You should To Send pricing per unit and per quantity.",
  },
  140: { flag: "140", description: "Refresh Token Is Expired !!" },
  141: {
    flag: "141",
    description:
      "Your current balance is insufficient to cover the cost of the selected plan. Please add funds or choose a different plan.",
  },

  142: { flag: "142", description: "System Error pls contact administrator" },
  143: { flag: "143", description: "User plan id not found." },
  144: {
    flag: "144",
    description: "Number of sub categories exceeds the user plan limit.",
  },
  145: { flag: "145", description: "Coupon Code Already Exist." },
  169: { flag: "169", description: "nominal update !!" },
  170: { flag: "170", description: "application stopped !!" },
  171: { flag: "171", description: "application maintenance !!" },
} as const;
