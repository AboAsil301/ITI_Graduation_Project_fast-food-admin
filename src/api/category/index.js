// import { Axios, AxiosMockCreate } from "../../mocks";
// import categoryData from "../../mocks/category/category.json";

// AxiosMockCreate.onGet("/category").reply(() => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve([200, { category: categoryData }]);
//     }, 2000);
//   });
// });

// AxiosMockCreate.onPost("/category").reply((config) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve([201, { message: "Created", result: JSON.parse(config.data) }]);
//     }, 2000);
//   });
// });

// AxiosMockCreate.onDelete(/\/category\/\d+/).reply(() => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve([200, { message: "Success" }]);
//     }, 2000);
//   });
// });

// export const categoryAPI = Axios.get("/category");
// export const categoryDeleteAPI = (id) => Axios.delete(`/category/${id}`);
// export const categoryCreateAPI = (item) => Axios.post(`/category`, item);




// api/category.js
const BASE_URL = 'http://127.0.0.1:8000/resturant/category/';

export const categoryAPI = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    throw new Error(error.message);
  }
};

export const categoryDeleteAPI = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}delete/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete category');
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    throw new Error(error.message);
  }
};

export const categoryCreateAPI = async (cateName) => {
  try {
    const response = await fetch(`${BASE_URL}/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: cateName }),
    });
    if (!response.ok) {
      throw new Error('Failed to create category');
    }
    const data = await response.json();
    return data.result;
  } catch (error) {
    throw new Error(error.message);
  }
};
