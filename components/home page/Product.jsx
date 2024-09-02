"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Previous from "../../public/images/icon-previous.svg";
import Next from "../../public/images/icon-next.svg";
import Plus from "../../public/images/icon-plus.svg";
import Minus from "../../public/images/icon-minus.svg";
import Cart from "../../public/images/icon-cart.svg";
import "../../styles/product.css";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "@/features/productSlice";
import ImageModal from "./ImageModal";

const Product = ({ productId = 1 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const { selectedImageUrl, selectedQuantity, products, isImageModalOpen } =
    useSelector((state) => state.product);

  const product = products.find((p) => p.id === productId);

  useEffect(() => {
    dispatch(productActions.setSelectedProductId(productId));
    dispatch(productActions.applyDiscount({ productId, discount: 50 }));
    if (!selectedImageUrl && product) {
      dispatch(productActions.setSelectedImageUrl(product.images[0]));
    }
  }, [dispatch, productId, selectedImageUrl, product]);

  const increment = () => {
    dispatch(productActions.setSelectedQuantity(selectedQuantity + 1));
  };
  const decrement = () => {
    dispatch(
      productActions.setSelectedQuantity(Math.max(selectedQuantity - 1, 1))
    );
  };

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

  const handleNextImage = () => {
    dispatch(productActions.nextImage());
  };

  const handlePreviousImage = () => {
    dispatch(productActions.previousImage());
  };

  if (!product) {
    return <div>No product found</div>;
  }

  return (
    <div className="product">
      <div className="product-image">
        <Image
          src={selectedImageUrl || product.images[0]}
          alt="productImage1"
          className="product1"
          width={445}
          height={445}
        />
        <div className="control previous">
          <Image
            src={Previous}
            alt="previous"
            className="previous"
            onClick={handlePreviousImage}
          />
        </div>
        <div className="control next">
          <Image
            src={Next}
            alt="next"
            className="next"
            onClick={handleNextImage}
          />
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
          </div>
        </div>
      </div>

      {isImageModalOpen && <ImageModal />}

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
