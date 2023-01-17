import axios from 'axios';
import baseUrl from '../config/baseUrl';
import logger from '../config/logger';

const loginWithGoogle = async (token, loginAction) => {
  const { data: userInfo } = await axios.get(
    'https://www.googleapis.com/userinfo/v2/me',
    { headers: { Authorization: `Bearer ${token}` } },
  );
  
  const payload = {
    googleAuthId: userInfo.id,
    email: userInfo.email,
    firstName: userInfo.given_name,
    lastName: userInfo.family_name,
    username: userInfo.name,
    profileImage: userInfo.picture,
  };

  logger.info(`${baseUrl}/account/login-with-google`)
  const { data } = await axios.post(
    `${baseUrl}/account/login-with-google`,
    payload,
  );

  await loginAction({
    isAccountVerified: data.isAccountVerified,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    name: userInfo.name,
    photoUrl: userInfo.picture,
  });

  return { success: true };
};

export { loginWithGoogle };
