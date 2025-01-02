import { useContext, useEffect, useState } from "react";
import OntimeManu from "./OntimeManu";
import Toprestaurant from "./Toprestaurant";
import OnlineDelivery from "./OnlineDelivery";
import { coordents } from "../contexapi/Capi";
import { useSelector } from "react-redux";

export default function Hero() {
  const [DataToprestaurant, setDataToprestaurant] = useState([]);
  const [DataontimeManu, setDataontimeManu] = useState([]);

  // api
  async function fetchData() {
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.327776112545223&lng=73.1765165179968&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING" );
    const response = await data.json();

    setDataToprestaurant(
      
      response?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setDataontimeManu(
      response?.data?.cards[0]?.card?.card?.imageGridCards?.info
    );
  }

  useEffect(() => {
    fetchData();
  }, []);

  const filterVal = useSelector((state) => state.filterSlice.filterVal);
  // console.log(DataToprestaurant);
const filteredData = DataToprestaurant.filter((item) => {
  if (!filterVal) return true;

  switch (filterVal) {
    case "Rating 4.0+":
      return item?.info?.avgRating && item.info.avgRating > 4;

    case "Offers":
      // Placeholder for additional logic if needed
      return true;

    case "Rs. 300-Rs. 600":
      const costForTwo = parseInt(
        item?.info?.costForTwo?.replace(/[^\d]/g, ""),
        10
      );
      return costForTwo >= 300 && costForTwo <= 600;

    case "Less then Rs. 300":
      const costForTwoUnder300 = parseInt(
        item?.info?.costForTwo?.replace(/[^\d]/g, ""),
        10
      );
      return costForTwoUnder300 < 300;

    case "Fast Delivery":
      const slaString = item?.info?.sla?.slaString || "";
      const maxDeliveryTime = parseInt(
        slaString.split("-")[1]?.replace(" mins", "").trim(),
        10
      );
      return maxDeliveryTime && maxDeliveryTime <= 25;

    default:
      return true;
  }
});


  return (
    <>
      <div className="hero-main w-full">
        <div className="hero-sliders w-[80%] mx-auto mt-3 overflow-hidden">
          <OntimeManu data={DataontimeManu} />
          <Toprestaurant data={DataToprestaurant} />
          <OnlineDelivery data={filterVal ? filteredData : DataToprestaurant} />
        </div>
      </div>
    </>
  );
}
