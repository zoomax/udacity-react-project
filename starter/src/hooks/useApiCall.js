import { useState } from "react";

export const useApiCall = (api, onSuccess, onError) => {
  const [response, setResponse] = useState({
    data: null,
    isSuccess: false,
    isLoading: false,
    isIdle: true,
    isError: false,
    error: null,
  });
  const apiCall = async (payload) => {
    setResponse({
      ...response,
      isLoading: true,
      isIdle: false,
    });
    try {
      const res = await api(payload);
      const jsonRes = await res.json();
      setResponse({
        ...response,
        data: jsonRes,
        isLoading: false,
        isIdle: true,
        isSuccess: true,
      });
      onSuccess && onSuccess(jsonRes);
    } catch (e) {
      setResponse({
        ...response,
        data: null,
        isLoading: false,
        isIdle: true,
        isError: true,
      });
      onError && onError(e);
    }
  };
  return [apiCall, response];
};
