import React, { useEffect, useState } from "react";
import { useData } from "../state/DataContext";
import { Link } from "react-router-dom";

function Items() {
  const { items, fetchItems, setItems, setTotal, total } = useData();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const limit = 10;

  useEffect(() => {
    let active = true;

    const loadItems = async () => {
      try {
        const { items: fetchedItems, total } = await fetchItems({
          q: search,
          limit,
          offset: page * limit,
        });
        setItems(fetchedItems);
        setTotal(total);
      } catch (error) {
        if (active) {
          console.error(error);
        }
      }
    };

    loadItems();

    return () => {
      active = false;
    };
  }, [fetchItems, page, search]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <input
        type="text"
        value={search}
        placeholder="Search items..."
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(0);
        }}
      />

      {!items.length ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <Link to={"/items/" + item.id}>{item.name}</Link>
            </li>
          ))}
        </ul>
      )}

      <div>
        <button disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>
        <span>
          {" "}
          Page {page + 1} of {totalPages}{" "}
        </span>
        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Items;
