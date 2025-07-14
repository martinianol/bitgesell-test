import React from "react";
import styled from "styled-components";

const SearchInput = ({ searchValue, onChange }) => {
  return (
    <StyledInput
      id="search-input"
      type="text"
      value={searchValue}
      placeholder="Search items..."
      onChange={onChange}
    />
  );
};

export default SearchInput;

const StyledInput = styled.input`
  width: 400px;
`;
