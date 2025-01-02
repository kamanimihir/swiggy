import React, { useState } from "react";
import { addToCart, clearCart } from "../utils/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

function AddtoCartBtn({ info, resInfo }) {
  const cartData = useSelector((state) => state.CartSlice.cartItems || []);
  const SemProductNot = useSelector((state) => state.CartSlice.resInfo || {});
  const dispatch = useDispatch();
  const [isDiffres, setIsDiffres] = useState(false);

  function handleAddToCart() {
    const isAdded = cartData.some((data) => data.id === info.id);

    if (!isAdded) {
      if (!SemProductNot.name || SemProductNot.name === resInfo.name) {
        dispatch(addToCart({ info, resInfo }));
        toast.success("Food added to cart");
      } else {
        toast.error("Your cart contains items from another restaurant.");
        handleToggleDiffres();
      }
    } else {
      toast.error("Item is already in the cart.");
    }
  }

  function handleToggleDiffres() {
    setIsDiffres((prev) => !prev);
  }

  function clearCartAndReset() {
    dispatch(clearCart());
    handleToggleDiffres();
    toast.success("Cart is MT");
    // Clear localStorage if necessary
    localStorage.clear();
  }

  return (
    <>
      <button
        onClick={handleAddToCart}
        className="absolute px-10 drop-shadow font-bold py-2 rounded-xl text-lg text-green-500 bg-white bottom-[-22px] left-6 border"
      >
        Add
      </button>
      {isDiffres && (
        <div className="w-[520px] h-[204px] fixed bottom-5 left-[32%] shadow-2xl z-50 flex items-center">
          <div className="bg-white rounded-lg p-6 w-full">
            <h2 className="text-lg font-semibold">Items already in cart</h2>
            <p className="text-gray-700 mt-2">
              Your cart contains items from another restaurant. Would you like
              to reset your cart for adding items from this restaurant?
            </p>
            <div className="flex justify-between w-full mt-6">
              <button
                onClick={handleToggleDiffres}
                className="px-4 w-[46%] py-2 border-green-600 border text-green-600"
              >
                NO
              </button>
              <button
                onClick={clearCartAndReset}
                className="px-4 w-[46%] py-2 bg-green-600 text-white"
              >
                YES, START AFRESH
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddtoCartBtn;
