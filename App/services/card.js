import axios from 'axios';
import baseUrl from '../config/baseUrl';

const createCard = async (accessToken, body) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };
  const data = await axios.post(`${baseUrl}/card`, body, { headers });
  return data?.response?.card;
};

const getCardList = async (accessToken) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };
  const { data } = await axios.get(`${baseUrl}/card`, { headers });
  return data?.cards;
};

const deleteCard = async (accessToken, cardId) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };
  const data = await axios.delete(`${baseUrl}/card/${cardId}`, {
    headers,
  });
  return data;
};

export { getCardList, createCard, deleteCard };
