"use client";

import React, { useEffect, useRef } from "react";
import NavLeft from "./NavLeft";
import Image from "next/image";
import Cart from "../../public/images/icon-cart.svg";
import Avatar from "../../public/images/image-avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "@/features/cartSlice";
import CartItem from "./CartItem";

const Navbar = () => {
  const dispatch = useDispatch();
  const openCart = () => {
    dispatch(cartActions.toggleCartModal());
  };
  const { isCartModalOpen } = useSelector((state) => state.cart);
  const { totalQuantity } = useSelector((state) => state.product);
  const cartRef = useRef();

  const handleClickOutside = (e) => {
    console.log("handleClickOutside is triggered");
    if (cartRef.current && !cartRef.current.contains(e.target)) {
      dispatch(cartActions.closeCartModal());
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="wrapper">
      <div className="nav-div">
        <NavLeft />
        <div className="nav-right">
          <div className="cart-icon-container" onClick={openCart} ref={cartRef}>
            <Image className="cart" src={Cart} alt="cart" />
            {totalQuantity > 0 && (
              <span className="cart-item-count">{totalQuantity}</span>
            )}
            {isCartModalOpen && <CartItem />}
          </div>
          <Image className="avatar" src={Avatar} alt="avatar" />
        </div>
      </div>
      <div className="desktop-underline"></div>
    </div>
  );
};

export default Navbar;
