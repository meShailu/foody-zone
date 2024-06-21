import { useDebugValue, useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";
import SearchResult from "./components/SearchResults/SearchResult";

export const BASE_URL = "http://localhost:9000/";

const App = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedButton, setSelectedButton] = useState("all");

  useEffect(() => {
    async function fetchFoodData() {
      setIsLoading(true);
      try {
        const res = await fetch(BASE_URL);
        const json = await res.json();
        setData(json);
        setFilteredData(json);
        setIsLoading(false);
      } catch (error) {
        setError("Unable to fetch data");
        setIsLoading(false);
      }
    }
    fetchFoodData();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);

    if (searchValue === "") {
      setFilteredData(null);
    }

    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);
  };

  function fiterFood(type) {
    if (type === "all") {
      setFilteredData(data);
      setSelectedButton("all");
      return;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSelectedButton("type");
  }

  const filterBtns = [
    { name: "All", type: "all" },
    { name: "Breakfast", type: "breakfast" },
    { name: "Lunch", type: "lunch" },
    { name: "Dinner", type: "dinner" },
  ];

  if (error) return <div>{error}</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/images/logo.svg" alt="logo" />
          </div>

          <div className="search">
            <input onChange={searchFood} placeholder="Search Food" />
          </div>
        </TopContainer>
        <FilterContainer>
          {filterBtns.map((value) => (
            <Button key={value.name} onClick={() => fiterFood(value.type)}>
              {value.name}{" "}
            </Button>
          ))}
        </FilterContainer>
      </Container>
      <SearchResult data={filteredData} />
    </>
  );
};

export default App;

export const Container = styled.div`
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

export const Button = styled.button`
  background: #ff4343;
  border-radius: 5px;
  border: none;
  padding: 6px 12px;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #f22f2f;
  }
`;
