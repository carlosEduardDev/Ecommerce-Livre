import React from "react";
import Header from "./Components/Header/Header";
import { useSelector } from "react-redux";
import { reduceSearch } from "./Interfaces/Interfaces";

const App = () => {
  const search = useSelector((state: reduceSearch) => state.search);
  return (
    <main>
      <Header />
      <p>{search}</p>
    </main>
  );
};

export default App;
