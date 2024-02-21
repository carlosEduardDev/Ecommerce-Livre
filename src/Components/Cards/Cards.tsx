import React from "react";
import styles from "./Cards.module.css";
import { Link } from "react-router-dom";
import { ICard } from "../../Interfaces/Interfaces";
import { IoHeartOutline } from "react-icons/io5";

const Cards = ({
  search,
  id,
  price,
  title,
  image,
  bag = false,
  product = true,
}: ICard) => {
  return (
    <>
      {product && (
        <Link to={`${search}/${id}`}>
          <div className={styles.card}>
            <img src={image} alt={title} className={styles["card__image"]} />
            <IoHeartOutline
              color="var(--secundary-color)"
              className={styles.favorite}
            />
            <span className={styles.card__price}>
              {price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
            <p className={styles.card__description}>
              {title.substring(0, 35).concat("...")}
            </p>
            <button className={styles.card__button}>
              Adicionar ao carrinho
            </button>
          </div>
        </Link>
      )}
      {bag && (
        <div className={styles.card__bag}>
          <span className={styles.card__price}>
            {price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>

          <img src={image} alt={title} className={styles["card__image"]} />
          <p className={styles["card__description"]}>{title}</p>
        </div>
      )}
    </>
  );
};

export default Cards;
