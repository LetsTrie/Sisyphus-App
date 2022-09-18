import axios from 'axios';
import baseUrl from '../config/baseUrl';

const loginWithGoogle = async (token, loginAction) => {
  const { data: userInfo } = await axios.get(
    'https://www.googleapis.com/userinfo/v2/me',
    { headers: { Authorization: `Bearer ${token}` } },
  );
  const payload = {
    googleAuthId: userInfo.id,
    email: userInfo.email,
    googleFirstName: userInfo.given_name,
    googleLastName: userInfo.family_name,
    googleName: userInfo.name,
    googleProfileImage: userInfo.picture,
  };
  const { data } = await axios.post(
    `${baseUrl}/accounts/google-login`,
    payload,
  );

  await loginAction({
    isAccountVerified: data.isAccountVerified,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    name: 'Sakib',
    photoUrl: '123',
  });

  return { success: true };
};

export { loginWithGoogle };
