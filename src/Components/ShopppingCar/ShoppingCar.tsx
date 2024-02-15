import React from "react";
import { useSelector } from "react-redux";
import { reduceCart } from "../../Interfaces/Interfaces";
import Cards from "../Cards/Cards";
import Header from "../Header/Header";
import styles from "./ShoppingCar.module.css";

const ShoppingCar = () => {
  const stateCart = useSelector((state: reduceCart) => state.cart.items);
  return (
    <>
      <Header bag={true} />
      <section className={styles.secBag}>
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
