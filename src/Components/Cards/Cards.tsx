import React from "react";
import styles from "./Cards.module.css";
import { Link } from "react-router-dom";

const Cards = ({
  search,
  id,
  price,
  title,
  image,
  bag = false,
  product = true,
}: {
  search: string;
  id: string;
  price: number;
  title: string;
  image: string;
  bag?: boolean;
  product?: boolean;
}) => {
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

            <img
              src={image.replace("I", "W")}
              alt={title}
              className={styles["card__image"]}
            />
            <p className={styles["card__description"]}>{title}</p>
          </div>
        </Link>
      )}
    </>
  );
};

export default Cards;
