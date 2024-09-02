import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProductId: null,
  selectedQuantity: 1,
  selectedImageUrl: null,
  isImageModalOpen: false,
  products: [
    {
      id: 1,
      name: "fall limited edition sneakers",
      details:
        "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.",
      price: 250,
      discount: 50,
      finalPrice: null,
      images: [
        "/images/image-product-1.jpg",
        "/images/image-product-2.jpg",
        "/images/image-product-3.jpg",
        "/images/image-product-4.jpg",
      ],
      thumbnailImages: [
        "/images/image-product-1-thumbnail.jpg",
        "/images/image-product-2-thumbnail.jpg",
        "/images/image-product-3-thumbnail.jpg",
        "/images/image-product-4-thumbnail.jpg",
      ],
    },
  ],
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectedProductId(state, action) {
      state.selectedProductId = action.payload;
    },
    setSelectedQuantity(state, action) {
      state.selectedQuantity = action.payload;
    },
    resetSelectedProduct(state) {
      state.selectedProductId = null;
      state.selectedQuantity = 1;
    },
    updateProductList(state, action) {
      state.products = action.payload;
    },
    applyDiscount(state, action) {
      const { productId, discount } = action.payload;
      const product = state.products.find(
        (product) => product.id === productId
      );
      if (product) {
        product.discount = discount;
        product.finalPrice = product.price * (1 - discount / 100);
      }
    },
    addToCart(state, action) {
      const { productId, quantity } = action.payload;
      const product = state.products.find(
        (product) => product.id === productId
      );

      if (!product) return;

      const existingItem = state.cartItems.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({
          productId,
          name: product.name,
          finalPrice: product.finalPrice,
          quantity,
          thumbnailImage: product.thumbnailImages[productId],
        });
      }

      state.totalQuantity += quantity;
      state.totalAmount += product.finalPrice * quantity;
    },
    setSelectedImageUrl(state, action) {
      state.selectedImageUrl = action.payload;
    },
    setIsImageModalOpen(state, action) {
      state.isImageModalOpen = action.payload;
    },
    nextImage(state) {
      const selectedProduct = state.products.find(
        (product) => (product.id = state.selectedProductId)
      );

      if (selectedProduct) {
        const currentIndex = selectedProduct.images.indexOf(
          state.selectedImageUrl
        );
        const nextIndex = (currentIndex + 1) % selectedProduct.images.length;
        state.selectedImageUrl = selectedProduct.images[nextIndex];
      }
    },
    previousImage(state) {
      const selectedProduct = state.products.find(
        (product) => (product.id = state.selectedProductId)
      );

      if (selectedProduct) {
        const currentIndex = selectedProduct.images.indexOf(
          state.selectedImageUrl
        );
        const previousIndex =
          (currentIndex - 1 + selectedProduct.images.length) %
          selectedProduct.images.length;
        state.selectedImageUrl = selectedProduct.images[previousIndex];
      }
    },
  },
});

export const productActions = productSlice.actions;
