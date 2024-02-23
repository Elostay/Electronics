"use client";

import { useEffect, useState } from "react";
import CardList from "@components/cardList";
import Modal from "@components/modal";

const Home = () => {
  const { page, setPage } = useState(1);
  /**
   * page 1 = 20 (skip)
   * page 2 = 20 *1(skip)
   * page 3 = 20 *2(skip)
   */

  const [items, setItems] = useState([]);
  const [searchItems, setSearchItems] = useState(
    "https://dummyjson.com/products?limit=20"
  );
  const [isOpen, setIsOpen] = useState(false);
  const [itemsToBuy, setItemsToBuy] = useState([]);
  const [modalItemsRender, setModalItemsRender] = useState([]);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isBoughtModalOpen, setIsBoughtModalOpen] = useState(false);

  const openModal = async () => {
    setIsOpen(true);

    try {
      const promises = itemsToBuy.map((item) =>
        fetch(`https://dummyjson.com/products/${item.toString()}`)
      );

      const responses = await Promise.all(promises);

      const data = await Promise.all(
        responses.map((response) => response.json())
      );

      const products = data.flat();
      setModalItemsRender(products);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const closeModal = () => setIsOpen(false);

  const openOrderModal = async () => {
    setIsOrderModalOpen(true);
  };
  const closeOrderModal = () => setIsOrderModalOpen(false);

  const openBoughtModal = async () => {
    setIsBoughtModalOpen(true);
  };
  const closeBoughtModal = () => setIsBoughtModalOpen(false);

  const fetchItems = async () => {
    const response = await fetch(searchItems);

    const data = await response.json();
    setItems(data.products);
    console.log(data);
  };

  const handleCategory = async (category) => {
    switch (category) {
      case "all items":
        setSearchItems("https://dummyjson.com/products?limit=20");

        break;
      case "smartphones":
        setSearchItems(
          "https://dummyjson.com/products/category/smartphones?limit=20"
        );

        break;
      case "laptops":
        setSearchItems(
          "https://dummyjson.com/products/category/laptops?limit=20"
        );

        break;

      case "motorcycle":
        setSearchItems(
          "https://dummyjson.com/products/category/motorcycle?limit=20"
        );

        break;
      case "lighting":
        setSearchItems(
          "https://dummyjson.com/products/category/lighting?limit=20"
        );

        break;
      default:
        setSearchItems("https://dummyjson.com/products?limit=20");
        break;
    }
  };

  useEffect(() => {
    fetchItems();
  }, [searchItems]);

  const btnsArray = [
    "all items",
    "smartphones",
    "laptops",
    "motorcycle",
    "lighting",
  ];
  const handleNextClick = () => {
    setPage((prev) => (prev === 100 ? prev : prev + 1));
  };
  const handlePrevClick = () => {
    setPage((prev) => (prev === 1 ? prev : prev - 1));
  };
  const handleBuyClick = (itemId) => {
    const newItems = [...itemsToBuy, itemId];
    setItemsToBuy(newItems);
  };
  const handleDeleteItem = async (itemId) => {
    const newArray = modalItemsRender.filter((item) => item.id !== itemId);
    console.log(newArray);
    setModalItemsRender(newArray);
    const newItemsToBuy = itemsToBuy.filter((item) => item !== itemId);
    console.log("💖 ~ handleDeleteItem ~ newItemsToBuy:", newItemsToBuy);
    setItemsToBuy(newItemsToBuy);
  };
  //   useEffect(() => {}, [modalItemsRender]);
  return (
    <div className="p-20">
      <div className="flex justify-center gap-20 mb-10 ">
        <ul className="flex gap-10  text-center">
          {btnsArray.map((btn, idx) => (
            <li key={idx}>
              <button
                className="capitalize"
                type="button"
                onClick={() => handleCategory(btn)}
              >
                {btn}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center ">
          <button type="button" onClick={openModal}>
            <img
              src="/images/shopping-basket.svg"
              alt=""
              width={30}
              height={30}
            />
          </button>
          <Modal isOpen={isOpen} onClose={closeModal}>
            <h1 className="text-lg font-bold mb-4">Your shopping list</h1>
            <div className="flex flex-col gap-4">
              {modalItemsRender.map((item, idx) => (
                <div key={idx} className="flex justify-between">
                  <p>{item.title}</p>
                  <div className="flex items-center gap-5">
                    <p>{item.price}</p>
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <img
                        src="/images/delete.svg"
                        alt=""
                        width={30}
                        height={30}
                      />
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex self-end items-center justify-end gap-8 bg-green-100 border border-green-700 px-6 py-4 w-48 font-bold text-lg">
                {modalItemsRender.reduce((acc, item) => acc + item.price, 0)}
                <button
                  onClick={openOrderModal}
                  type="button"
                  className="text-white bg-green-500 px-5 py-3 rounded"
                >
                  Buy
                </button>
                <Modal isOpen={isOrderModalOpen} onClose={closeOrderModal}>
                  <form className="flex flex-col gap-5">
                    <input type="name" placeholder="Your first name" />
                    <input type="name" placeholder="Your second name" />
                    <input type="number" placeholder="Your phone number" />
                    <button
                      onClick={openBoughtModal}
                      type="button"
                      className="text-white bg-green-500 px-5 py-3 rounded"
                    >
                      Buy
                    </button>
                    <Modal
                      isOpen={isBoughtModalOpen}
                      onClose={closeBoughtModal}
                    >
                      <h1 className="h-[300px] flex items-center">
                        Thank you for your purchase, our manager will contact
                        you soon! 😊
                      </h1>
                    </Modal>
                  </form>
                </Modal>
              </div>
            </div>
          </Modal>
        </div>
      </div>
      <CardList items={items} buy={handleBuyClick} />
      {/* <div className="flex justify-between">
        {searchItems === "https://dummyjson.com/products?limit=20" && (
          <>
            <button
              type="button"
              onClick={handlePrevClick}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={handleNextClick}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Next
            </button>
          </>
        )}
      </div> */}
    </div>
  );
};

export default Home;
