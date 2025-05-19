import { useEffect, useState } from 'react';

export function FetchAPI(url: string) {
  const [result, setResult] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/' + url, { method: 'get' })
      .then((res) => res.json())
      .then((res) => {
        setResult(res);
      });
  }, [url]);

  return result;
}
