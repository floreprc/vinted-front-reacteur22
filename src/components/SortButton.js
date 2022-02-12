import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SortButton = ({
  setSortBox,
  sortBox,
  setPriceBox,
  sortValue,
  setSortValue,
}) => {
  return (
    <div className="filter">
      <button
        onClick={() => {
          setSortBox(!sortBox);
          setPriceBox(false);
        }}
      >
        <p>
          Trier par
          {sortValue === "asc" ? (
            <FontAwesomeIcon icon="arrow-up-wide-short" color="#09adb6" />
          ) : (
            <FontAwesomeIcon icon="arrow-down-wide-short" color="#09adb6" />
          )}
        </p>
        <FontAwesomeIcon icon="angle-down" />
      </button>
      {sortBox && (
        <div className="sortItems">
          <button
            onClick={() => {
              setSortValue("asc");
              setSortBox(!sortBox);
            }}
            className={sortValue === "asc" ? "selected-sort" : ""}
          >
            <FontAwesomeIcon icon="arrow-up-wide-short" />
            Prix croissant
          </button>
          <button
            onClick={() => {
              setSortValue("desc");
              setSortBox(!sortBox);
            }}
          >
            <FontAwesomeIcon icon="arrow-down-wide-short" />
            Prix décroissant
          </button>
          <div></div>
        </div>
      )}{" "}
    </div>
  );
};

export default SortButton;
