import React from 'react'
import { FaStar } from "react-icons/fa";

function SearchRestorent({
  data: {
    card: {
      card: {
        info: {
          id,
          cloudinaryImageId,
          aggregatedDiscountInfoV3 = {},
          costForTwoMessage,
          cuisines,
          promoted = false,
          name,
          avgRating,
          sla: { slaString },
        },
      },
    },
  },
}) {
  return (
    <>
      <div className="w-[48%] my-4 rounded-2xl bg-white h-[150px] p-5 flex gap-3">
        <div className="w-[30%]">
          <img
            className="aspect-square rounded-lg"
            src={
              "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_280,h_300,c_fit/" +
              cloudinaryImageId
            }
            alt=""
          />
        </div>
        <div className="w-[50%] ">
          <p className="text-lg font-semibold">{name}</p>
          <p className="flex items-center gap-1 text-gray-600 text-sm">
            <FaStar className="text-yellow-400" />
            {avgRating} · {slaString}
            <span className="ml-2">{costForTwoMessage}</span>
          </p>
          <p className="text-gray-500 text-sm line-clamp-1">
            {cuisines.join("  ")}
          </p>
        </div>
      </div>
    </>
  );
}

export default SearchRestorent