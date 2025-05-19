import { useContext, useEffect, useState } from 'react';
import { TokenContext } from '../config/TokenContext';

function GetFullURL(url: string) {
  return 'http://localhost:3000/' + url;
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

  const headers = {};
  const id = useContext(TokenContext);
  if (id.token) headers['Authorization'] = `Bearer ${id.token}`;

  useEffect(() => {
    fetch(GetFullURL(url), {
      method: method,
      body: body,
      headers: headers,
    })
      .then((res) => res.json())
      .then((res) => {
        setResult(res);
      });
  }, [url]);

  return result;
}

export async function SendClientAPI(
  url: string,
  method: string,
  body: URLSearchParams | null = null,
) {
  const result = await fetch(GetFullURL(url), {
    method: method,
    body: JSON.stringify(body),
  });

  return await result.json();
}
