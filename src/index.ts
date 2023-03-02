import { useState } from 'react';

export type UseNetworkStateReturn<D> = {
  data: D | undefined;
  meta: {
    loading: boolean;
    error: boolean;
    errorMessage: string;
  };
  signal: AbortSignal;
  actions: {
    start: () => void;
    end: () => void;
    abort: () => void;
    resetError: () => void;
    setError: (message?: string) => void;
    setData: (data: D) => void;
    setLoading: (laoding: boolean) => void;
    resetSignal: () => void;
    setController: (controller: AbortController) => void;
  };
};

export default function useNetworkState<D = unknown>(): UseNetworkStateReturn<D> {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [data, setData] = useState<D>();
  const [controller, setController] = useState<AbortController>(new AbortController());

  const resetSignal = () => {
    setController(new AbortController());
  };

  return {
    data,
    meta: {
      loading,
      error,
      errorMessage,
    },
    signal: controller.signal,
    actions: {
      start: () => setLoading(true),
      end: () => setLoading(false),
      abort: () => {
        controller.abort();
        setLoading(false);
      },
      resetError: () => {
        setError(false);
        setErrorMessage('');
      },
      setError: (message = '') => {
        setLoading(false);
        setError(true);
        setErrorMessage(message);
      },
      setLoading: (loading: boolean) => setLoading(loading),
      setData: (data: D) => setData(data),
      resetSignal: () => resetSignal(),
      setController: (controller: AbortController) => setController(controller),
    },
  };
}
