import React, { useContext } from "react";
import { BasketContext, UserLoggedContext } from "../App";
import { useNavigate } from "react-router-dom";
import { CategoryButton } from "../styles/ButtonStyles";

const Cart = () => {
  const userContext = useContext(UserLoggedContext)!;
  const { userLoggedID } = userContext;
  const cartContext = useContext(BasketContext)!;
  const { cartItems, setCartItems } = cartContext;
  const navigate = useNavigate();

  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleOrder = async () => {
    try {
      const response = await fetch("http://localhost:5000/orderhist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: userLoggedID,
          date: new Date().toISOString(),
          total_cost: totalCost,
          products: cartItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
            title: item.title,
          })),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Order placed successfully:", result);
        alert("Order placed successfully!");
        setCartItems([]);
        navigate("/");
      } else {
        console.error("Failed to place order:", response.statusText);
        alert("Failed to place the order. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while placing the order. Please try again.");
    }
  };

  return (
    <div>
      {cartItems && cartItems.length > 0 ? (
        <div>
          {cartItems.map((item, key) => (
            <div key={key}>
              <img src={item.thumbnail} alt={item.title} />
              <div>Title: {item.title}</div>
              <div>Price: ${item.price}</div>
              <div>Quantity: {item.quantity}</div>
            </div>
          ))}

          <div>
            <h2>
              Total Cost: <span>${totalCost.toFixed(2)}</span>
            </h2>
            <CategoryButton
              fontsize="1vw"
              background_color="#9bb9f8"
              padding="1vh"
              onClick={() => {
                if (userLoggedID) {
                  handleOrder();
                } else {
                  navigate("/");
                }
              }}
            >
              Order
            </CategoryButton>
          </div>
        </div>
      ) : (
        <div>Your cart is empty.</div>
      )}
    </div>
  );
};

export default Cart;
