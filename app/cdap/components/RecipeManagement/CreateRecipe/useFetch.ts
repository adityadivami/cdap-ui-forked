import React, { useState, useEffect } from 'react';
import MyDataPrepApi from 'api/dataprep';

export default function useFetch(service, params) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setResponse(null);
    setError(null);
    console.log(MyDataPrepApi.getRecipeByName, 'this is MyDataPrepApi.getRecipeByName');
    console.log(service, 'this is service');
    service(params).subscribe(
      (res) => {
        console.log(res, 'this is res');
        setResponse(res);
      },
      (err: Record<string, unknown>) => {
        console.log(err, 'this is error');
        setError(err);
      }
    );
  }, [params]);

  return [response, error];
}
