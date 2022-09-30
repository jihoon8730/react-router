import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Cats({ keywordSearch }) {
  const [cats, setCats] = useState();

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://cataas.com/api/tags",
    })
      .then((response) => {
        if (response.data) {
          const result = response.data;
          const filtered = result.filter((_word) =>
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
      {cats?.map((cat, index) => {
        return <li key={index}>{cat}</li>;
      })}
    </ul>
  );
}
