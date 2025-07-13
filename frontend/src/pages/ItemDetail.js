import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../state/DataContext";

const fetchItem = async (id) => {
  const res = await fetch(`${API_BASE_URL}/${id}`);

  if (!res.ok) {
    const errorBody = await res.json(); // get the real error message
    throw new Error(errorBody.error || `HTTP error: ${res.status}`);
  }

  const json = await res.json();
  return json;
};

function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    const loadItem = async () => {
      setIsLoading(true);
      try {
        const fetchedItem = await fetchItem(id);
        if (!active) return;
        setItem(fetchedItem);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    loadItem();
    return () => {
      active = false;
    };
  }, [id, navigate, fetchItem, setItem]);

  if (isLoading) return <p>Loading...</p>;

  if (item === null) return <p>Item not found or failed to load.</p>;

  return (
    <div style={{ padding: 16 }}>
      <h2>{item.name}</h2>
      <p>
        <strong>Category:</strong> {item.category}
      </p>
      <p>
        <strong>Price:</strong> ${item.price}
      </p>
    </div>
  );
}

export default ItemDetail;
