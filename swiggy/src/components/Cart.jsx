import React from 'react'
// import React, { useContext } from "react";
// import { cartContex } from "../contexapi/Capi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, deletItem } from "../utils/CartSlice";
import toast, { ToastBar } from "react-hot-toast";
import { IoIosArrowDown, IoIosArrowUp, IoIosStar } from "react-icons/io";
import { toogleLogins } from "../utils/ToogaleSlice";
import { RxCross1 } from "react-icons/rx";



let veg =
  "https://packagingguruji.com/wp-content/uploads/2022/09/Veg-Logo-2.png";
let nonveg =
  "https://packagingguruji.com/wp-content/uploads/2022/09/Old-Non-Veg-Logo.png";

function Cart() {
  const navigate = useNavigate();
  const cartData = useSelector((state) => state.CartSlice.cartItems);
  const resInfo = useSelector((state) => state.CartSlice.resInfo);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authSlice.userData);

let totalPrice = cartData.reduce((acc, item) => {
  const price = (item.price || item.defaultPrice || 0) / 100;
  return acc + price * (item.quantity || 1);
}, 0);
  function handleRemoCart(index) {
    if (cartData.length > 1) {
      const newCart = cartData.filter((_, i) => i !== index);
      dispatch(deletItem(newCart));
      toast.success("Food Removed");
    } else {
      ClearCart();
      toast.success("Cart Cleared");
    }
  }

  function ClearCart() {
    dispatch(clearCart());
    toast.success("Cart Cleared");
  }

  function handlePlaceOrder() {
    if (!userData) {
      toast.error("Please log in to place an order");
      dispatch(toogleLogins());
      return;
    }
    toast.success("Order Placed!");
  }

  if (cartData.length === 0) {
    return (
      <div className="w-full">
        <div className="w-[50%] mx-auto">
          <h1>Your cart is empty</h1>
          <div className="text-center">
            <img
              className="mt-8 mb-6 mx-auto w-[516px] h-[408px]"
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
              alt="Empty Cart"
            />
            <h2>You can go to the home page to view more restaurants</h2>
            <Link to="/" className="bg-green-400">
              <button className="mt-4 px-10 drop-shadow font-bold py-2 text-lg text-white bg-orange-600 border">
                See restaurants near you
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-[55%] mx-auto">
        <Link to={`/RestorntManu/${resInfo.id}`}>
          <div className="my-6 flex gap-3">
            <img
              className="aspect-square"
              src={
                "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_80,h_80,c_fit/" +
                resInfo.cloudinaryImageId
              }
              alt="Restaurant"
            />
            <div>
              <h2 className="text-lg font-medium">{resInfo.name}</h2>
              <h2 className="font-normal opacity-60">{resInfo.areaName}</h2>
              <div className="w-8 mt-3 border-b-2 border-black"></div>
            </div>
          </div>
        </Link>

        <div>
          {cartData.map((item, i) => (
            <div key={item.id}>
              <div className="flex w-[40%] justify-between mx-auto">
                <div className="w-[60%]">
                  <img
                    className="w-8"
                    src={
                      item.itemAttribute?.vegClassifier === "VEG" ? veg : nonveg
                    }
                    alt={item.itemAttribute?.vegClassifier || "Unknown"}
                  />
                  <h2 className="font-bold text-sm">{item.name}</h2>
                  <p className="font-bold text-md mt-2 text-green-700">
                    ₹{(item.defaultPrice || item.price) / 100}
                  </p>
                </div>
                <div className="w-[20%] flex gap-5 h-full">
                  <img
                    className="rounded-xl aspect-square"
                    src={
                      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                      item.imageId
                    }
                    alt="Item"
                  />
                  <button
                    onClick={() =>
                      dispatch(
                        updateCartQuantity({
                          id: item.id,
                          quantity: item.quantity - 1,
                        })
                      )
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      dispatch(
                        updateCartQuantity({
                          id: item.id,
                          quantity: item.quantity + 1,
                        })
                      )
                    }
                  >
                    +
                  </button>
                  <button onClick={() => handleRemoCart(i)} className="">
                    <RxCross1 className="text-xl" />
                  </button>
                </div>
              </div>
              <hr className="w-[40%] mx-auto p-2" />
            </div>
          ))}
        </div>

        <p>Total: ₹{totalPrice}</p>
        <div className="flex justify-between">
          <button onClick={ClearCart} className="p-2 bg-green-500 rounded-lg">
            Clear Cart
          </button>
          <button
            onClick={handlePlaceOrder}
            className="p-2 bg-green-500 rounded-lg"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart