import React from "react";
import Header from "./Components/Header/Header";
import Cards from "./Components/Cards/Cards";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./Components/Product/Product";
import { useDispatch, useSelector } from "react-redux";
import { reduceProduct, reduceSearch } from "./Interfaces/Interfaces";
import Bag from "./Components/Bag/Bag";
import { fetchProduct } from "./Store/productsFetch";

const App = () => {
  const search = useSelector((state: reduceSearch) => state.search.result);
  const { loading, data, error } = useSelector(
    (state: reduceProduct) => state.productsFetch
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    fetchProduct(search, dispatch);
  }, [search]);

  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <section className="sec-card">
                  {loading && <h1>Carregando...</h1>}
                  {error && <h1>Erro!, verifique a internet...</h1>}
                  {data &&
                    data.results.map((product) => (
                      <Cards
                        search={search}
                        id={product.id}
                        price={product.price}
                        image={product.thumbnail}
                        title={product.title}
                        key={crypto.randomUUID()}
                      />
                    ))}
                </section>
              </>
            }
          />
          <Route path={`${search}/:prod`} element={<Product />} />
          <Route path={"sacola"} element={<Bag />} />
          <Route path="*" element={<h1>Página não encontrada...</h1>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
