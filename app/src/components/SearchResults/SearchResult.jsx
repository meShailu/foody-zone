import React from "react";
import styled from "styled-components";

const SearchResult = ({ data }) => {
  return (
    <div>
      <FoodCardContainer>
        <FoodCards>
          {data?.map((food) => (
            <FoodCard key={food.name}>{food.text}</FoodCard>
          ))}
        </FoodCards>
      </FoodCardContainer>
    </div>
  );
};

export default SearchResult;

const FoodCardContainer = styled.section`
  background-image: url("/images/bg.png");
  background-size: cover;
  height: calc(100vh-210px);
`;

const FoodCards = styled.div``;
const FoodCard = styled.div``;
