import React from "react";
import Product1 from "../../public/images/image-product-1-thumbnail.jpg";
import Image from "next/image";
import "../../styles/cartItem.css";
import { useDispatch, useSelector } from "react-redux";

const CartItem = () => {
  const dispatch = useDispatch();
  const { cartItems, totalAmount, totalQuantity } = useSelector(
    (state) => state.product
  );
  const { isCartModalOpen } = useSelector((state) => state.cart);
  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {isCartModalOpen && <div className="cart-overlay"></div>}
      <div
        className={`cart-item ${isCartModalOpen ? "visible" : ""}`}
        onClick={handleClick}
      >
        <h1>Cart</h1>
        <div className="underline"></div>
        {cartItems.length > 0 ? (
          <div className="cart-content">
            {cartItems.map((item) => (
              <div key={item.productId} className="cart-item-details">
                <div className="cart-content-inner">
                  <div className="cart-image">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={50}
                      height={50}
                      style={{ borderRadius: "5px" }}
                    />
                  </div>
                  <div className="cart-inner">
                    <h3>{item.name}</h3>
                    <h2>
                      ${item.finalPrice.toFixed(2)} x {item.quantity}{" "}
                      <span className="price-span">
                        ${(item.finalPrice * item.quantity).toFixed(2)}
                      </span>
                    </h2>
                  </div>
                </div>
                <button className="btn-checkout">Checkout</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-cart">
            <h2>Your cart is empty.</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default CartItem;
