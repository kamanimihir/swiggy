import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dishes, setDishes] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);

  const filterOption = ["Restaurant", "Dishes"];
  const [activeBtn, setActivBtn] = useState("Dishes");

  function handleFilterBtn(filterName) {
    setActivBtn(activeBtn === filterName ? activeBtn : filterName);
  }

  async function fetchDishes() {
    let data = await fetch(
      `https://www.swiggy.com/dapi/restaurants/search/v3?lat=22.327776112545223&lng=73.1765165179968&str=pi&trackingId=81f00aef-1f7b-8fab-ebee-6777e082e54e&submitAction=ENTER&queryUniqueId=bc5017af-7e32-a9d5-a05b-e255337dcdd4`
    );
    let res = await data.json();
    let finaldata =
      (res?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards).filter(
        (data) => data?.card?.card?.info
      );

    setDishes(finaldata);
  }
  async function fetchResturntData() {
    let data = await fetch(
      `https://www.swiggy.com/dapi/restaurants/search/v3?lat=22.327776112545223&lng=73.1765165179968&str=pi&trackingId=undefined&submitAction=ENTER&queryUniqueId=bc5017af-7e32-a9d5-a05b-e255337dcdd4&selectedPLTab=RESTAURANT`
    );
    let res = await data.json();
    const finaldata =
      res?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards.filter(
        (data) => data?.card?.card?.info
      );
    setRestaurantData(finaldata);
  }

  console.log(restaurantData);
  useEffect(() => {
    if (searchQuery === "") {
      return;
    }
    fetchDishes();
    fetchResturntData();
  }, [searchQuery]);
  return (
    <div className="w-full md:w-[50%] mx-auto mt-8">
      
      <input
        className="w-full border-2 p-2 focus:outline-none"
        type="text"
        placeholder="search for restaurant and food"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="my-2 flex gap-3">
        {searchQuery}
        {filterOption.map((filterName) => (
          <button
            onClick={() => handleFilterBtn(filterName)}
            className={
              "fillterbtn flex items-center gap-2 " +
              (activeBtn === filterName ? "active" : "")
            }
          >
            {filterName}
          </button>
        ))}
      </div>
      <div className="w-full md:w-[700px] bg-[#f4f5f7]">
        {activeBtn === "Dishes"
          ? dishes.map(
              ({
                card: {
                  card: {
                    info: { imageId = "", name, price, isVeg = 0 },
                    restaurant: {
                      info: {
                        id,
                        name: resName,
                        avgRating,
                        sla: { slaString },
                      },
                    },
                  },
                },
              }) => <h1>{name}</h1>
            )
          : restaurantData.map(
              ({
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
              }) => <h1>{name}</h1>
            )}
      </div>
    </div>
  );
}

export default Search;
