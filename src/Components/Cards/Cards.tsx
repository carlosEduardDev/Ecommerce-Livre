import React from "react";
import styles from "./Cards.module.css";
import { useDispatch, useSelector } from "react-redux";
import { reduceProduct, reduceSearch } from "../../Interfaces/Interfaces";
import { fetchProduct } from "../../Store/productsFetch";

const Cards = () => {
  const search = useSelector((state: reduceSearch) => state.search.result);
  const { loading, data, error } = useSelector(
    (state: reduceProduct) => state.productsFetch
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    fetchProduct(search, dispatch);
  }, [search]);

  return (
    <section className={styles["sec-card"]}>
      {loading && <h1>Carregando...</h1>}
      {data &&
        data.results.map((product) => (
          <div className={styles['sec-card__card']} key={crypto.randomUUID()}>
            <div className={styles['sec-card__card__filter']}>Ver Mais</div>
            <span className={styles['sec-card__card__price']}>
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>

            <img
              src={product.thumbnail.replace('I', 'W')}
              alt={product.title}
              className={styles['sec-card__card__image']}
            />
            <p className={styles['sec-card__card__description']}>{product.title}</p>
          </div>
        ))}
    </section>
  );
};

export default Cards;
