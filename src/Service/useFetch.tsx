import React from "react";

function useFetch<T>(url: RequestInfo | URL, options?: RequestInit) {
  const [data, setData] = React.useState<T | null>(null);
  const [erro, setErro] = React.useState<string | null>(null);

  React.useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      setData(null);
      setErro(null);
      try {
        const response = await fetch(url, {
          signal,
          ...options,
        });
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const json = (await response.json()) as T;
        if (!signal.aborted) setData(json);
      } catch (erro) {
        if (erro instanceof Error) setErro(erro.message);
      }
    };
    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, erro };
}

export default useFetch;
