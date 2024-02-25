import React from "react";
import styles from "./Cards.module.css";
import { Link } from "react-router-dom";
import { ICard, reduceCart, reduceFavorite } from "../../Interfaces/Interfaces";
import { IoHeartOutline, IoHeart, IoCloseCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addfavorites, removefavorites } from "../../Store/Favorite";
import { removecart } from "../../Store/Cart";
import { BsBagX } from "react-icons/bs";
import { togglecart } from "../../Store/OpenCart";

const Cards = ({
  search,
  id,
  price,
  title,
  image,
  bag = false,
  product = true,
  favorite = false,
}: ICard) => {
  const dispatch = useDispatch();
  const favoriteState = useSelector(
    (state: reduceFavorite) => state.favorite.item
  );
  const cartState = useSelector((state: reduceCart) => state.cart.items);
  const handleClickFavorite = () => {
    if (!favoriteState.filter((item) => item.id === id)[0]) {
      dispatch(addfavorites({ title, image, price, id }));
      alert("Produto adicionado a lista de favoritos!");
    }
  };

  return (
    <>
      {product && (
        <div className={styles.card}>
          <img src={image} alt={title} className={styles["card__image"]} />
          {favoriteState.filter((item) => item.id === id)[0] ? (
            <IoHeart
              color="var(--secundary-color)"
              className={styles.favorite_selected}
            />
          ) : (
            <IoHeartOutline
              color="var(--secundary-color)"
              className={styles.favorite}
              onClick={handleClickFavorite}
            />
          )}
          <span className={styles.card__price}>
            {price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
          <p className={styles.card__description}>
            {title.substring(0, 35).concat("...")}
          </p>{" "}
          <Link to={`${search}/${id}`} onClick={() => dispatch(togglecart(false))}>
            <button className={styles.card__button}>Ver mais</button>
          </Link>
        </div>
      )}
      {favorite && (
        <div className={styles.card__favorite}>
          <img src={image} alt={title} className={styles["card__image"]} />
          <div>
            <span className={styles.card__price}>
              {price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>

            <p className={styles["card__description"]}>{title}</p>
            <Link to={`/${search}/${id}`}>
              <button>Ver mais</button>
            </Link>
            {favoriteState[0] && (
              <IoCloseCircleOutline
                onClick={() => dispatch(removefavorites(id))}
                className={styles.closeBtn}
              />
            )}
          </div>
        </div>
      )}
      {bag && (
        <div className={styles.card__bag}>
          <img src={image} alt={title} className={styles["card__image"]} />
          <div className={styles.card__infos}>
            <span className={styles.card__price}>
              {price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>

            <p className={styles["card__description"]}>
              {title.substring(0, 40).concat('...')}
            </p>
          </div>{" "}
          {cartState[0] && (
            <BsBagX 
              onClick={() => dispatch(removecart(id))}
              className={styles.closeBtn}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Cards;
