import axios from "axios";
import { useEffect, useState } from "react";

export default function Cats({ keywordSearch } : { keywordSearch : string }) {
  const [cats, setCats] = useState<string[]>();

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://cataas.com/api/tags",
    })
      .then((response) => {
        if (response.data) {
          const result = response.data;
          const filtered = result.filter((_word : string) =>
            _word.includes(keywordSearch)
          );
          const catLimit = filtered.slice(0, 10);
          setCats(catLimit);
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, []);
  return (
    <ul>
      {cats?.map((cat: string, index: number) => {
        return <li key={index}>{cat}</li>;
      })}
    </ul>
  );
}
