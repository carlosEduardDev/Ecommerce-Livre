import React from "react";
import styles from "./Header.module.css";
import {
  IoBagHandleOutline,
  IoHomeOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { wordsearch } from "../../Store/search";
import { Link } from "react-router-dom";
import { reduceBag } from "../../Interfaces/Interfaces";

const Header = ({
  initial,
  product,
  bag,
}: {
  initial?: boolean;
  product?: boolean;
  bag?: boolean;
}) => {
  const bagState = useSelector((state: reduceBag) => state.bag.items);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = React.useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchValue
      ? dispatch(wordsearch(searchValue))
      : dispatch(wordsearch("notebook"));
  };

  return (
    <header className={styles.header}>
      {initial && (
        <>
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
          {bagState.length ? (
            <Link
              to="/sacola"
              className={styles.popup}
              data-count={bagState.length.toString()}
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
      {product && (
        <>
          <Link to="/">
            <IoHomeOutline title="Início" />
          </Link>
          {bagState.length ? (
            <Link
              to="/sacola"
              className={styles.popup}
              data-count={bagState.length.toString()}
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
          <p>Seus Produtos</p>
        </>
      )}
    </header>
  );
};

export default Header;
