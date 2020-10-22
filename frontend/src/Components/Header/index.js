import React, { useEffect, useState } from "react";
import "./header.css";

import { Link } from "react-router-dom";
import { useStateValue } from "../../Redux/StateProvider";


function Header({ items }) {
  const [{ user },dispatch] = useStateValue();
  var [displayname, setDisplayame] = useState("");

  const signOut=()=>{
    dispatch({
        type: "SET_TOKEN",
        item: null,
      });
  }

  const Signin = () => {
    if (user) {
    signOut();
    }
  };

  useEffect(() => {
    setDisplayame(user?.username);
  }, [user]);

 

  console.log(user);
  return (
    <nav className="header">
      <Link to="/">
        <img
          className="header_logo"
          src="https://149448277.v2.pressablecdn.com/wp-content/uploads/2019/12/small_logo.png"
          alt=""
        />
      </Link>

      <div className="header_nav">
        <Link to={!user && "/login"} className="header_link">
          <div onClick={Signin} className="header_option">
            <div className="header_optionLineOne">
              Hello {user?.username}
            </div>
            <div className="header_optionLineTwo">
              {user ? "Sign out" : "Sign in"}
            </div>
          </div>
        </Link>

        <Link to="/" className="header_link">
          <div className="header_optionBasket">     
          Profile
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
