  import {  Route, Routes } from "react-router-dom";
  import Heder from "./components/heder";
  import Hero from "./components/Hero";
  import RestorntManu from "./components/RestorntManu";
  import { useEffect, useState } from "react";
  import { visibility,cartContex } from "./contexapi/capi";
  // import Card from "./components/Card";
  import { useSelector } from "react-redux";
  import Signin from "./components/Signin";
import Search from "./components/Search";
import Cart from "./components/Cart";
import Corporate from "./components/Corporate";


  function App() {
    const visible = useSelector((state) => state.toogleSlice.searcBarToog);
    const loginvisible = useSelector((state) => state.toogleSlice.loginToogle);


    useEffect(() => {
      if (visible || loginvisible) {
        document.body.style.overflow = "hidden"; // Prevent background scrolling
      } else {
        document.body.style.overflow = "auto"; // Restore scrolling
      }
    }, [visible, loginvisible]);
    return (
      <>
        <div
          className={`overflow-x-hidden ${
            loginvisible || visible ? "max-h-screen overflow-hidden" : ""
          }`}
        >
          <Routes>
            <Route path="/" element={<Heder />}>
              <Route path="/" element={<Hero />}></Route>
              <Route
                path="/RestorntManu/:id"
                element={<RestorntManu />}
              ></Route>
              <Route path="/search" element={<Search />}></Route>
              <Route path="/Cart" element={<Cart />}></Route>
              <Route path="/Corporate" element={<Corporate />}></Route>

              {/* <Route path="/signin" element={<Signin />}></Route> */}
            </Route>
          </Routes>
        </div>
      </>
    );
  }

  export default App;
