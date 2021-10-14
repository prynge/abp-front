export default function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { 'Authorization': 'Bearer '+user.token, "Access-Control-Allow-Origin":"*" };
  } else {
    return {"Access-Control-Allow-Origin":"*", "Content-type": "application/json"};
  }
}