import homePicture from "../assets/img/home-picture.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://vinted-reacteur22.herokuapp.com/offers"
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="introPic">
        <img src={homePicture} alt="Thrift shop" />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="caroussel wrapped">
          {data.offers.map((elem, index) => {
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
        </div>
      )}
    </div>
  );
};

export default Home;
