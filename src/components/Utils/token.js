let tokenValue = '';
const token = () => {
   ;
  const UserToken = localStorage.userToken;

  if (UserToken) {
    tokenValue = UserToken;
  } else {
    const SystemToken = localStorage.systemToken;
    tokenValue = SystemToken;
  }
};
export default tokenValue;
