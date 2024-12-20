import React, { useEffect, useState } from "react";

import { VscArrowSmallRight, VscArrowSmallLeft } from "react-icons/vsc";
import { ShimmerDiv } from "shimmer-effects-react";

export default function OntimeManu({ data }) {
  const [value, setValue] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state (e.g., API call)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust time as needed
    return () => clearTimeout(timer);
  }, []);

  const handlenext = () => {
    value >= 176 ? "" : setValue((prev) => prev + 44);
  };
  const handleprev = () => {
    value <= 0 ? "" : setValue((prev) => prev - 44);
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-bold text-xl">What's in your mind?</h1>
        <div className="flex gap-2">
          <div
            onClick={handleprev}
            className={`${
              value === 0
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-gray-300 cursor-pointer"
            } rounded-full w-8 h-8 flex justify-center items-center`}
          >
            <VscArrowSmallLeft className="text-2xl" />
          </div>
          <div
            onClick={handlenext}
            className={`${
              value === 176
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-gray-300 cursor-pointer"
            } rounded-full w-8 h-8 flex justify-center items-center`}
          >
            <VscArrowSmallRight className="text-2xl" />
          </div>
        </div>
      </div>
      <div style={{ translate: `-${value}%` }} className={`flex duration-300`}>
        {isLoading ? (
          <ShimmerDiv
            mode="light"
            height={145}
            width={142}
            rounded={50}
            className="mt-7"
          />
        ) : (
          data.map((item) => (
            <img
              className="w-40"
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`}
              alt=""
            />
          ))
        )}
      </div>
      <hr className="border" />
    </>
  );
}
