import { useParams } from "react-router-dom";
import styles from "./Product.module.css";
import Carroussel from "../Carroussel/Carroussel";
import { IProduct, reduceCart } from "../../Interfaces/Interfaces";
import { IoBagAddOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addcart } from "../../Store/Cart";
import Header from "../Header/Header";
import useFetch from "../../Service/useFetch";
import { togglecart } from "../../Store/OpenCart";

const formateBRL = (price: number) => {
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const Product = () => {
  const dispatch = useDispatch();
  const stateCart = useSelector((state: reduceCart) => state.cart.items);
  const prodID = useParams();
  const { data } = useFetch<IProduct>(
    `https://api.mercadolibre.com/items/${prodID.prod}`
  );

  const handleDispatch = () => {
    if (data && !stateCart.filter((item) => item.id === data.id)[0]) {
      dispatch(togglecart(true));
      dispatch(
        addcart({
          title: data.title,
          price: formateBRL(data.price),
          image: data.pictures[0].url,
          id: data.id,
          qtd: 1,
        })
      );
    }
  };

  return (
    <>
      <Header product={true} />
      <section className={styles["sec-product"]}>
        {data && <Carroussel images={data?.pictures.map((img) => img.url)} />}

        {data && (
          <div className={styles["sec-product__info"]}>
            <h1 className={styles["sec-product__info__title"]}>
              {data?.title}
            </h1>
            <div className={styles["sec-product__info__prices"]}>
              {data?.price === data?.original_price ? (
                <span style={{ fontWeight: "bold" }}>
                  {formateBRL(data?.price)}
                </span>
              ) : (
                <>
                  <span
                    style={{
                      textDecoration: " line-through",
                      fontSize: "1rem",
                      color: "grey",
                    }}
                  >
                    {data.original_price && formateBRL(data?.original_price)}
                  </span>
                  <span style={{ fontWeight: "bold" }}>
                    {formateBRL(data?.price)}
                  </span>
                </>
              )}
            </div>{" "}
            <span
              style={{ marginTop: "-20px", fontSize: ".9rem", color: "grey" }}
            >
              Em até 10x no cartâo de crédito
            </span>
            <p style={{ marginBlock: "20px" }}>
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
              <a className={styles.link} href={data.permalink} target="_blank">
                Ver no Mercado Livre &reg;
              </a>

              {stateCart.filter((item) => item.id === data.id)[0] ? (
                <span>item adicionado a sacola</span>
              ) : (
                <button className={styles.link} onClick={handleDispatch}>
                  <p>Adicionar na sacola</p>
                  <IoBagAddOutline />
                </button>
              )}
            </div>
          </div>
        )}
        {data && (
          <div className={styles["sec-product__info__atributes"]}>
            <h1>Especificações:</h1>
            <ul className={styles["sec-product__info__atributes__list"]}>
              {data?.attributes.map((attr) => (
                <li key={crypto.randomUUID()}>
                  <span>{attr.name}</span> : {attr.value_name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
};

export default Product;
