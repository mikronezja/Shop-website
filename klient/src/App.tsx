import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import UserProfile from "./components/UserProfile";
import Product from "./components/Product";
import NavBar from "./components/NavBar";
import OrderHistory from "./components/OrderHistory";
import LoginPage from "./components/LoginPage";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import SignUpPage from "./components/SignUpPage";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ThemeConsumer, ThemeContext } from "styled-components";
import { UserLoginInterface } from "./context-interfaces/UserLogin";
import { BasicProductInfo } from "./components/Types/ProductTypes";
import { BasketContextType } from "./context-interfaces/Basket";

const defaultBasketContextValue: BasketContextType = {
  cartItems: [],
  setCartItems: () => {
    console.warn("setCartItems is not implemented in the default context!");
  },
};

export const BasketContext = createContext<BasketContextType>(
  defaultBasketContextValue
);

export const UserLoggedContext = createContext<UserLoginInterface>({
  userLoggedID: "",
  username: "",
  role: "user",
  setUserLoggedID: () => {},
  setRole: () => {},
  setUsername: () => {},
});

function App() {
  const [userLoggedID, setUserLoggedID] = useState<string>(
    localStorage.getItem("userid") || ""
  );
  const [cartItems, setCartItems] = useState<BasicProductInfo[]>([]);
  const [role, setRole] = useState<"admin" | "user">(
    (localStorage.getItem("role") as "admin" | "user") || "user"
  );
  const [username, setUsername] = useState<string>(
    localStorage.getItem("username") || ""
  );

  /*USE EFFECT*/
  useEffect(() => {
    localStorage.setItem("userid", userLoggedID);
  }, [userLoggedID]);
  useEffect(() => {
    localStorage.setItem("username", username);
  }, [username]);
  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);
  /*USE EFFECT*/

  return (
    <>
      <BrowserRouter>
        <BasketContext.Provider value={{ cartItems, setCartItems }}>
          <UserLoggedContext.Provider
            value={{
              userLoggedID,
              setUserLoggedID,
              role,
              setRole,
              username,
              setUsername,
            }}
          >
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/user/:id" element={<UserProfile />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/orderhist" element={<OrderHistory />} />
              <Route path="/loginpage" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </UserLoggedContext.Provider>
        </BasketContext.Provider>
        {/*the end of the web page:)*/}
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
