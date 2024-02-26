import { useState, FormEvent } from "react";
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
  reduceOpenCart,
  reduceSearch,
} from "../../Interfaces/Interfaces";
import { wordsearch } from "../../store/search";
import { togglecart } from "../../store/OpenCart";

const Header = ({ initial, product, bag, label }: IHeader) => {
  const cartState = useSelector((state: reduceCart) => state.cart.items);
  const openCartState = useSelector(
    (state: reduceOpenCart) => state.opencart.open
  );
  const favoriteState = useSelector(
    (state: reduceFavorite) => state.favorite.item
  );
  const wordState = useSelector((state: reduceSearch) => state.search.result);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchValue !== "" && searchValue !== wordState)
      dispatch(wordsearch(searchValue));
  };

  const handleClick = () => {
    dispatch(togglecart(!openCartState));
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
              <span
                className={styles.popup}
                data-count={cartState.length.toString()}
              >
                <IoBagHandleOutline
                  onClick={handleClick}
                  title="Sacola de itens"
                />
              </span>
            ) : (
              <span>
                <IoBagHandleOutline
                  onClick={handleClick}
                  title="Sacola de itens"
                />
              </span>
            )}
            <Link to="/favoritos">
              {favoriteState[0] ? <IoHeart /> : <IoHeartOutline />}
            </Link>
          </div>
        </>
      )}
      {product && (
        <>
          <Link to="/" onClick={() => dispatch(togglecart(false))}>
            <IoHomeOutline title="Início" />
          </Link>
          <div className={styles.header__actions}>
            {cartState.length ? (
              <span
                className={styles.popup}
                data-count={cartState.length.toString()}
              >
                <IoBagHandleOutline
                  onClick={handleClick}
                  title="Sacola de itens"
                />
              </span>
            ) : (
              <span>
                <IoBagHandleOutline
                  onClick={handleClick}
                  title="Sacola de itens"
                />
              </span>
            )}
            <Link to="/favoritos">
              {favoriteState[0] ? <IoHeart /> : <IoHeartOutline />}
            </Link>
          </div>
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
