import React, { useEffect, useState } from "react";
import { useData } from "../state/DataContext";
import { Link } from "react-router-dom";
import { FixedSizeList as List } from "react-window";

function Items() {
  const { items, fetchItems, setItems, setTotal, total } = useData();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const limit = 100;

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

  const Row = ({ index, style }) => {
    const item = items[index];
    return (
      <div style={style} key={item.id}>
        <Link to={`/items/${item.id}`}>{item.name}</Link>
      </div>
    );
  };

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
        <List height={600} itemCount={items.length} itemSize={40} width="100%">
          {Row}
        </List>
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
