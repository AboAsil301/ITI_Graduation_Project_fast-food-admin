
// api/messages.js
const BASE_URL = 'http://127.0.0.1:8000/api/accounts/contact_us/';

export const messagesAPI = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch messages');
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    throw new Error(error.message);
  }
};

export const messagesDeleteAPI = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}${id}/delete/`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete message');
    }

  } catch (error) {
    throw new Error(error.message);
  }
};

