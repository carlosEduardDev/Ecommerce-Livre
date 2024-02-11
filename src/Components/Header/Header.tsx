import React from "react";
import styles from "./Header.module.css";
import { IoBagHandleOutline, IoSearchOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { wordsearch } from "../../Store/search";

const Header = () => {
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
      <search>
        <form className={styles["header__search-form"]} onSubmit={handleSubmit}>
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
            <IoSearchOutline />
          </button>
        </form>
      </search>
      <IoBagHandleOutline />
    </header>
  );
};

export default Header;
