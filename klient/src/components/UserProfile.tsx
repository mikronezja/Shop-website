import React, { useContext, useEffect, useState } from "react";
import { UserLoggedContext } from "../App";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Address, UserType } from "./Types/UserTypes";
import { CuteText } from "../styles/CuteTextStyle";
import { CategoryButton } from "../styles/ButtonStyles";

// export interface Address {
//   address: string;
//   post_code: string;
//   country: string;
// }

const VerticalDiv = styled.div`
  display: flex;
  position: absolute;
  gap: 8px;
  flex-direction: column;
  width: 20%;
  top: 10vh;
  justify-content: center;
  left: 39.5vw;
  align-items: center;
`;

const VerticalAddressDiv = styled.div`
  display: flex;
  gap: 2px;
  flex-direction: column;
`;

const TextArea = styled.textarea`
  height: 2vh;
`;

const HorizontalDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const UserProfile = () => {
  const context = useContext(UserLoggedContext)!;
  const { userLoggedID, setUserLoggedID } = context;
  const navigate = useNavigate();

  /*STATES*/
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurName] = useState("");
  const [address, setAdress] = useState<Address>({
    address: "",
    post_code: "",
    country: "",
  });
  /**/

  /*BUTTONS*/
  const [emailButton, setEmailButton] = useState(false);
  const [phoneButton, setPhoneButton] = useState(false);
  const [nameButton, setNameButton] = useState(false);
  const [surnameButton, setSurNameButton] = useState(false);
  const [addressButton, setAdressButton] = useState(false);
  /**/

  const [user, setUser] = useState<UserType>();

  const handleUpdate = async (field: string, value: any) => {
    try {
      const response = await fetch(
        `http://localhost:5000/user/${userLoggedID}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ [field]: value }),
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        console.log("Update successful:", updatedUser);
        setUser(updatedUser.user); // Update the state with the updated user
        alert(`${field} updated successfully!`);
      } else {
        alert("Failed to update. Please try again.");
      }
    } catch (error) {
      console.error("Error updating field:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const validateEmail = (email_: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email_);
  };

  const validatePostCode = (postcode_: string) => {
    const postCodeRegex = /[0-9]{2}-[0-9]{3}/;
    return postCodeRegex.test(postcode_);
  };

  const validatePhoneNumber = (phone_: string) => {
    const phoneRegex = /^[0-9\-\+]{9,15}$/;
    return phoneRegex.test(phone_);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/user/${userLoggedID}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div>
      {user && (
        <VerticalDiv>
          <CuteText fontsize="2.5vh" background_color="none">
            Username: {user?.username}{" "}
          </CuteText>
          <HorizontalDiv>
            <CuteText fontsize="2.5vh" background_color="none">
              Email: {user?.email}{" "}
            </CuteText>
            {!emailButton ? (
              <CategoryButton
                fontsize="2vh"
                padding="0.5vh"
                background_color="#9bb9f8"
                onClick={() => {
                  setEmailButton(true);
                }}
              >
                Change
              </CategoryButton>
            ) : (
              <div>
                <textarea
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></textarea>
                <CategoryButton
                  fontsize="2vh"
                  padding="0.5vh"
                  background_color="#9bb9f8"
                  onClick={() => {
                    if (validateEmail(email)) {
                      handleUpdate("email", email);
                      setEmail("");
                      setEmailButton(false);
                    } else {
                      alert("wrong email applied");
                    }
                  }}
                >
                  Apply
                </CategoryButton>
              </div>
            )}
          </HorizontalDiv>

          <HorizontalDiv>
            <CuteText fontsize="2.5vh" background_color="none">
              Phone Number: {user?.phone_number}{" "}
            </CuteText>
            {!phoneButton ? (
              <CategoryButton
                fontsize="2vh"
                padding="0.5vh"
                background_color="#9bb9f8"
                onClick={() => {
                  setPhoneButton(true);
                }}
              >
                Change
              </CategoryButton>
            ) : (
              <div>
                <textarea
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                ></textarea>
                <CategoryButton
                  fontsize="2vh"
                  padding="0.5vh"
                  background_color="#9bb9f8"
                  onClick={() => {
                    if (validatePhoneNumber(phone)) {
                      handleUpdate("phone", phone);
                      setPhone("");
                    } else {
                      alert("Wrong phone number applied");
                    }
                  }}
                >
                  Apply
                </CategoryButton>
              </div>
            )}
          </HorizontalDiv>

          <HorizontalDiv>
            <CuteText fontsize="2.5vh" background_color="none">
              Name: {user?.name}{" "}
            </CuteText>
            {!nameButton ? (
              <CategoryButton
                fontsize="2vh"
                padding="0.5vh"
                background_color="#9bb9f8"
                onClick={() => {
                  setNameButton(true);
                }}
              >
                Change
              </CategoryButton>
            ) : (
              <div>
                <textarea
                  onChange={(e) => {
                    setName(e.target.value);
                    setName("");
                  }}
                ></textarea>
                <CategoryButton
                  fontsize="2vh"
                  padding="0.5vh"
                  background_color="#9bb9f8"
                  onClick={() => {
                    handleUpdate("name", name);
                  }}
                >
                  Apply
                </CategoryButton>
              </div>
            )}
          </HorizontalDiv>

          <HorizontalDiv>
            <CuteText fontsize="2.5vh" background_color="none">
              Surname: {user?.surname}{" "}
            </CuteText>
            {!surnameButton ? (
              <CategoryButton
                fontsize="2vh"
                padding="0.5vh"
                background_color="#9bb9f8"
                onClick={() => {
                  setSurNameButton(true);
                }}
              >
                Change
              </CategoryButton>
            ) : (
              <div>
                <textarea
                  onChange={(e) => {
                    setSurName(e.target.value);
                    setSurName("");
                  }}
                ></textarea>
                <CategoryButton
                  fontsize="2vh"
                  padding="0.5vh"
                  background_color="#9bb9f8"
                  onClick={() => {
                    handleUpdate("surname", surname);
                  }}
                >
                  Apply
                </CategoryButton>
              </div>
            )}
          </HorizontalDiv>

          <HorizontalDiv>
            <div>
              <CuteText fontsize="2.5vh" background_color="none">
                Address : {user?.address.address}{" "}
              </CuteText>
              <CuteText fontsize="2.5vh" background_color="none">
                Post Code : {user?.address.post_code}{" "}
              </CuteText>
              <CuteText fontsize="2.5vh" background_color="none">
                Country: {user?.address.country}
              </CuteText>
            </div>
            {!addressButton ? (
              <CategoryButton
                fontsize="2vh"
                padding="0.5vh"
                background_color="#9bb9f8"
                onClick={() => {
                  setAdressButton(true);
                }}
              >
                Change
              </CategoryButton>
            ) : (
              <VerticalAddressDiv>
                <TextArea
                  onChange={(e) => {
                    setAdress({ ...address, address: e.target.value });
                  }}
                ></TextArea>
                <TextArea
                  onChange={(e) => {
                    if (validatePostCode(address.post_code)) {
                      setAdress({ ...address, post_code: e.target.value });
                    } else {
                      alert("incorrect post code!");
                    }
                  }}
                ></TextArea>
                <TextArea
                  onChange={(e) => {
                    setAdress((previous) => ({
                      ...previous,
                      country: e.target.value,
                    }));
                  }}
                ></TextArea>
                <CategoryButton
                  fontsize="2vh"
                  padding="0.5vh"
                  background_color="#9bb9f8"
                  onClick={() => {
                    handleUpdate("address", address);
                    handleUpdate("post_code", address);
                    handleUpdate("country", address);
                  }}
                >
                  Apply
                </CategoryButton>
              </VerticalAddressDiv>
            )}
          </HorizontalDiv>

          <CategoryButton
            fontsize="2vh"
            padding="0.5vh"
            background_color="#9bb9f8"
            onClick={() => {
              navigate("/orderhist");
            }}
          >
            Go to order history
          </CategoryButton>
        </VerticalDiv>
      )}
    </div>
  );
};

export default UserProfile;
