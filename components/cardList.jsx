"use client";

import { useEffect, useState } from "react";

const CardList = () => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=20");

    const data = await response.json();
    setItems(data.products);
    console.log(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      {items.map((item) => (
        <img key={item.id} src={item.thumbnail} width="300" height="300" />
      ))}
    </div>
  );
};

export default CardList;
