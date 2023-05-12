import axios from 'axios';
import baseUrl from '../config/baseUrl';

const getUserInformations = async (accessToken) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };
  const { data } = await axios.get(
    `${baseUrl}/account/user-profile`,
    {
      headers,
    },
  );

  return { ...data.user, todaysFeeling: data.todaysFeeling };
};

const storeMetaData = async (accessToken, payload) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  const {
    data: { userMetaData },
  } = await axios.post(`${baseUrl}/account/meta-data`, payload, {
    headers,
  });

  return { ...userMetaData };
};

const getChallangeData = async (accessToken, type) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  const {
    data: { userMetaData },
  } = await axios.get(
    `${baseUrl}/account/meta-data?limit=1&type=${type}`,
    { headers },
  );

  if (userMetaData.length === 1) return userMetaData[0];

  return null;
};

const getMetaData = async (accessToken, type) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  const {
    data: { userMetaData },
  } = await axios.get(
    `${baseUrl}/account/meta-data?type=${type}&limit=1`,
    { headers },
  );

  if (userMetaData.length === 1) return userMetaData[0];
  return null;
};

export {
  getUserInformations,
  storeMetaData,
  getMetaData,
  getChallangeData,
};
