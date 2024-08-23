import React from "react";
import Product1 from "../../public/images/image-product-1-thumbnail.jpg";
import Image from "next/image";
import "../../styles/cartItem.css";
import { useDispatch, useSelector } from "react-redux";

const CartItem = () => {
  const dispatch = useDispatch();
  const { CartItems, totalAmount } = useSelector((state) => state.product);
  // console.log(CartItems.length);

  return (
    <div className="cart-item">
      <h1>Cart</h1>
      <div className="underline"></div>
      {/* {cartI} */}
      <div className="cart-item-details">
        <div className="cart-image">
          <Image src={Product1} alt="product1" className="small-product1" />
        </div>
        <div className="cart-inner">
          <h3>fall limited edition sneakers</h3>
          <h2>
            $125.00 x 3 <span className="price-span">$375.00</span>
          </h2>
        </div>
      </div>
      <button className="btn-checkout">Checkout</button>
    </div>
  );
};

export default CartItem;
