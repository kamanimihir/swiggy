import React, { useState, } from "react";
import RestorntCard from "./RestorntCard";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { setFilterValue } from "../utils/filterSlice";

export default function OnlineDelivery({ data }) {
  const filterOption = [
    {
      filterName: "Rating 4.0+",
    },
    {
      filterName: "Offers",
    },
    {
      filterName: "Rs. 300-Rs. 600",
    },
    {
      filterName: "Less then Rs. 300",
    },
    {
      filterName: "Fast Delivery",
    }
  ];

 
  const [activeBtn, setActivBtn] = useState(null);
  const dispatch = useDispatch()
  function handleFilterBtn(filterName) {
    setActivBtn(activeBtn === filterName? null : filterName)
  }
  
  dispatch(setFilterValue(activeBtn))



  return (
    <div className="mt-10">
      <h1 className="font-bold text-xl">
        Restaurants with online food delivery in Ahmedabad
      </h1>
      <div className="my-2 flex gap-3">
        {filterOption.map((data) => (
          <button
            onClick={()=>handleFilterBtn(data.filterName)}
            className={"fillterbtn flex items-center gap-2 " + (activeBtn === data.filterName?"active":"")}
          >
            {data.filterName} <RxCross2 className="hidden i" />
          </button>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-5 mt-10">
        {data.map(({ info, cta: { link } }) => (
          <div className="hover:scale-95 duration-500 cursor-pointer">
            <RestorntCard {...info} link={link} />
          </div>
        ))}
      </div>
    </div>
  );
}
