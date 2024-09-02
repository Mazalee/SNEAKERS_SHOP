import { productActions } from "@/features/productSlice";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/ImageModal.css";
import Close from "../../public/images/icon-close.svg";
import Previous from "../../public/images/icon-previous.svg";
import Next from "../../public/images/icon-next.svg";
import Image from "next/image";

const ImageModal = ({ productId = 1 }) => {
  const dispatch = useDispatch();
  const { selectedImageUrl, products } = useSelector((state) => state.product);

  const product = products.find((p) => p.id === productId);

  const imageModalRef = useRef();

  const handleClickOutside = (e) => {
    console.log("handleClickOutside triggered");
    if (imageModalRef.current && !imageModalRef.current.contains(e.target)) {
      dispatch(productActions.setIsImageModalOpen(false));
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!selectedImageUrl && product) {
      dispatch(productActions.setSelectedImageUrl(product.images[0]));
    }
  }, [dispatch, selectedImageUrl, product]);

  const handleImageClick = (imageUrl) => {
    dispatch(productActions.setSelectedImageUrl(imageUrl));
    dispatch(productActions.setIsImageModalOpen(true));
  };

  const handleCloseModal = () => {
    dispatch(productActions.setIsImageModalOpen(false));
  };

  const handleNextImage = () => {
    dispatch(productActions.nextImage());
  };

  const handlePreviousImage = () => {
    dispatch(productActions.previousImage());
  };

  return (
    <div className="image-modal-overlay">
      <div className="image-modal" ref={imageModalRef}>
        <Image
          src={Close}
          alt="close icon"
          className="close-modal"
          onClick={handleCloseModal}
        />
        <Image
          className="selected-product"
          src={selectedImageUrl}
          alt="Selected Product"
          width={550}
          height={550}
        />
        <div className="inner-control previous" onClick={handlePreviousImage}>
          <Image src={Previous} alt="previous" />
        </div>
        <div className="inner-control next" onClick={handleNextImage}>
          <Image src={Next} alt="next" />
        </div>
        <div className="smaller-images">
          {product.thumbnailImages.map((thumb, index) => (
            <Image
              key={index}
              src={thumb}
              alt={`product${index + 1}`}
              className="modal-products"
              width={550}
              height={88}
              onClick={() => handleImageClick(product.images[index])}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
