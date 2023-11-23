// import { Axios, AxiosMockCreate } from "../../mocks";
// import offersData from "../../mocks/offers/offers.json";

// AxiosMockCreate.onGet("/offers").reply(() => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve([200, { offers: offersData }]);
//     }, 2000);
//   });
// });

// AxiosMockCreate.onPost("/offers").reply((config) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve([201, { message: "Created", result: JSON.parse(config.data) }]);
//     }, 2000);
//   });
// });

// AxiosMockCreate.onDelete(/\/offers\/\d+/).reply(() => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve([200, { message: "Success" }]);
//     }, 2000);
//   });
// });

// export const offersAPI = Axios.get("/offers");
// export const offersDeleteAPI = (id) => Axios.delete(`/offers/${id}`);
// export const offersCreateAPI = (item) => Axios.post(`/offers`, item);


// api/offers.js
const BASE_URL = 'http://127.0.0.1:8000/resturant/offer/';

export const offersAPI = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch offers');
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    throw new Error(error.message);
  }
};

export const offersDeleteAPI = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}delete/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete offer');
    }

  } catch (error) {
    throw new Error(error.message);
  }
};

export const offersCreateAPI = async (item) => {
  try {
    const formData = new FormData();
    formData.append('image', item.image);
    formData.append('start_date', item.startDate);
    formData.append('end_date', item.endDate);
    const response = await fetch(`${BASE_URL}add`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to create offer');
    }

  } catch (error) {
    throw new Error(error.message);
  }
};


// export const offersCreateAPI = async (newOfferData) => {
//   try {
//     const response = await offersCreateAPI(newOfferData);
//     // Assuming the API returns the newly created offer
//     const newOffer = await response.json();

//     // Update the Redux state with the new offer
//     dispatch(setOffers([...state.offersSlice.data, newOffer]));
    
//     toast.success("Offer added successfully!", {
//       autoClose: 2000,
//       pauseOnHover: true,
//     });
//   } catch (error) {
//     console.error("Error adding offer:", error);
//     toast.error("Failed to add offer");
//   }
// };




