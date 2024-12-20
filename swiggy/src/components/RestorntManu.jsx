import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VscArrowSmallRight, VscArrowSmallLeft } from "react-icons/vsc";
import { CiSearch } from "react-icons/ci";
import MenuCard from "./MenuCard";



export default function RestorntManu() {
  const { id } = useParams();

  let mainId = id.split("-").at(-1);

  const [menuData, setMenuData] = useState([]);
  const [resInfo, setResInfo] = useState([]);
  const [discountData, setDiscountData] = useState([]);
  const [topdata, setTopData] = useState(null);
  const [value, setValue] = useState(0);
 
  // console.log(resInfo);
 
  const handlenext = () => {
    value >= 132 ? "" : setValue((prev) => prev + 44);
  };
  const handleprev = () => {
    value <= 0 ? "" : setValue((prev) => prev - 44);
  };
  

  async function fetchMenu() {
    let data = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.5355161&lng=77.3910265&restaurantId=${mainId}&catalog_qa=undefined&submitAction=ENTER`
    );

    let res = await data.json();
    
    // console.log(topdata);
    setResInfo(res?.data?.cards[2]?.card?.card?.info);
    setDiscountData(
      res?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
    );

  // console.log(res);

    let newData =
      (res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(
        (data) => data?.card?.card?.itemCards || data?.card?.card?.categories
      );
 
    setTopData(
      (res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(data => data?.card?.card?.title == "Top Picks")[0]);
    setMenuData(newData);
  }

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <>
      <div className="w-full ">
        <div className="w-[800px]  mx-auto pt-10">
          <p className="text-xs">
            <span className="text-slate-400 hover:text-slate-700 cursor-pointer">
              Home
            </span>
            /
            <span className="text-slate-400 hover:text-slate-700 cursor-pointer">
              {resInfo.city}
            </span>
            / <span className="text-slate-700">{resInfo.name}</span>
          </p>
          <h1 className="font-bold pt-10 ps-4 text-2xl">{resInfo.name}</h1>
          <div className="w-full h-[206px] bg-gradient-to-t from-slate-200/90 px-4 pb-4  mt-7 rounded-[30px]">
            <div className="w-full border rounded-[30px]  h-full bg-white ">
              <div className="p-4 w-full">
                <div className="flex items-center gap-2 font-bold">
                  <i class="fi fi-ss-circle-star mt-1 text-green-600"></i>
                  <span>{resInfo.avgRating}</span>
                  <span>({resInfo.totalRatingsString})</span> .
                  <span>{resInfo.costForTwoMessage}</span>
                </div>
                <p className="underline text-orange-600 font-semibold">
                  {resInfo?.cuisines?.join(", ")}
                </p>
                <div className="flex gap-2 mt-1">
                  <div className="w-[7px] flex flex-col items-center pt-4">
                    <div className="w-[7px] h-[7px] bg-gray-400 rounded"></div>
                    <div className="w-[1px] h-[24px] bg-gray-400"></div>
                    <div className="w-[7px] h-[7px] bg-gray-400 rounded"></div>
                  </div>
                  <div className="flex flex-col gap-1 pt-2 font-semibold">
                    <p>
                      Outlet{" "}
                      <span className="text-gray-400">{resInfo.locality}</span>
                    </p>
                    <p>{resInfo.sla?.slaString}</p>
                  </div>
                </div>
              </div>
              <hr />
              <div className=" w-full bg-gradient-to-l from-orange-100 from-8% to-30%">
                <div className="flex items-center p-2">
                  <img
                    className="w-[43px] h-[15px]"
                    src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_86,h_30/Swiggy%20One%20Lite/One_lite_Horizontal.png"
                    alt=""
                  ></img>
                  <span className="ms-2 text-orange-600 font-semibold ">
                    Free delivery on orders above ₹199
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full overflow-hidden">
            <div className="flex justify-between mt-4">
              <h1 className="font-bold text-xl">Deals for you</h1>
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
                    value === 132
                      ? "bg-gray-200 cursor-not-allowed"
                      : "bg-gray-300 cursor-pointer"
                  } rounded-full w-8 h-8 flex justify-center items-center`}
                >
                  <VscArrowSmallRight className="text-2xl" />
                </div>
              </div>
            </div>
            <div
              style={{ translate: `-${value}%` }}
              className={`flex duration-500`}
            >
              <div className="flex gap-4 mt-4">
                {discountData.map((data) => (
                  <Discount data={data} />
                ))}
              </div>
            </div>
          </div>
          <h2 className="text-center mt-8 ">MENU</h2>
          <div className="w-full mt-5 relative cursor-pointer">
            <div className="w-full bg-slate-200 text-center p-3 rounded-xl font-semibold text-slate-700 ">
              Search for dishes
            </div>
            <CiSearch className="absolute top-4 text-xl right-4 cursor-default" />
          </div>

          {topdata && (
            <div className="w-full overflow-hidden">
              <div className="flex justify-between mt-4">
                <h1 className="font-bold text-xl">Top Pics</h1>
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
                      value === 132
                        ? "bg-gray-200 cursor-not-allowed"
                        : "bg-gray-300 cursor-pointer"
                    } rounded-full w-8 h-8 flex justify-center items-center`}
                  >
                    <VscArrowSmallRight className="text-2xl" />
                  </div>
                </div>
              </div>
              <div
                style={{ translate: `-${value}%` }}
                className={`flex duration-500`}
              >
                <div className="flex gap-4 mt-4">
                  {topdata.card.card.carousel.map(
                    ({
                      creativeId,
                      dish: {
                        info: { price, defaultPrice },
                      },
                    }) => (
                      <div className="min-w-[354px] h-[365px] relative">
                        <img
                          className="w-full h-full"
                          src={
                            "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/" +
                            creativeId
                          }
                          alt=""
                        />
                        <div className="absolute bottom-3 text-white flex justify-between w-full px-6">
                          <p className="">
                            ₹{defaultPrice / 100 || price / 100}
                          </p>
                          <button className="px-9 py-2 font-bold text-green-500 bg-white rounded-md">
                            Add
                          </button>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
          <div>
            {menuData.map(({ card: { card } }) => (
              <MenuCard card={card} resInfo={resInfo} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function Discount({
  data: {info: { description, header, offerLogo },},
}) {
  
  return (
    <div className="flex gap-2  min-w-[356px] border rounded-2xl p-3  h-[76px]">
      <img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/" + offerLogo} />

      <div>
        <p className="font-bold text-xl">{header}</p>
        <h2 className="font-semibold text-[15px] text-slate-400">{description}</h2>
      </div>
    </div>
  );
  

}
