import React from "react";
import styles from "./Cards.module.css";
import { Link } from "react-router-dom";
import { ICard } from "../../Interfaces/Interfaces";

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
            <div className={styles.card__filter}>Ver Mais</div>
            <span className={styles.card__price}>
              {price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>

            <img src={image} alt={title} className={styles["card__image"]} />
            <p className={styles["card__description"]}>{title}</p>
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
