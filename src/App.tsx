import React from "react";
import Header from "./Components/Header/Header";
import Cards from "./Components/Cards/Cards";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./Components/Product/Product";
import { useDispatch, useSelector } from "react-redux";
import { reduceProduct, reduceSearch } from "./Interfaces/Interfaces";
import Bag from "./Components/ShopppingCar/ShoppingCar";
import { fetchProduct } from "./Store/ProductsFetch";
import Favorites from "./Components/Favorites/Favorites";
import { CiWifiOff } from "react-icons/ci";
import { MdOutlineSearchOff } from "react-icons/md";

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
          <Route path="/favoritos" element={<Favorites />}/>
          <Route
            path="/"
            element={
              <>
                <Header initial={true} />
                {data?.results[0] && <h1 className="productSearch">
                  Exibindo resultados para " <span>{search}</span> " :
                </h1>}{" "}
                {loading && <h1 className="warning">Carregando...</h1>}
                {error && (
                  <h1 className="warning"><CiWifiOff />Verifique a sua conexão com a internet...</h1>
                )}
                {data?.results[0] === undefined &&
                  loading == false &&
                  error === null && (
                    <h1 className="warning">
                      <MdOutlineSearchOff /> Lamentamos, mas não temos o produto que você procura...
                    </h1>
                  )}
                <section className="sec-card">
                  {data &&
                    data.results.map((product) => (
                      <Cards
                        search={search}
                        id={product.id}
                        price={product.price}
                        image={product.thumbnail.replace("I", "W")}
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
          <Route
            path="*"
            element={
              <>
                <Header product={true} />
                <section>
                  <h1>Página não encontrada...</h1>
                </section>
              </>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
