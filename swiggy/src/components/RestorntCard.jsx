import { split } from "postcss/lib/list";
import React from "react";
import { Link, useParams } from "react-router-dom";

function RestorntCard(info) {
  // console.log(info)
  return (
    <Link to={`/RestorntManu/${info.id}`}>
      <div className="min-w-[283px] h-[182px] relative ">
        <img
          className="w-full h-full rounded-2xl object-cover "
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${info?.cloudinaryImageId}`}
          alt=""
        />
        <div className="absolute top-0 w-full rounded-2xl h-full bg-gradient-to-t from-black from-4% to-35% "></div>
        <p className="absolute bottom-0 ml-3 mb-1 text-white font-bold">
          {info?.aggregatedDiscountInfoV3
            ? info?.aggregatedDiscountInfoV3?.header +
              " " +
              info?.aggregatedDiscountInfoV3?.subHeader
            : ""}
        </p>
      </div>
      <div className="mt-3 ml-3">
        <h1 className="font-semibold text-lg">{info?.name}</h1>
        <p className="flex items-center gap-1 font-semibold text-base">
          <i class="fi fi-ss-circle-star mt-1 text-green-700"></i>
          {info?.avgRating}.<span>{info?.sla?.slaString}</span>
        </p>
        <p className="line-clamp-1 text-black/60 font-medium">
          {info?.cuisines.join(", ")}
        </p>
        <p className="line-clamp-1 text-black/60 font-medium">
          {info?.locality}
        </p>
      </div>
    </Link>
  );
}

export default RestorntCard;
