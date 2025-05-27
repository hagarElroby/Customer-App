import { useState, useEffect } from "react";

interface FetchDataParams<T> {
  apiFunction: (params: any) => Promise<T>;
  params?: any;
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
}

interface FetchDataState<T> {
  data: T | null;
  loading: boolean;
  error: any | null;
}

const useFetchData = <T>({
  apiFunction,
  params = {},
  onSuccess,
  onError,
}: FetchDataParams<T>): FetchDataState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiFunction({
          ...params,
          onSuccess: (response: T) => {
            setData(response);
            onSuccess?.(response);
          },
          onError: (err: any) => {
            setError(err);
            onError?.(err);
          },
        });
      } catch (err) {
        setError(err);
        onError?.(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useFetchData;
