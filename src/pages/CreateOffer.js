import { useState } from "react";
import "./CreateOffer.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CreateOffer = ({ token, setNewOfferSubmited }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [picture, setPicture] = useState();

  const submitNewOffer = async (event) => {
    try {
      event.preventDefault();
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
      console.log(data);
      //   console.log(config);
      const response = await axios.post(
        "https://vinted-reacteur22.herokuapp.com/offer/publish",
        data,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setNewOfferSubmited(true);
      //   return <Navigate to="/" />;
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="create-offer-page">
      <h2 className="wrapped">Vends ton article</h2>
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
                placeholder="Paris"
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              />
            </label>
          </div>
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

            <div>
              <label>
                <input type="checkbox" />
                Je suis intéressé(e) par les échanges
              </label>
            </div>
          </div>
          <button className="add-an-item" type="submit">
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateOffer;
