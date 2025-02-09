import React, { useContext, useEffect, useState } from "react";
import SearchBarComponent from "./smallerComponents/SearchBarComponent";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { UserLoggedContext } from "../App";
import { ProductType } from "./Types/ProductTypes";
import { CuteText } from "../styles/CuteTextStyle";
import { LoadingImages } from "../styles/BeginTransitionStyles";

const ProductImageDisplayed = styled.img`
  width: 30vh;
  height: 30vh;
  border-color: 2px;
  border-width: 2px;
`;

const ProductAndTitleStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 6vh;
`;

const NextToEachOther = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
`;

const HomePage = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const state = location.state as {
    searchQuery?: string;
    categoryClicked?: string;
  };
  const searchQuery = state?.searchQuery || "";

  const [dataTypedInBar, setDataTypedInBar] = useState(searchQuery);
  const [categoryClicked, setCategoryClicked] = useState(
    state?.categoryClicked || ""
  );
  const [isPending, setIsPending] = useState(true);
  const [load, setLoad] = useState(false);
  const [isError, setIsError] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [shownProducts, setShownProducts] = useState<ProductType[]>([]);

  const applyFilters = () => {
    let filteredProducts = products;

    if (dataTypedInBar) {
      filteredProducts = filteredProducts.filter((item) =>
        item.title.toLowerCase().includes(dataTypedInBar.toLowerCase())
      );
    } else if (categoryClicked) {
      filteredProducts = filteredProducts.filter(
        (item) => item.category === categoryClicked
      );
    }

    setShownProducts(filteredProducts);
  };

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=50")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setShownProducts(data.products);
        setIsPending(false);
      })
      .catch((error) => {
        setIsError(true);
        setIsPending(false);
        console.error("Error fetching products:", error);
      });
  }, []);

  useEffect(() => {
    applyFilters();
  }, [dataTypedInBar, categoryClicked]);

  useEffect(() => {
    setDataTypedInBar(searchQuery);
    navigate(location.pathname, { replace: true });
    applyFilters();
  }, [location.pathname]);

  return (
    <>
      <div>
        {!isError && (
          <SearchBarComponent
            writingFunction={(data) => {
              setDataTypedInBar(data);
            }}
            categoryClickedFunction={(category) => {
              setCategoryClicked(category);
            }}
            removeFiltersFunction={() => {
              setDataTypedInBar("");
              setCategoryClicked("");
            }}
          />
        )}

        {isPending && <div>Loading...</div>}

        {!isError && !isPending && (
          <NextToEachOther>
            {shownProducts.map((item, key) => (
              <ProductAndTitleStyle key={item.id}>
                <LoadingImages $delay={String(key * 0.1) + "s"}>
                  <ProductImageDisplayed
                    src={item.thumbnail}
                    alt={item.title}
                    onClick={() => {
                      navigate(`/product/${item.id}`);
                    }}
                  />
                  <CuteText fontsize="1.7vh" background_color="none">
                    {item.title}
                  </CuteText>
                </LoadingImages>
              </ProductAndTitleStyle>
            ))}
          </NextToEachOther>
        )}
      </div>
    </>
  );
};

export default HomePage;
