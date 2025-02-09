import React, { useContext, useEffect, useState } from "react";
import { UserLoggedContext } from "../App";
import styled from "styled-components";

type ProductTypeOrderHist = {
  productId: number;
  quantity: number;
  price: number;
  title: string;
};

type OrderType = {
  _id: string;
  userid: string;
  date: string;
  products: ProductTypeOrderHist[];
  total_cost: number;
};

const SingleBlock = styled.div`
  background-color: #eee5e9;
  color: #af297c;
  margin: 2vh 0;
  padding: 2vh;
  width: 100%;
  box-sizing: border-box;
  border-radius: 8px;
`;

const OrderHistory = () => {
  const context = useContext(UserLoggedContext)!;
  const { userLoggedID } = context; // Fetch userLoggedID from context
  const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    // Fetch order history for the logged-in user
    fetch(`http://localhost:5000/orderhist/${userLoggedID}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched Orders:", data);
        setOrders(data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2vh" }}>
      {/* Center content with max-width */}
      <h1>Order History</h1>
      {orders.length > 0 ? (
        orders.map((order, orderIndex) => (
          <SingleBlock key={orderIndex}>
            <div>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Total Cost:</strong> ${order.total_cost.toFixed(2)}
              </p>
              <h3>Products:</h3>
              <ul>
                {order.products.map((product, productIndex) => (
                  <li key={productIndex}>
                    <p>
                      <strong>Title:</strong> {product.title}
                    </p>
                    <p>
                      <strong>Price:</strong> ${product.price.toFixed(2)}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {product.quantity}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </SingleBlock>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderHistory;
