import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useData } from "../state/DataContext";
import { FixedSizeList as List } from "react-window";
import SearchInput from "../components/SearchInput";
import Pagination from "../components/Pagination";
import ListItem from "../components/ListItem";
import ListLoader from "../components/ListLoader";

const LIMIT = 100;

function Items() {
  const { items, fetchItems, setItems, setTotal, total } = useData();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  // Better to do it with react-query...
  const [isLoading, setIsLoading] = useState(false);
  const totalPages = useMemo(() => Math.ceil(total / LIMIT), [total]);

  useEffect(() => {
    let active = true;

    const loadItems = async () => {
      setIsLoading(true);
      try {
        const { items: fetchedItems, total } = await fetchItems({
          q: search,
          limit: LIMIT,
          offset: page * LIMIT,
        });
        setItems(fetchedItems);
        setTotal(total);
        setIsLoading(false);
      } catch (error) {
        if (active) {
          console.error(error);
        }
        setIsLoading(false);
      }
    };

    loadItems();

    return () => {
      active = false;
    };
  }, [fetchItems, page, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(0);
  };

  const handlePagination = (direction) => {
    setPage((prev) => prev + direction);
  };

  return (
    <ItemsContainer>
      <SearchInput searchValue={search} onChange={handleSearchChange} />
      {isLoading ? (
        <ListLoader />
      ) : (
        <List
          height={600}
          itemCount={items.length}
          itemSize={40}
          width="100%"
          itemData={items}
        >
          {ListItem}
        </List>
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        onChangePage={handlePagination}
      />
    </ItemsContainer>
  );
}

export default Items;

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
