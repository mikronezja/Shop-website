import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductType } from "./Types/ProductTypes";
import SearchBarComponent from "./smallerComponents/SearchBarComponent";
import styled from "styled-components";
import { BasketContext } from "../App";
import Comments from "./Comments";
import { CategoryButton } from "../styles/ButtonStyles";

export const GoLeft = styled.div`
  display: flex;
`;

export const Image = styled.img`
  width: auto;
  height: 50vh;
  margin: 1vw;
`;

export const LeftCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const DecreaseButtonSize = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const GoVertically = styled.div`
  display: flex;
  flex-direction: row;
`;

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const context = useContext(BasketContext)!;
  const { cartItems, setCartItems } = context;

  const [product, setProduct] = useState<ProductType>();
  const [imageIndex, setImageIndex] = useState(0);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((data) => data.json())
      .then((data) => {
        setProduct(data);
        setIsPending(false);
      })
      .catch((error) => {
        setIsError(true);
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <>
      <SearchBarComponent
        writingFunction={(text) => {
          // Redirect to the home page with the search query as a parameter
          navigate("/", { state: { searchQuery: text } });
        }}
        categoryClickedFunction={(category) => {
          navigate("/", { state: { categoryClicked: category } });
        }}
        removeFiltersFunction={() => {
          navigate("/");
        }}
      />

      {!isPending && !isError && (
        <div>
          <GoLeft>
            <Image
              src={product?.images[imageIndex]}
              onClick={() => {
                {
                  product?.images.length &&
                    setImageIndex((imageIndex + 1) % product?.images.length);
                }
              }}
            />

            <LeftCenter>
              <h3>{product?.title}</h3>
              <div>Price : {product?.price}</div>
              <div>Brand: {product?.brand}</div>
              <div>Weight : {product?.weight}</div>
              <div>{product?.stock}</div>
              <div>{product?.description}</div>
              <DecreaseButtonSize>
                <CategoryButton
                  fontsize="1.5vw"
                  padding="0.5vh"
                  background_color="#f3acc8"
                  onClick={() => {
                    if (!product) {
                      console.error("Product is undefined");
                      return;
                    }

                    setCartItems((prevCartItems) => {
                      if (!prevCartItems) {
                        console.error("prevCartItems is undefined");
                        return []; // Fallback to an empty array
                      }

                      const existingProductIndex = prevCartItems.findIndex(
                        (item) => item.id === product.id
                      );

                      if (existingProductIndex !== -1) {
                        const updatedCart = [...prevCartItems];
                        updatedCart[existingProductIndex].quantity += amount;
                        return updatedCart;
                      }

                      console.log("set cart items!!");
                      return [
                        ...prevCartItems,
                        {
                          id: product.id,
                          thumbnail: product.thumbnail,
                          quantity: amount,
                          price: product.price,
                          title: product.title,
                        },
                      ];
                    });
                  }}
                >
                  Add to cart
                </CategoryButton>
              </DecreaseButtonSize>

              <GoVertically>
                <div>Amount: {amount}</div>

                <button
                  disabled={amount == product?.stock}
                  onClick={() => {
                    setAmount(amount + 1);
                  }}
                >
                  +
                </button>
                <button
                  disabled={amount == 1}
                  onClick={() => {
                    setAmount(amount - 1);
                  }}
                >
                  -
                </button>
              </GoVertically>
            </LeftCenter>
          </GoLeft>

          {product?.id && <Comments productid={product.id} />}
        </div>
      )}
    </>
  );
};

export default Product;
