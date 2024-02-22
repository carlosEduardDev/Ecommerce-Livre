import React from "react";
import styles from "./Header.module.css";
import {
  IoBagHandleOutline,
  IoHeart,
  IoHeartOutline,
  IoHomeOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  IHeader,
  reduceCart,
  reduceFavorite,
  reduceSearch,
} from "../../Interfaces/Interfaces";
import { wordsearch } from "../../Store/Search";

const Header = ({ initial, product, bag, label }: IHeader) => {
  const cartState = useSelector((state: reduceCart) => state.cart.items);
  const favoriteState = useSelector(
    (state: reduceFavorite) => state.favorite.item
  );
  const wordState = useSelector((state: reduceSearch) => state.search.result);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = React.useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchValue !== "" && searchValue !== wordState)
      dispatch(wordsearch(searchValue));
  };

  return (
    <header className={styles.header}>
      {initial && (
        <>
          <p className={styles.header__logo}>Ecommerce Livre &reg;</p>
          <search>
            <form
              className={styles["header__search-form"]}
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                id="search-value"
                className={styles.header__input}
                placeholder="Buscar produtos..."
                onChange={({ target }) => {
                  setSearchValue(target.value);
                }}
              />
              <button>
                <IoSearchOutline title="Pesquisar" />
              </button>
            </form>
          </search>
          <div className={styles.header__actions}>
            {cartState.length ? (
              <Link
                to="/sacola"
                className={styles.popup}
                data-count={cartState.length.toString()}
              >
                <IoBagHandleOutline title="Sacola de itens" />
              </Link>
            ) : (
              <Link to="/sacola">
                <IoBagHandleOutline title="Sacola de itens" />
              </Link>
            )}
            <Link to="/favoritos">
              {favoriteState[0] ? <IoHeart /> : <IoHeartOutline />}
            </Link>
          </div>
        </>
      )}
      {product && (
        <>
          <Link to="/">
            <IoHomeOutline title="Início" />
          </Link>
          {cartState.length ? (
            <Link
              to="/sacola"
              className={styles.popup}
              data-count={cartState.length.toString()}
            >
              <IoBagHandleOutline title="Sacola de itens" />
            </Link>
          ) : (
            <Link to="/sacola">
              <IoBagHandleOutline title="Sacola de itens" />
            </Link>
          )}
        </>
      )}
      {bag && (
        <>
          <Link to="/">
            <IoHomeOutline title="Home" />
          </Link>
          <p>{label}</p>
        </>
      )}
    </header>
  );
};

export default Header;
