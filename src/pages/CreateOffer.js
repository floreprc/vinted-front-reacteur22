import { useState } from "react";
import Loading from "../components/Loading";
import { Link, Navigate } from "react-router-dom";
import imgPublish from "../assets/img/published.svg";
import "./CreateOffer.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CreateOffer = ({ token, setNewOfferSubmited, newOfferSubmited }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [picture, setPicture] = useState();
  const [errorMessageOffer, setErrorMessageOffer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitNewOffer = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      const data = new FormData();
      data.append("title", title);
      data.append("description", description);
      data.append("price", price);
      data.append("condition", condition);
      data.append("city", city);
      data.append("brand", brand);
      data.append("size", size);
      data.append("color", color);
      data.append("picture", picture);
      //   console.log(data);
      const response = await axios.post(
        "https://vinted-reacteur22.herokuapp.com/offer/publish",
        data,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setNewOfferSubmited(true);
      console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 400) {
        setErrorMessageOffer(
          `L'offre n'est pas complète ou des éléments sont incorrects (plus d'informations : ${error.response.data} `
        );
      }
    }
  };

  return token ? (
    <div className="create-offer-page">
      {newOfferSubmited ? (
        <div className="offer-published wrapped">
          <img src={imgPublish} alt="offer published" />
          <p> Votre annonce a bien été publiée !</p>
          <div className="published-buttons">
            <Link to="/" onClick={() => setNewOfferSubmited(false)}>
              <button>Retour à l'accueil</button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <h2 className="wrapped">Vends ton article</h2>
          {isLoading ? (
            <Loading />
          ) : (
            <div className="wrapped">
              <form onSubmit={submitNewOffer}>
                <div className="picture-button">
                  <input
                    type="file"
                    onChange={(event) => setPicture(event.target.files[0])}
                  />
                  <div>
                    <FontAwesomeIcon icon="plus" />
                    Ajoute une photo
                  </div>
                  {picture && <p>{picture.name}</p>}
                </div>
                <div>
                  <label>
                    <p>Titre</p>{" "}
                    <input
                      type="text"
                      placeholder="ex: Chemise Sézane verte"
                      onChange={(event) => {
                        setTitle(event.target.value);
                      }}
                    />
                  </label>
                  <label>
                    <p>Décris ton article</p>
                    <input
                      type="text"
                      placeholder="ex: porté quelques fois, taille correctement"
                      onChange={(event) => {
                        setDescription(event.target.value);
                      }}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    <p>Marque</p>
                    <input
                      type="text"
                      placeholder="ex: Zara"
                      onChange={(event) => {
                        setBrand(event.target.value);
                      }}
                    />
                  </label>{" "}
                  <label>
                    <p>Taille</p>
                    <input
                      type="text"
                      placeholder="ex: L / 40 / 12"
                      onChange={(event) => {
                        setSize(event.target.value);
                      }}
                    />
                  </label>{" "}
                  <label>
                    <p>Couleur</p>
                    <input
                      type="text"
                      placeholder="ex: Fushia"
                      onChange={(event) => {
                        setColor(event.target.value);
                      }}
                    />
                  </label>{" "}
                  <label>
                    <p>Etat</p>
                    <input
                      type="text"
                      placeholder="ex: Neuf avec étiquette"
                      onChange={(event) => {
                        setCondition(event.target.value);
                      }}
                    />
                  </label>{" "}
                  <label>
                    <p>Lieu</p>
                    <input
                      type="text"
                      placeholder="ex: Paris"
                      onChange={(event) => {
                        setCity(event.target.value);
                      }}
                    />
                  </label>
                </div>
                <div>
                  <div>
                    <label>
                      <p>Prix</p>
                      <input
                        type="number"
                        placeholder="0.00€"
                        onChange={(event) => {
                          setPrice(event.target.value);
                        }}
                      />
                    </label>
                  </div>

                  <div className="exchange-box">
                    <label>
                      <input type="checkbox" />
                      Je suis intéressé(e) par les échanges
                    </label>
                  </div>
                </div>

                <button className="add-an-item" type="submit">
                  Ajouter
                </button>
                <p className="error-message">{errorMessageOffer}</p>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default CreateOffer;
