import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Product.module.css";
import Carroussel from "../Carroussel/Carroussel";
import { IProduct, reduceCart } from "../../Interfaces/Interfaces";
import { IoBagAddOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addcart } from "../../Store/Cart";
import Header from "../Header/Header";
import useFetch from "../../Service/useFetch";

const formateBRL = (price: number) => {
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const Product = () => {
  const dispatch = useDispatch();
  const stateCart = useSelector((state: reduceCart) => state.cart.items);
  const prodID = useParams();
  const {data} = useFetch<IProduct>(
    `https://api.mercadolibre.com/items/${prodID.prod}`
  );

  const handleDispatch = () => {
    if (data && !stateCart.filter((item) => item.id === data.id)[0]) {
      dispatch(
        addcart({
          title: data.title,
          price: formateBRL(data.price),
          image: data.pictures[0].url,
          id: data.id,
        })
      );
      alert("Item adicionado a sacola");
    }
  };

  return (
    <>
      <Header product={true} />
      <section className={styles["sec-product"]}>
        {data && (
          <Carroussel images={data?.pictures.map((img) => img.url)} />
        )}

        {data && (
          <div className={styles["sec-product__info"]}>
            <h1 className={styles["sec-product__info__title"]}>
              {data?.title}
            </h1>
            <div className={styles["sec-product__info__prices"]}>
              {data?.price === data?.original_price ? (
                <span>{formateBRL(data?.price)}</span>
              ) : (
                <>
                  <span
                    style={{
                      textDecoration: " line-through",
                      fontSize: "1rem",
                      color: "grey",
                    }}
                  >
                    {data.original_price &&
                      formateBRL(data?.original_price)}
                  </span>
                  <span>{formateBRL(data?.price)}</span>
                </>
              )}
            </div>
            <p>Lista de Atributos:</p>
            <ul className={styles["sec-product__info__atributes"]}>
              {data?.attributes.map((attr) => (
                <li key={crypto.randomUUID()}>
                  {attr.name} : {attr.value_name}
                </li>
              ))}
            </ul>
            <p>
              {data.seller_address.city.name ===
              data.seller_address.state.name ? (
                <>
                  Enviado de {data.seller_address.city.name},{" "}
                  {data.seller_address.country.name}
                </>
              ) : (
                <>
                  Enviado de {data.seller_address.city.name},{" "}
                  {data.seller_address.state.name},{" "}
                  {data.seller_address.country.name}
                </>
              )}
            </p>
            <div className={styles["sec-product__info__btns"]}>
              <a
                className={styles.link}
                href={data.permalink}
                target="_blank"
              >
                Ver no Mercado Livre &reg;
              </a>

              {stateCart.filter((item) => item.id === data.id)[0] ? (
                <Link
                  style={{
                    textDecoration: "underline",
                    color: "var(--primary-color)",
                  }}
                  to="/sacola"
                  title="Sacola de itens"
                >
                  item adicionado a sacola
                </Link>
              ) : (
                <button>
                  <IoBagAddOutline onClick={handleDispatch} />
                </button>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Product;
