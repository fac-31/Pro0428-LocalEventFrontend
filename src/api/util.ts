import { useContext, useEffect, useState } from 'react';
import { TokenContext } from '../config/TokenContext';

function GetFullURL(url: string) {
  return 'https://the-locals-9rzy9sh2cykj.deno.dev/' + url;
}

export function GetRouterAPI(url: string) {
  return SendRouterAPI(url, 'get');
}

export function SendRouterAPI(
  url: string,
  method: string,
  body: URLSearchParams | null = null,
) {
  const [result, setResult] = useState([]);

  const id = useContext(TokenContext);

  useEffect(() => {
    fetch(GetFullURL(url), {
      method: method,
      body: body,
      headers: {
        Authorization: id.token ? `Bearer ${id.token}` : '',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setResult(res);
      });
  }, [url, method, body, id]);

  return result;
}
