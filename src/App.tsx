import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import { ToastContainer } from "react-toastify";
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";
import MyCards from "./components/MyCards";
import Cards from "./components/Cards";
import Profile from "./components/Profile";
import PageNotFound from "./components/PageNotFound";
import FavoritesCards from "./components/FavoriteCards";
import Footer from "./components/Footer";
import ContactUs from "./components/ContactUs";
import SignIn from "./components/SignIn";
import { createContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

export let UserData = createContext<any>({});

export function App() {
  let [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(
    JSON.parse(sessionStorage.getItem("userData") as string) == null
      ? false
      : JSON.parse(sessionStorage.getItem("userData") as string).isLoggedIn
  );
  let [userId, setUserId] = useState<string>("");
  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("userData") as string) == null)
      setUserId("");
    else {
      let payload: { _id: string } = jwtDecode(
        JSON.parse(sessionStorage.getItem("userData") as string).token
      );
      setUserId(payload._id);
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <Router>
        <UserData.Provider
          value={{ isLoggedIn, setIsLoggedIn, userId, setUserId }}
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/favoriteCards" element={<FavoritesCards />}></Route>
            <Route path="/cards" element={<Cards />}></Route>
            <Route path="/myCards" element={<MyCards />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/contactUs" element={<ContactUs />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
          <Footer />
        </UserData.Provider>
      </Router>
    </>
  );
}

export default App;
