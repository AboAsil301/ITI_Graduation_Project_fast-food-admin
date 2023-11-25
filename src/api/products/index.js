// import { Axios, AxiosMockCreate } from "../../mocks";
// import productsData from "../../mocks/products/products.json";

// AxiosMockCreate.onGet("/products").reply(() => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve([200, { products: productsData }]);
//     }, 2000);
//   });
// });

// AxiosMockCreate.onPost("/products").reply((config) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve([201, { message: "Created", result: JSON.parse(config.data) }]);
//     }, 2000);
//   });
// });

// AxiosMockCreate.onDelete(/\/products\/\d+/).reply(() => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve([200, { message: "Success" }]);
//     }, 2000);
//   });
// });

// export const productsAPI = Axios.get("/products");
// export const productsDeleteAPI = (id) => Axios.delete(`/products/${id}`);
// export const productsCreateAPI = (item) => Axios.post(`/products`, item);

// api/products.js
const BASE_URL = "http://127.0.0.1:8000/resturant/products/";

export const productsAPI = async (pageNumber = 1) => {
  try {
    const response = await fetch(`${BASE_URL}?page=${pageNumber}`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const productsDeleteAPI = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}delete/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const productsCreateAPI = async (item) => {
  try {
    const formData = new FormData();
    formData.append("image", item.image);
    formData.append("name", item.name);
    formData.append("description", item.description);
    formData.append("price", item.price);
    formData.append("category", item.category);
    // formData.append("is_deleted","false");
    const response = await fetch(`${BASE_URL}new`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to create product");
    }
    const data = await response.json();
    return data.result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const productsUpdateAPI = async (id, item) => {
  try {
    const formData = new FormData();
    formData.append("image", item.image);
    formData.append("name", item.name);
    formData.append("description", item.description);
    formData.append("price", item.price);
    formData.append("category", item.category);
    const response = await fetch(`${BASE_URL}update/${id}`, {
      method: "PUT",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to update product");
    }
    const data = await response.json();
    return data.result;
  } catch (error) {
    throw new Error(error.message);
  }
};
