const Pagination = ({ page, totalPages, onChangePage }) => {
  // I prefer to do it like this. removes inline, clear and easier to test
  const handlePrev = () => onChangePage(-1);
  const handleNext = () => onChangePage(1);

  return (
    <div>
      <button disabled={page === 0} onClick={handlePrev}>
        Prev
      </button>
      <span>
        {" "}
        Page {page + 1} of {totalPages}{" "}
      </span>
      <button disabled={page + 1 >= totalPages} onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
