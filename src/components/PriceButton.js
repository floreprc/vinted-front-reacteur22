// Button to sort result by a min or/and a max price

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PriceButton = ({
  setPriceBox,
  priceBox,
  setSortBox,
  minValue,
  setMinValue,
  maxValue,
  setMaxValue,
}) => {
  return (
    <div className="filter">
      {/* Button */}
      <button
        onClick={() => {
          setPriceBox(!priceBox);
          setSortBox(false);
        }}
        className={minValue || maxValue ? "selected" : ""}
      >
        <p>Prix</p>
        <FontAwesomeIcon icon="angle-down" />
      </button>
      {/* Popup */}
      {priceBox && (
        <div className="chooseAPrice">
          <form>
            <div className="price-selection">
              <div>
                {" "}
                <p>De</p>
                <input
                  type="number"
                  placeholder="EUR"
                  value={minValue}
                  onChange={(event) => {
                    setMinValue(Number(event.target.value));
                  }}
                />
              </div>
              <div>
                <p>À</p>
                <input
                  type="number"
                  placeholder="EUR"
                  value={maxValue}
                  onChange={(event) => {
                    setMaxValue(Number(event.target.value));
                  }}
                />
              </div>
            </div>{" "}
            <div className="buttons">
              <button
                type="submit"
                onClick={() => {
                  setPriceBox(false);
                }}
                className="validate"
              >
                Voir les articles
              </button>
              <button
                onClick={() => {
                  setPriceBox(false);
                  setMinValue();
                  setMaxValue();
                }}
                className={minValue || maxValue ? "delete" : "delete-off"}
              >
                <FontAwesomeIcon icon="trash" />
              </button>
            </div>
          </form>
          <div></div>
        </div>
      )}{" "}
    </div>
  );
};

export default PriceButton;
