import { images } from "@/features/images";
import { productActions } from "@/features/productSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/ImageModal.css";
import Close from "../../public/images/icon-close.svg";
import Previous from "../../public/images/icon-previous.svg";
import Next from "../../public/images/icon-next.svg";
import Image from "next/image";
import product1 from "../../public/images/image-product-1-thumbnail.jpg";
import product2 from "../../public/images/image-product-2-thumbnail.jpg";
import product3 from "../../public/images/image-product-3-thumbnail.jpg";
import product4 from "../../public/images/image-product-4-thumbnail.jpg";

const ImageModal = () => {
  const dispatch = useDispatch();
  const { selectedImageUrl, selectedQuantity, products, isImageModalOpen } =
    useSelector((state) => state.product);

  const handleImageClick = (imageUrl) => {
    dispatch(productActions.setSelectedImageUrl(imageUrl));
    dispatch(productActions.setIsImageModalOpen(true));
  };

  const handleCloseModal = () => {
    dispatch(productActions.setIsImageModalOpen(false));
  };

  return (
    <div className="image-modal">
      <Image src={Close} className="close-modal" onClick={handleCloseModal} />
      <Image
        className="selected-product"
        src={selectedImageUrl}
        alt="Selected Product"
      />
      <div className="inner-control previous">
        <Image src={Previous} alt="previous" />
      </div>
      <div className="inner-control next">
        <Image src={Next} alt="next" />
      </div>
      <div className="smaller-images">
        <Image
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
        />
      </div>
    </div>
  );
};

export default ImageModal;
