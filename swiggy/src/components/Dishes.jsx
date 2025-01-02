import React from 'react'
import { FaStar } from "react-icons/fa";
import { IoArrowForwardOutline } from "react-icons/io5";
import { nonveg, veg } from '../utils/links';
import AddtoCartBtn from './AddtoCartBtn';


function Dishes({
  data: {
    card: {
      card: {
        info ,
        restaurant: {
          info:resInfo,
        },
      },
    },
  },
}) {

   let { imageId = "", name, price, isVeg = 0} = info;
    let {
      id,
      name: resName,
      avgRating,
      sla: { slaString },
     
    } = resInfo;

  return (
    <>
      <div className="w-[45%] my-4 rounded-2xl bg-white h-[250px] p-4">
        <div className="flex justify-between text-sm opacity-50">
          <div>
            <p className="font-bold">By {resName}</p>
            <p className="flex items-center gap-1">
              <FaStar className="font-" />
              {avgRating} . {slaString}
            </p>
          </div>
          <IoArrowForwardOutline className="text-lg" />
        </div>
        <hr className="border-dotted mt-3" />
        <div className="mt-2 flex justify-between">
          <div className="w-[50%]">
            <div className="w-8">
              {isVeg ? <img src={veg} alt="" /> : <img src={nonveg} alt="" />}
            </div>
            {/* <img className="w-8" src={isVeg === 1 ? veg : nonveg} alt="" /> */}
            <h1 className="font-semibold text-[17px]">{name}</h1>
            <h1 className="font-semibold">₹ {price / 100}</h1>
          </div>
          <div className="w-[40%] relative h-full">
            <img
              className="rounded-xl aspect-square"
              src={
                "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                imageId
              }
              alt=""
            />
           <AddtoCartBtn info={info} resInfo={resName}/>
          </div>
        </div>
      </div>
      {/* {console.log(avgRating)} */}
    </>
  );
}

export default Dishes