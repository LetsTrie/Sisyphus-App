import axios from 'axios';
import baseUrl from '../config/baseUrl';

const submitScale = async (payload, accessToken) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };
  const { data } = await axios.post(`${baseUrl}/scales`, payload, {
    headers,
  });
};

const latestScaleUpdate = async (accessToken) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };
  const { data } = await axios.get(
    `${baseUrl}/scales/latest-result`,
    { headers },
  );

  return data.progress;
};

export { submitScale, latestScaleUpdate };
