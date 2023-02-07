import React, { useState, useEffect } from 'react';
import MyDataPrepApi from 'api/dataprep';

export default function useFetch(service, params) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setResponse(null);
    setError(null);
    if (service === 'getRecipeByName') {
      MyDataPrepApi.getRecipeByName(params).subscribe(
        (res) => {
          setResponse(res);
        },
        (err: Record<string, unknown>) => {
          setError(err);
        }
      );
    }
  }, [params]);

  return [response, error];
}
