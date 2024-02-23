import Image from "next/image";
import React from "react";

const CardItem = ({ item, chooseItem }) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg flex flex-col justify-between">
      <div className="aspect-w-1 aspect-h-1">
        <img
          className="block object-cover w-full h-[250px]"
          src={item.thumbnail}
          alt={item.title}
          width="300"
          height="300"
        />
      </div>
      <div className="px-6 py-4 h-[200px]">
        <div className="font-bold text-xl mb-2">{item.title}</div>
        <p className="text-gray-700 text-base mb-2">Brand: {item.brand}</p>
        <p className="text-gray-700 text-base line-clamp-3 mb-2">
          {item.description}
        </p>
        <p className="text-gray-700 text-base mb-2 font-bold">
          Price: {item.price}
        </p>
        <p className="text-gray-700 text-base mb-2 font-bold">
          Stock: {item.stock}
        </p>
      </div>

      <button
        type="button"
        className="w-full bg-green-400 text-white py-2 rounded-md shadow-md hover:bg-green-500"
        onClick={() => chooseItem(item.id)}
      >
        Buy
      </button>
    </div>
  );
};

export default CardItem;
