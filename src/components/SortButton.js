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
          <p>Trier par :</p>
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
            className={sortValue === "asc" ? "selected" : ""}
          >
            <FontAwesomeIcon icon="arrow-up-wide-short" />
            <p>Prix croissant</p>
          </button>
          <button
            onClick={() => {
              setSortValue("desc");
              setSortBox(!sortBox);
            }}
            className={sortValue === "desc" ? "selected" : ""}
          >
            <FontAwesomeIcon icon="arrow-down-wide-short" />
            <p>Prix décroissant</p>
          </button>
          <div></div>
        </div>
      )}{" "}
    </div>
  );
};

export default SortButton;
