import axios from 'axios';
import baseUrl from '../config/baseUrl';

const getUserInformations = async (accessToken) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };
  const { data } = await axios.get(`${baseUrl}/account/user-profile`, {
    headers,
  });

  return { ...data.user, todaysFeeling: data.todaysFeeling };
};

export { getUserInformations };
