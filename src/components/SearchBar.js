// Search bar (with price and sort buttons included)

import PriceButton from "./PriceButton";
import SortButton from "./SortButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = ({
  searchedText,
  setSearchedText,
  setPriceBox,
  priceBox,
  setSortBox,
  minValue,
  setMinValue,
  maxValue,
  setMaxValue,
  sortBox,
  sortValue,
  setSortValue,
  responsive,
}) => {
  return (
    <div className={"searching-inputs " + responsive}>
      <div className="searched-bar">
        <p className="search-icon">
          <FontAwesomeIcon icon="magnifying-glass" color="#5F5F5F" />
        </p>
        <input
          type="text"
          id="searched-bar-value"
          value={searchedText}
          placeholder="Rechercher des articles"
          onChange={(event) => {
            setSearchedText(event.target.value);
            console.log(searchedText);
          }}
        ></input>{" "}
        <p
          onClick={() => setSearchedText("")}
          className={
            searchedText ? "delete-search-icon" : "delete-search-icon-none"
          }
        >
          <FontAwesomeIcon icon="square-xmark" />
        </p>
      </div>

      <PriceButton
        setPriceBox={setPriceBox}
        priceBox={priceBox}
        setSortBox={setSortBox}
        minValue={minValue}
        setMinValue={setMinValue}
        maxValue={maxValue}
        setMaxValue={setMaxValue}
      />
      <SortButton
        setSortBox={setSortBox}
        sortBox={sortBox}
        setPriceBox={setPriceBox}
        sortValue={sortValue}
        setSortValue={setSortValue}
      />
    </div>
  );
};

export default SearchBar;
