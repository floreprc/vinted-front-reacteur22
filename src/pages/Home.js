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
  token,
  setModalLogin,
}) => {
  return (
    <div>
      {/* Main image before the caroussel */}
      <div className="introPic">
        <img src={homePicture} alt="Thrift shop" />
        <div className="wrapped pop-up-position">
          <div className="pop-up-home">
            <h1>Prêts à faire du tri dans vos placards ?</h1>{" "}
            {token ? (
              <Link to="/publish">
                <button>Vends maintenant</button>
              </Link>
            ) : (
              <button onClick={() => setModalLogin(true)}>
                Vends maintenant
              </button>
            )}
          </div>
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {/* Caroussel with items */}
          <div className="caroussel wrapped">
            {resultsTab.map((elem, index) => {
              return (
                <Link to={`/offer/${elem._id}`}>
                  <div key={elem._id} className="item-box">
                    <div className="profile">{elem.owner.account.username}</div>

                    <img src={elem.product_image.secure_url} alt="" />

                    <div className="main-info">{elem.product_price} € </div>
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
          {/* Pagination */}
          <div className="pagination">
            {" "}
            {pageNumber > 1 && (
              <button onClick={() => setPageNumber(pageNumber - 1)}>
                <FontAwesomeIcon icon="circle-arrow-left" />
              </button>
            )}
            <p>{pageNumber}</p>
            {resultsTab.length >= resultsForEachPage && (
              <button onClick={() => setPageNumber(pageNumber + 1)}>
                <FontAwesomeIcon icon="circle-arrow-right" />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
