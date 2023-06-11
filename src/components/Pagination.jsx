const Pagination = ({ prev, next, onPrevios, OnNetx }) => {
  const handlePrevious = () => {
    onPrevios();
  };
  const handleNext = () => {
    OnNetx();
  };

  return (
    <nav>
      <ul>
        {prev ? (
          
            <button className="pagination-button" onClick={handlePrevious}>Previous</button>
          
        ) : null}
        {next ? (
          
            <button className="pagination-button" onClick={handleNext}>Next</button>
          
        ) : null}
      </ul>
    </nav>
  );
};

export default Pagination;
