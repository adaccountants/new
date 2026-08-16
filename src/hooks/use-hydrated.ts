import { useEffect, useState } from "react";

/** False during SSR and the first client render, then true. Avoids hydration mismatches. */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated;
}
