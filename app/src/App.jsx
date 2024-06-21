import { useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";
import SearchResult from "./components/SearchResults/SearchResult";

const BASE_URL = "http://localhost:9000/";

const App = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFoodData() {
      setIsLoading(true);
      try {
        const res = await fetch(BASE_URL);
        const json = await res.json();
        setData(json);
        setIsLoading(false);
      } catch (error) {
        setError("Unable to fetch data");
        setIsLoading(false);
      }
    }
    fetchFoodData();
  }, []);

  console.log(data);

  if (error) return <div>{error}</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <Container>
      <TopContainer>
        <div className="logo">
          <img src="/images/logo.svg" alt="logo" />
        </div>

        <div className="search">
          <input placeholder="Search Food" />
        </div>
      </TopContainer>
      <FilterContainer>
        <Button>All</Button>
        <Button>Breakfast</Button>
        <Button>Lunch</Button>
        <Button>Dinner</Button>
      </FilterContainer>
      <SearchResult data={data} />
    </Container>
  );
};

export default App;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  min-height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      color: white;
      padding: 0 10px;
    }
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;

const Button = styled.button`
  background: #ff4343;
  border-radius: 5px;
  border: none;
  padding: 6px 12px;
  color: white;
`;
