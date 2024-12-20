import React, { useEffect, useState } from "react";
import { VscArrowSmallRight, VscArrowSmallLeft } from "react-icons/vsc";
import RestorntCard from "./RestorntCard";


export default function Toprestaurant({ data }) {
  
  // const [data, setdata] = useState([]);
  const [value, setValue] = useState(0);
  const handlenext = () => {
    value >= 440 ? "" : setValue((prev) => prev + 44);
  };
  const handleprev = () => {
    value <= 0 ? "" : setValue((prev) => prev - 44);
  };

  return (
    <>
      <div className="flex justify-between mt-10">
        <h1 className="font-bold text-xl">
          Top restaurant chains in Ahmedabad
        </h1>
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
              value === 440
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-gray-300 cursor-pointer"
            } rounded-full w-8 h-8 flex justify-center items-center`}
          >
            <VscArrowSmallRight className="text-2xl" />
          </div>
        </div>
      </div>
      <div
        className={`flex mt-4 gap-5 duration-300`}
        style={{ translate: `-${value}%` }}
      >
        {data.map(({info , cta:{link}}) => (
          <div className="hover:scale-95 duration-500 cursor-pointer">
               <RestorntCard {...info} link={link}/>
          </div>
        ))}
      </div>

      <hr className="border mt-10" />
    </>
  );
}
