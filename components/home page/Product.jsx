"use client";

import React, { useEffect, useState } from "react";
// import Product1 from "../../public/images/image-product-1.jpg";
// import product1 from "../../public/images/image-product-1-thumbnail.jpg";
// import product2 from "../../public/images/image-product-2-thumbnail.jpg";
// import product3 from "../../public/images/image-product-3-thumbnail.jpg";
// import product4 from "../../public/images/image-product-4-thumbnail.jpg";
import Image from "next/image";
import Previous from "../../public/images/icon-previous.svg";
import Next from "../../public/images/icon-next.svg";
import Plus from "../../public/images/icon-plus.svg";
import Minus from "../../public/images/icon-minus.svg";
import Cart from "../../public/images/icon-cart.svg";
import Close from "../../public/images/icon-close.svg";
import "../../styles/product.css";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "@/features/productSlice";
import { cartActions } from "@/features/cartSlice";
import { images } from "@/features/images";
import ImageModal from "./ImageModal";

const Product = ({ productId = 1 }) => {
  const dispatch = useDispatch();
  const { selectedImageUrl, selectedQuantity, products, isImageModalOpen } =
    useSelector((state) => state.product);
  const increment = () => {
    dispatch(productActions.setSelectedQuantity(selectedQuantity + 1));
  };
  const decrement = () => {
    dispatch(
      productActions.setSelectedQuantity(Math.max(selectedQuantity - 1, 1))
    );
  };
  useEffect(() => {
    dispatch(productActions.applyDiscount({ productId, discount: 50 }));
  }, [dispatch, productId]);

  const product = products.find((p) => p.id === productId);

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        productActions.addToCart({
          productId: product.id,
          quantity: selectedQuantity,
        })
      );
    }
  };

  const handleImageClick = (imageUrl) => {
    dispatch(productActions.setSelectedImageUrl(imageUrl));
    dispatch(productActions.setIsImageModalOpen(true));
  };

  const handleCloseModal = () => {
    dispatch(productActions.setIsImageModalOpen(false));
  };

  if (!product) {
    return <div>No product found</div>;
  }

  return (
    <div className="product">
      <div className="product-image">
        <Image
          src={product.images[0]}
          alt="productImage1"
          className="product1"
          width={445}
          height={445}
        />
        <div className="control previous">
          <Image src={Previous} alt="previous" className="previous" />
        </div>
        <div className="control next">
          <Image src={Next} alt="next" className="next" />
        </div>
        <div className="other-images">
          <div className="other-images-inner">
            {product.thumbnailImages.map((thumb, index) => (
              <Image
                key={index}
                src={thumb}
                alt={`product${index + 1}`}
                className="smaller-products"
                width={88}
                height={88}
                onClick={() => handleImageClick(product.images[index])}
              />
            ))}
            {/* <Image
              src={product1}
              alt="product1"
              className="smaller-products"
              onClick={() => handleImageClick(product1)}
            />
            <Image
              src={product2}
              alt="product2"
              className="smaller-products"
              onClick={() => handleImageClick(product2)}
            />
            <Image
              src={product3}
              alt="product3"
              className="smaller-products"
              onClick={() => handleImageClick(product3)}
            />
            <Image
              src={product4}
              alt="product4"
              className="smaller-products"
              onClick={() => handleImageClick(product4)}
            /> */}
          </div>
        </div>
      </div>

      {isImageModalOpen && (
        <ImageModal />
        // <div className="image-modal">
        //   <Image
        //     src={Close}
        //     className="close-modal"
        //     onClick={handleCloseModal}
        //   />
        //   <Image src={selectedImageUrl} alt="Selected Product" />
        //   {/* <div className="smaller-products-modal">
        //     {images.map((image) => (
        //       <Image src={image.name} alt="product" width={50} height={50} />
        //     ))}
        //   </div> */}
        // </div>
      )}

      <div className="wrapper">
        <div className="product-details">
          <h3>sneaker company</h3>
          <h2>{product.name}</h2>
          <p>{product.details}</p>
        </div>

        <div className="product-price">
          <div className="product-inner-price">
            <h2>${product.finalPrice?.toFixed(2)}</h2>
            <div className="price-percentage">
              <h1>{product.discount}%</h1>
            </div>
          </div>
          <h3>${product.price.toFixed(2)}</h3>
        </div>

        <div className="add-product">
          <div className="product-amount">
            <Image src={Minus} alt="minus" onClick={decrement} />
            <span>{selectedQuantity}</span>
            <Image src={Plus} alt="plus" onClick={increment} />
          </div>

          <button className="btn" onClick={handleAddToCart}>
            <Image className="cart-add" src={Cart} alt="cart" />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
