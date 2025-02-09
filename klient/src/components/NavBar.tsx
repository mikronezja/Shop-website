import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { NavbarStyled } from "../styles/NavBarStyle";
import { UserIcon } from "./UserIconStyle";
import { useNavigate } from "react-router-dom";
import { UserLoggedContext } from "../App";
import { CuteLinkText } from "../styles/CuteLinkTextStyle";
import { CategoryButton } from "../styles/ButtonStyles";
import { CuteText } from "../styles/CuteTextStyle";
import {
  CenterDiv,
  CenterDivHorizontally,
  EndDiv,
  FlexDiv,
  ItemsInColumn,
} from "../styles/Centering";
import HomePageText from "./smallerComponents/HomePageText";

const UserInNavBar = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const CartIcon = styled.button`
  background-image: url("./images/cart2.png");
  background-size: contain;
  background-position-x: -0.2vw;
  border: none;
  width: 3vw;
  height: 3vw;
  border-radius: 20%;
  margin-top: 1vh;
  box-shadow: #ffbae8 5px 5px;
`;

const NavBar = () => {
  const navigate = useNavigate();

  const context = useContext(UserLoggedContext)!;
  const { userLoggedID, username, setUserLoggedID, setUsername, setRole } =
    context;

  return (
    <>
      <FlexDiv>
        <CenterDiv>
          <CuteLinkText
            onClick={() => {
              navigate("/");
            }}
          >
            <HomePageText />
          </CuteLinkText>
        </CenterDiv>

        <EndDiv>
          <CartIcon
            onClick={() => {
              navigate("/cart");
            }}
          >
            Cart
          </CartIcon>

          <ItemsInColumn>
            <CenterDivHorizontally>
              <UserIcon
                onClick={() => {
                  if (userLoggedID) {
                    console.log(userLoggedID);
                    navigate(`/user/${userLoggedID}`);
                  } else {
                    navigate("/loginpage");
                  }
                }}
              ></UserIcon>

              {username && (
                <CuteText fontsize="0.9vw" background_color="none">
                  {username}
                </CuteText>
              )}

              {!userLoggedID ? (
                <CategoryButton
                  fontsize="1vw"
                  background_color="#9bb9f8"
                  padding="0.5vh"
                  onClick={() => {
                    navigate("/loginpage");
                  }}
                >
                  Sign In
                </CategoryButton>
              ) : (
                <CategoryButton
                  fontsize="1vw"
                  background_color="#9bb9f8"
                  padding="0.5vh"
                  onClick={() => {
                    setUserLoggedID("");
                    setUsername("");
                    setRole("user");
                    navigate("/");
                  }}
                >
                  Log out
                </CategoryButton>
              )}
            </CenterDivHorizontally>
          </ItemsInColumn>
        </EndDiv>
      </FlexDiv>
    </>
  );
};

export default NavBar;
