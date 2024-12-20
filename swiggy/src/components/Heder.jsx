import React, { useContext, useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { IoBagOutline } from "react-icons/io5";
import { IoIosSearch, IoIosHelpBuoy } from "react-icons/io";
import { BiSolidOffer } from "react-icons/bi";
import logo from "../imge/logo.png"; // Make sure the path and file extension are correct
import { Link, Outlet } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { cartContex, coordents, visibility } from "../contexapi/Capi";
import { IoLocationOutline } from "react-icons/io5";
import { BsCartPlusFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toogelSearchBar, toogleLogins } from "../utils/ToogaleSlice";
import { FaRegUser } from "react-icons/fa6";
import { auth, provider } from "../Confing/firebase";
import { addUserData, removUserData } from "../utils/Authslic";
import { signInWithPopup, signOut } from "firebase/auth";

export default function Heder() {
  const navItem = [
    {
      name: "Swiggy Corporate",
      image: <IoBagOutline />,
      path: "/Corporate",
    },
    {
      name: "Search",
      image: <IoIosSearch />,
      path: "/Search",
    },
    {
      name: "Offers",
      image: <BiSolidOffer />,
      path: "/Offers",
    },
    {
      name: "Help",
      image: <IoIosHelpBuoy />,
      path: "/Help",
    },
    {
      name: "Sign in",
      image: <FaRegUser />,
      path: "/Signin",
    },
    {
      name: "Cart",
      image: <BsCartPlusFill />,
      path: "/Cart",
    },
  ];

  const cartData = useSelector((state) => state.CartSlice.cartItems);
  const userData = useSelector((state) => state.authSlice.userData);

  const visible = useSelector((state) => state.toogleSlice.searcBarToogle);
  const loginvisible = useSelector((state) => state.toogleSlice.loginToogle);
  const dispatch = useDispatch();

  const [searchfum, setSearchfun] = useState([]);
  const [setAddresse, setAddres] = useState("");

  function handlevisibility() {
    dispatch(toogelSearchBar());
  }
  function handelLogin() {
    dispatch(toogleLogins());
  }

  async function sarchlocation(value) {
    if (value == "") return;
    const response = await fetch(
      `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${value}`
    );
    const data = await response.json();
    setSearchfun(data.data);
    setAddres(data.data.formatted_address);
  }

  function fetchlaglng(data) {
    handlevisibility();
  }
  //  const userData = useSelector((state) => state.authSlice.userData);

  async function handleAuth() {
    try {
      let data = await signInWithPopup(auth, provider);

      const userData = {
        name: data.user.displayName,
        photo: data.user.photoURL,
      };
      dispatch(addUserData(userData));
     
      naviget("/Cart");
    } catch (error) {
      //  console.error("Error during sign-in:", error);
    }
  }

  async function handleLogout() {
    await signOut(auth);
    dispatch(removUserData());
  }
  console.log(userData);

  return (
    <>
      <div className="w-full">
        <div
          onClick={handlevisibility}
          className={
            "w-full bg-black/50 h-full z-30 absolute " +
            (visible ? "visible" : " invisible")
          }
        ></div>
        <div
          className={
            "bg-white w-[38%] flex justify-end h-full p-4 z-40 absolute duration-700" +
            (visible ? " left-0" : " -left-[100%]")
          }
        >
          <div className="flex flex-col gap-5 w-[55%]">
            <RxCross1 onClick={handlevisibility} />
            <input
              type="text"
              className="border p-5 focus:outline-none focus:shadow-md"
              onChange={(e) => sarchlocation(e.target.value)}
            />
            <div className="border p-4">
              <ul>
                {searchfum.map((data, index) => {
                  const islast = index === searchfum.length - 1;
                  return (
                    <div className="my-1">
                      <div className="flex gap-1 ">
                        <IoLocationOutline className="mt-3" />
                        <li className="m-2" onClick={() => fetchlaglng()}>
                          {data.structured_formatting.main_text}
                          <p className="text-sm opacity-60">
                            {data.structured_formatting.secondary_text}
                          </p>
                          {!islast && (
                            <p className="opacity-50">
                              ----------------------------------
                            </p>
                          )}
                        </li>
                      </div>
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div
          onClick={handelLogin}
          className={
            "w-full bg-black/50 h-full z-30 absolute " +
            (loginvisible ? "visible" : " invisible")
          }
        ></div>
        <div
          className={`bg-white w-[37%] flex h-full p-4 z-40 fixed top-0 duration-700 ${
            loginvisible ? "right-0" : "-right-[100%]"
          }`}
        >
          <div className="w-[80%] p-5 host">
            <RxCross1 className="text-2xl" onClick={handelLogin} />
            {userData ? (
              <>
                <div className="mt-7 flex justify-between items-center">
                  <div className="">
                    <h1 className="text-3xl font-mono">{userData.name}</h1>
                    <p className="text-xl">
                      Hey ,{" "}
                      <span className="text-orange-500">{userData.name}</span>
                    </p>
                  </div>
                  <img
                    className="w-18 rounded-3xl"
                    src={userData.photo}
                    alt=""
                  />
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full p-5 bg-orange-500 text-white font-bold mt-7"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <div className=" w-full flex justify-between items-center">
                  <h1 className="text-3xl font-medium">
                    Login <br />
                    <p className="text-sm font-light mt-3">
                      or{" "}
                      <span className="text-orange-500 font-semibold">
                        Create an account
                      </span>{" "}
                      <br />
                      <div className="w-8 mt-5 border-b-2 border-black"></div>
                    </p>
                  </h1>

                  <img
                    className="w-28"
                    src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
                    alt=""
                  />
                </div>
                <div className="mt-5">
                  <input
                    className="border p-5 w-full "
                    placeholder="Phone number"
                    type="text"
                    name=""
                    id=""
                  />
                  <button
                    onClick={handleAuth}
                    className="w-full p-5 bg-orange-500 text-white font-bold mt-4"
                  >
                    Login
                  </button>
                  <p className="text-sm mt-2 opacity-55">
                    By clicking on Login, I accept the Terms & Conditions &
                    Privacy Policy
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="relative w-full">
        <div className="w-full sticky bg-white z-20 top-0 shadow-md h-20 flex justify-center items-center">
          <div className="logo  w-[70%] flex justify-between">
            <div className="logo-side-slide flex items-center">
              <Link to={"/"}>
                <div className="w-20">
                  <img src={logo} alt="Logo" />
                </div>
              </Link>
              <div
                className="other-icon flex items-center gap-3"
                onClick={handlevisibility}
              >
                <p className="text-lg border-b-2 border-black hover:cursor-pointer">
                  other <span>{setAddresse}</span>
                </p>
                <SlArrowDown className="text-lg text-orange-500" />
              </div>
            </div>
            <div className="text-sm heder-tools flex items-center gap-8">
              {navItem.map((data, i) =>
                data.name == "Sign in" ? (
                  <div onClick={handelLogin}>
                    <div className="flex items-center gap-2">
                      {userData ? (
                        <img
                          className="w-7 rounded-3xl"
                          src={userData.photo}
                          alt=""
                        />
                      ) : (
                        <p className="text-lg text-gray-700 ">{data.image}</p>
                      )}

                      <p className="text-lg text-gray-700 ">
                        {userData ? userData.name : data.name}
                      </p>
                      {userData ? "" : " "}
                      {data.name == "Cart" && <p>{cartData.length}</p>}
                    </div>
                  </div>
                ) : (
                  <Link to={data.path}>
                    <div className="flex items-center gap-2">
                      <p className="text-lg text-gray-700 ">{data.image}</p>
                      <p className="text-lg text-gray-700 ">{data.name}</p>
                      {data.name == "Cart" && <p>{cartData.length}</p>}
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}
