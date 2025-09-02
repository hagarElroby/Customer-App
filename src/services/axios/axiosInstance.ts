import axios from "axios";
import { toast } from "sonner";
import qs from "qs";
import { cleanAllUndefined } from "@/utils/filterUndefined";
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  paramsSerializer: (params) =>
    qs.stringify(params, {
      arrayFormat: "repeat",
    }),
  headers: {
    "Content-Type": "application/json",
    app: "Dizzly",
    version: "1",
    os: "Web",
  },
});

let failedRequestsQueue: [] = [];

axiosInstance.interceptors.request.use(
  (request: any) => {
    const jwtToken = localStorage.getItem("jwtToken");

    // Exclude certain paths from attaching the Authorization header
    if (
      !["/login", "/signup", "/users/refreshToken"].includes(request.url) &&
      jwtToken
    ) {
      request.headers["Authorization"] = `Bearer ${jwtToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.request.use((config) => {
  // Only clean plain objects, not FormData or other non-plain types
  const isPlainObject = (val: unknown) =>
    val && typeof val === "object" && !(val instanceof FormData);

  if (config.data && isPlainObject(config.data)) {
    config.data = cleanAllUndefined(config.data);
  }

  return config;
});

//Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // handleing if there is no response from server
    if (!error.response) {
      if (!navigator.onLine) {
        toast.error(
          "No internet connection. Please check your network and try again.",
        );
        return Promise.reject(new Error("No internet connection"));
      } else {
        return Promise.reject(
          new Error("An unexpected error occurred. Please try again later."),
        );
      }
    }

    //check if no token login again
    if (
      error.response?.data?.flag == 120 ||
      error.response?.data?.flag == 113 ||
      error.response?.data?.flag == 140
    ) {
      localStorage.removeItem("user");
      // window.location.href = "/auth/login";
      // localStorage.removeItem("jwtToken");
      // localStorage.removeItem("refreshToken");
      failedRequestsQueue.forEach((req: any) =>
        req.reject("Refresh token is expired"),
      );
      failedRequestsQueue = [];
      return Promise.reject(new Error("Refresh token is expired"));
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
