"use client";

import { useState } from "react";
import CardList from "@components/cardList";
const Home = () => {
  const { page, setPage } = useState(1);
  /**
   * page 1 = 20 (skip)
   * page 2 = 20 *1(skip)
   * page 3 = 20 *2(skip)
   */
  const handleNextClick = () => {
    setPage((prev) => (prev === 100 ? prev : prev + 1));
  };
  const handlePrevClick = () => {
    setPage((prev) => (prev === 1 ? prev : prev - 1));
  };
  return (
    <div>
      <CardList />
      <div className="flex justify-between">
        <button type="button" onClick={handlePrevClick}>
          Prev
        </button>
        <button type="button" onClick={handleNextClick}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
