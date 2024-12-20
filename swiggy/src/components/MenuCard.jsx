import React, { createContext, useContext, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp, IoIosStar } from "react-icons/io";
import { cartContex } from "../contexapi/Capi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart } from "../utils/CartSlice";
import toast from "react-hot-toast";

let veg =
  "https://packagingguruji.com/wp-content/uploads/2022/09/Veg-Logo-2.png";
let nonveg =
  "https://packagingguruji.com/wp-content/uploads/2022/09/Old-Non-Veg-Logo.png";

export default function MenuCard({ card, resInfo }) {
  let popcon = false;
  if (card["@type"]) {
    popcon = true;
  }

  const [isDown, setisDown] = useState(popcon);

  const toggleDropDown = () => {
    setisDown((prev) => !prev);
  };


  if (card.itemCards) {
    const { title, itemCards } = card;
    // console.log(itemCards)
    return (
      <>
        <div className="mt-7 cursor-pointer " onClick={toggleDropDown}>
          <div className="flex justify-between">
            <h1 className={"font-bold text-" + (card["@type"] ? "xl" : "base")}>
              {title} ({itemCards.length})
            </h1>
            <div className="cursor-pointer">
              {isDown ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
          </div>
        </div>

        {isDown && (
          <div className="my-7">
            {itemCards.map(({ card: { info } }) => (
              <DitelMenuCart info={info} resInfo={resInfo} />
            ))}
          </div>
        )}
        <hr className={"my-4 border-" + (card["@type"] ? "[10px]" : "[6px]")} />
      </>
    );
  } else {
    const { title, categories } = card;

    return (
      <>
        <div>
          <h1 className="font-bold text-lg">{title}</h1>
          {categories.map((category) => (
            <MenuCard card={category} resInfo={resInfo} />
          ))}
        </div>
      </>
    );
  }
}

function DitelMenuCart({ info, resInfo }) {
  const {
    name,
    defaultPrice,
    price,
    itemAttribute: { vegClassifier },
    ratings: {
      aggregatedRating: { rating, ratingCountV2 },
    },
    description,
    imageId,
  } = info;

  // const { cartData, setCardData } = useContext(cartContex);
  const cartData = useSelector((state) => state.CartSlice.cartItems || []);
  const [isDiffres, setisDiffres] = useState(false);

  const SemProductNot = useSelector((state) => state.CartSlice.resInfo || {});
  const dispatch = useDispatch();

  function handlAddtoCart() {
    //  console.log("resInfo:", resInfo);
  const isAdded = cartData.some((data) => data.id === info.id);

  if (!isAdded) {
    if (!SemProductNot.name || SemProductNot.name === resInfo.name) {
      dispatch(addToCart({ info, resInfo }));
      toast.success("Food added to cart");
    } else {
      toast.error("Your cart contains items from another restaurant.");
      handlisNo(); // Ensure this function is defined
    }
  } else {
    toast.error("Item is already in the cart.");
  }
  }

  function handlisNo(){
    setisDiffres((prev) => !prev);
  }

function ClearCart() {
  dispatch(clearCart());
  handlisNo()
  setCardData([]);
  // localStorage.clear()
}
  return (
    <>
      <div className="">
        <div className="flex w-full justify-between min-h-[182px]">
          <div className="w-[70%] ">
            <img
              className="w-8"
              src={vegClassifier === "VEG" ? veg : nonveg}
              alt=""
            />
            {/* <p>{vegClassifier}</p> */}
            <h2 className="font-bold text-lg">{name}</h2>
            <p className="font-bold text-lg">
              ₹{defaultPrice / 100 || price / 100}
            </p>
            <p className="flex items-center gap-1">
              <IoIosStar className="text-green-500" />{" "}
              <span>
                {rating} ({ratingCountV2})
              </span>
            </p>
            <p>{description}</p>
          </div>
          <div className="w-[20%] relative h-full">
            <img
              className="rounded-xl aspect-square"
              src={
                "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                imageId
              }
              alt=""
            />
            <button
              onClick={handlAddtoCart}
              className="absolute px-10 drop-shadow font-bold py-2 rounded-xl text-lg text-green-500 bg-white bottom-[-22px] left-6  border"
            >
              Add
            </button>
          </div>
        </div>
        <hr className="my-5 border-[1px]" />
        {isDiffres && (
          <div className="w-[520px] h-[204px] fixed bottom-5  left-[32%] shadow-2xl z-50 flex items-center">
            <div className="bg-white rounded-lg  p-6  w-full">
              <h2 className="text-lg font-semibold">Items already in cart</h2>
              <p className="text-gray-700 mt-2">
                Your cart contains items from another restaurant. Would you like
                to reset your cart for adding items from this restaurant?
              </p>
              <div className="flex justify-between w-full mt-6">
                <button
                  onClick={handlisNo}
                  className="px-4 w-[46%] py-2 border-green-600 border text-green-600"
                >
                  NO
                </button>
                <button
                  onClick={ClearCart}
                  className="px-4 w-[46%] py-2 bg-green-600  text-white"
                >
                  YES, START AFRESH
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
