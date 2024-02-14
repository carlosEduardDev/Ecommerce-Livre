import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Product.module.css";
import Carroussel from "../Carroussel/Carroussel";
import { IProduct, reduceBag } from "../../Interfaces/Interfaces";
import { IoBagAddOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addbag } from "../../Store/bag";
import Header from "../Header/Header";

const formateBRL = (price: number) => {
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const Product = () => {
  const dispatch = useDispatch();
  const bagProducts = useSelector((state: reduceBag) => state.bag.items);
  const prodID = useParams();
  const [product, setProduct] = React.useState<null | IProduct>(null);

  const handleDispatch = () => {
    if (product && !bagProducts.filter((item) => item.id === product.id)[0]) {
      dispatch(
        addbag({
          title: product.title,
          price: formateBRL(product.price),
          image: product.pictures[0].url,
          id: product.id,
        })
      );
      alert("Item adicionado a sacola");
    }
  };

  const handleFetch = async () => {
    const response = await fetch(
      `https://api.mercadolibre.com/items/${prodID.prod}`
    );
    const json: IProduct = await response.json();
    setProduct(json);
  };

  React.useEffect(() => {
    handleFetch();
  }, []);

  return (
    <>
      <Header product={true} />
      <section className={styles["sec-product"]}>
        {product && (
          <Carroussel images={product?.pictures.map((img) => img.url)} />
        )}

        {product && (
          <div className={styles["sec-product__info"]}>
            <h1 className={styles["sec-product__info__title"]}>
              {product?.title}
            </h1>
            <div className={styles["sec-product__info__prices"]}>
              {product?.price === product?.original_price ? (
                <span>{formateBRL(product?.price)}</span>
              ) : (
                <>
                  <span
                    style={{
                      textDecoration: " line-through",
                      fontSize: "1rem",
                      color: "grey",
                    }}
                  >
                    {product.original_price && formateBRL(product?.original_price)}
                  </span>
                  <span>{formateBRL(product?.price)}</span>
                </>
              )}
            </div>
            <p>Lista de Atributos:</p>
            <ul className={styles["sec-product__info__atributes"]}>
              {product?.attributes.map((attr) => (
                <li key={crypto.randomUUID()}>
                  {attr.name} : {attr.value_name}
                </li>
              ))}
            </ul>
            <p>
              {product.seller_address.city.name ===
              product.seller_address.state.name ? (
                <>
                  Enviado de {product.seller_address.city.name},{" "}
                  {product.seller_address.country.name}
                </>
              ) : (
                <>
                  Enviado de {product.seller_address.city.name},{" "}
                  {product.seller_address.state.name},{" "}
                  {product.seller_address.country.name}
                </>
              )}
            </p>
            <div className={styles["sec-product__info__btns"]}>
              <a
                className={styles.link}
                href={product.permalink}
                target="_blank"
              >
                Ver no Mercado Livre &reg;
              </a>

              {bagProducts.filter((item) => item.id === product.id)[0] ? (
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
