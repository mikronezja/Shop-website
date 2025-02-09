import React, { useContext, useEffect, useState } from "react";
import { SearchBarStyle } from "../../styles/searchBarStyles/WholeSearchBarStyles";
import { CategoryStyle } from "../../styles/searchBarStyles/CategoryStyles";
import styled from "styled-components";
import { UserLoggedContext } from "../../App";
import { ProductType } from "../Types/ProductTypes";
import { useNavigate } from "react-router-dom";
import { CategoryButton } from "../../styles/ButtonStyles";

const BarStyle = styled.input`
  width: 50vw;
  height: 4vh;
  font-size: 3vh;
  border-radius: 1vh;
  color: #6d2c1a;
  font-family: "Search bar font";
  box-shadow: #6d2c1a 4px 4px;
`;
const AddingStylesToCategory = styled.div`
  display: flex;
  gap: 1vw;
  justify-content: flex-start;
  flex-direction: column;
`;
const HorizontalStyles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.5vw;
  align-items: center;
`;

const AppearingHorizontally = styled.div`
  display: flex;
  gap: 10vw;
  justify-content: center;
  flex-direction: row;
`;

interface SearchBarProps {
  writingFunction: (value: string) => void;
  categoryClickedFunction: (category: string) => void;
  removeFiltersFunction: () => void;
}

const SearchBarComponent: React.FC<SearchBarProps> = ({
  writingFunction,
  categoryClickedFunction,
  removeFiltersFunction,
}: SearchBarProps) => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        const productCategories: string[] = data.products.map(
          (product: ProductType) => product.category
        );
        const uniqueCategories = [...new Set(productCategories)]; // Remove duplicates

        setCategories(uniqueCategories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <SearchBarStyle>
        <AddingStylesToCategory>
          <HorizontalStyles>
            <BarStyle
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <CategoryButton
              fontsize="1.3vw"
              background_color="#9bb9f8"
              padding="1vh"
              onClick={() => {
                writingFunction(searchText);
              }}
            >
              submit
            </CategoryButton>
          </HorizontalStyles>

          <AppearingHorizontally>
            {categories.map((item, key) => (
              <CategoryButton
                fontsize="1.3vw"
                background_color="#9bb9f8"
                padding="1vh"
                key={key}
                onClick={() => {
                  categoryClickedFunction(item);
                }}
              >
                {item}
              </CategoryButton>
            ))}
            <CategoryButton
              fontsize="1.3vw"
              background_color="#9bb9f8"
              padding="1vh"
              onClick={removeFiltersFunction}
            >
              remove filters
            </CategoryButton>
          </AppearingHorizontally>
        </AddingStylesToCategory>
      </SearchBarStyle>
    </>
  );
};

export default SearchBarComponent;
