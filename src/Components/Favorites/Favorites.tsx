import Header from "../Header/Header";
import Cards from "../Cards/Cards";
import { useSelector } from "react-redux";
import { reduceFavorite, reduceSearch } from "../../Interfaces/Interfaces";
import styles from "./Favorites.module.css";

const Favorites = () => {
  const stateFavorite = useSelector(
    (state: reduceFavorite) => state.favorite.item
  );
  const stateSearch = useSelector((state: reduceSearch) => state.search.result);
  return (
    <>
      <Header bag={true} label="Produtos Favoritados" />
      <section className={styles.favorite}>
        {!stateFavorite[0] && <h1 className={styles.favorite__title}>ainda não há produtos favoritados.</h1>}
        {stateFavorite.map((item) => (
          <Cards
            key={crypto.randomUUID()}
            search={stateSearch}
            id={item.id}
            price={item.price}
            title={item.title}
            image={item.image}
            product={false}
            bag={false}
            favorite={true}
          />
        ))}
      </section>
    </>
  );
};

export default Favorites;
