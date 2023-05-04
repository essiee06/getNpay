import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";

// const initialState = {
//   productData: [],
//   userInfo: null,
// };
export const addProductToFirestore = createAsyncThunk(
  "products/addProductToFirestore",
  async (product) => {
    const addProductRef = await addDoc(collection(db, "Products"), product);
    const newProduct = { id: addProductRef.id, product };
    return newProduct;
  }
);

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const querySnapshot = await getDocs(collection(db, "Products"));
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      product: doc.data(),
    }));
    return products;
  }
);

//Delete Product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    const products = await getDocs(collection(db, "Products"));
    for (var snap of products.docs) {
      if (snap.id === id) {
        await deleteDoc(doc(db, "Products", snap.id));
      }
    }
    return id;
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProducts",
  async (editedProduct) => {
    const products = await getDocs(collection(db, "Products"));
    for (var snap of products.docs) {
      if (snap.id === editedProduct.id) {
        const productRef = doc(db, "Products", snap.id);
        await updateDoc(productRef, editedProduct.getNpay);
      }
    }
    return editedProduct;
  }
);

// Redux action to add image data to the store
export const addImageData = (imageData) => {
  return {
    type: "ADD_IMAGE_DATA",
    payload: imageData,
  };
};

export const getNplaySlice = createSlice({
  name: "getNpay",
  initialState: {
    productsArray: [],
    images: [],
  },

  reducers: {
    addToCart: (state, action) => {
      const item = state.productData.find(
        (item) => item._id === action.payload._id
      );

      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.productData.push(action.payload);
      }
    },
    deleteItem: (state, action) => {
      state.productData = state.productData.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.productData = [];
    },
    increamentQuantity: (state, action) => {
      const item = state.productData.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.productData.find(
        (item) => item._id === action.payload._id
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    // =============== User Start here ==============
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUser: (state) => {
      state.userInfo = null;
    },
    // =============== User End here ================

    //upload image  in firestore//
    addImage: (state, action) => {
      state.images.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductToFirestore.fulfilled, (state, action) => {
        state.productsArray.push(action.payload);
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productsArray = action.payload;
      })
      .addCase("ADD_IMAGE_DATA", (state, action) => {
        state.images.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.productsArray = state.productsArray.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const { id, product } = action.payload;
        const productIndex = state.productsArray.findIndex(
          (product) => product.id === id
        );
        if (productIndex !== -1) {
          state.productsArray[productIndex] = { id: id, product };
        }
      });
  },
});

export const {
  addToCart,
  deleteItem,
  resetCart,
  increamentQuantity,
  decrementQuantity,
  addUser,
  removeUser,
  addImage,
} = getNplaySlice.actions;
export default getNplaySlice.reducer;
