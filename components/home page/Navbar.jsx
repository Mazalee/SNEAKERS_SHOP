"use client";

import React from "react";
import NavLeft from "./NavLeft";
import Image from "next/image";
import Cart from "../../public/images/icon-cart.svg";
import Avatar from "../../public/images/image-avatar.png";
import { useDispatch } from "react-redux";
import { cartActions } from "@/features/cartSlice";
import CartItem from "./CartItem";

const Navbar = () => {
  const dispatch = useDispatch();
  const openCart = () => {
    dispatch(cartActions.openCartModal());
  };
  return (
    <div className="wrapper">
      <div className="nav-div">
        <NavLeft />
        <div className="nav-right">
          <div className="cart-icon-container" onClick={openCart}>
            <Image className="cart" src={Cart} alt="cart" />
            {openCart && <CartItem />}
          </div>
          <Image className="avatar" src={Avatar} alt="avatar" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
