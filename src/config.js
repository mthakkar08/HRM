//const apiUrl = process.env.REACT_APP_API_URL;
 const apiUrl = "https://192.168.1.40:8443/rest";
//  const apiUrl = "https://ec2-3-90-163-129.compute-1.amazonaws.com/rest";
const kenshoUrl = process.env.REACT_APP_KENSHO_URL;
const kenshoRefreshUrl = process.env.REACT_APP_KENSHO_REFRESH_URL;
const kenshoRefreshToken = process.env.REACT_APP_KENSHO_REFRESH_TOKEN;

export { apiUrl, kenshoUrl, kenshoRefreshUrl, kenshoRefreshToken };