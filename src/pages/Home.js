import homePicture from "../assets/img/home-picture.png";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import noResultPic from "../assets/img/no-result.svg";

const Home = ({
  resultsTab,
  isLoading,
  pageNumber,
  setPageNumber,
  resultsForEachPage,
}) => {
  return (
    <div>
      <div className="introPic">
        <img src={homePicture} alt="Thrift shop" />
        <div className="wrapped pop-up-position">
          <div className="pop-up-home">
            <h1>Prêts à faire du tri dans vos placards ?</h1>{" "}
            <Link to="/publish">
              <button>Vends maintenant</button>
            </Link>
          </div>
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="caroussel wrapped">
            {resultsTab.map((elem, index) => {
              return (
                <Link to={`/offer/${elem._id}`}>
                  <div key={elem._id} className="item-box">
                    <div className="profile">{elem.owner.account.username}</div>

                    <img src={elem.product_image.secure_url} alt="" />

                    <div className="main-info">
                      {elem.product_price} €{" "}
                      <FontAwesomeIcon icon="circle-info" />
                    </div>
                    <div className="other-infos">
                      <p>{elem.product_details[1].TAILLE}</p>
                      <p>{elem.product_details[0].MARQUE}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
            {resultsTab.length < 1 && (
              <div className="no-result-div">
                <img src={noResultPic} alt="no-result-pic" />
                <p>Oups ! Aucun résultat trouvé</p>
              </div>
            )}
          </div>
          <p>{pageNumber}</p>
          {pageNumber > 1 && (
            <button onClick={() => setPageNumber(pageNumber - 1)}>
              Page précédente
            </button>
          )}
          {resultsTab.length >= resultsForEachPage && (
            <button onClick={() => setPageNumber(pageNumber + 1)}>
              Page suivant
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
