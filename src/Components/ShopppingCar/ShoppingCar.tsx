import { useSelector } from "react-redux";
import { reduceCart, reduceOpenCart } from "../../Interfaces/Interfaces";
import Cards from "../Cards/Cards";
import styles from "./ShoppingCar.module.css";

const ShoppingCar = () => {
  const stateOpenCart = useSelector((state: reduceOpenCart) => state.opencart.open);
  const stateCart = useSelector((state: reduceCart) => state.cart.items);
  const total = stateCart.reduce((acc, cur) => {
    const formatedCurrent = String(cur.price)
      .replace("R$", "")
      .replace(",", ".");
    return formatedCurrent.length >= 8
      ? acc + Number(formatedCurrent.replace(/\./, "")) * cur.qtd
      : acc + Number(formatedCurrent) * cur.qtd;
  }, 0);

  return (
    <>
      <section className={styles.secBag} style={stateOpenCart ? {width: '400px'} : {width: '0px'}}>
        {" "}
        {stateCart[0] && (
          <h1>
            Total:{" "}
            {total.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </h1>
        )}
        {!stateCart[0] && <h1 className={styles.secBag__text}>Ainda não há produtos na sua sacola.</h1>}
        {stateCart.map((item) => (
          <Cards
            key={crypto.randomUUID()}
            id={item.id}
            price={item.price}
            title={item.title}
            image={item.image}
            product={false}
            bag={true}
          />
        ))}
      </section>
    </>
  );
};

export default ShoppingCar;
