import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "./../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="navbar-wrapper">
      <div className="navbar">
        <div className="user">
          <img src={currentUser.photoURL} alt="" />
          <span>{currentUser.displayName}</span>
        </div>
        <button onClick={() => signOut(auth)}>logout</button>
      </div>
      <h2 className="h2">Messages</h2>
    </div>
  );
};

export default Navbar;
