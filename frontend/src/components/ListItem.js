import React from "react";
import { Link } from "react-router-dom";

const ListItem = ({ index, style, data }) => {
  const item = data[index];
  return (
    <div style={style} key={item.id}>
      <Link to={`/items/${item.id}`}>{item.name}</Link>
    </div>
  );
};

export default ListItem;
