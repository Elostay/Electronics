"use client";

import { useEffect, useState } from "react";
import CardItem from "./cardItem";

const CardList = ({ items, buy }) => {
  return (
    <div className="flex gap-3 flex-wrap justify-center">
      {items.map((item, idx) => (
        <CardItem key={idx} item={item} chooseItem={buy} />
      ))}
    </div>
  );
};

export default CardList;
