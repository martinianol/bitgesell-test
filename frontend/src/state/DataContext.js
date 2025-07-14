import React, { createContext, useCallback, useContext, useState } from "react";
export const API_BASE_URL = "http://localhost:3001/api/items";
const DataContext = createContext();

export function DataProvider({ children }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchItems = useCallback(
    async ({ q = "", limit = 10, offset = 0 } = {}) => {
      // Encode query param to safely handle spaces and special characters in URLs (e.g. "Desk & Chair")
      const res = await fetch(
        `${API_BASE_URL}?q=${encodeURIComponent(
          q
        )}&limit=${limit}&offset=${offset}`
      );
      const json = await res.json();
      return json;
    },
    []
  );

  return (
    <DataContext.Provider
      value={{ items, total, fetchItems, setItems, setTotal }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
