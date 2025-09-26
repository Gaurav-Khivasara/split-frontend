import { useEffect, useState } from "react";

export default function useDebounce(query, delay) {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query), delay);

    return () => clearTimeout(timeout);
  }, [query]);

  return debouncedQuery;
}