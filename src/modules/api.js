export function saveToken(token) {
  localStorage.setItem('tokenData', JSON.stringify(token));
  return token;
}
