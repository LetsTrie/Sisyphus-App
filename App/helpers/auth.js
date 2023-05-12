const navigateAfterLogin = (
  navigation,
  isAuthenticated,
  isAccountVerified,
) => {
  if (!isAuthenticated) return false;
  if (isAccountVerified) navigation.navigate('Homepage');
  else navigation.navigate('DemographicInformation');
  return true;
};

export { navigateAfterLogin };
