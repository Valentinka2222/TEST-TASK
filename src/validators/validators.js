export const validateEmail = email => {
  return String(email)
    .toLowerCase()
    .match(
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
    );
};

export function validatePhoneNumber(tel) {
  const re = /^[\+]{0,1}380([0-9]{9})$/;
  return re.test(tel);
}
export function validateName(name) {
  const re = /^[a-zA-Z].{2,60}$/;
  return re.test(name);
}
export function validatePositionId(num) {
  if (!Number.isInteger(num) && num < 1) {
    return false;
  }
  return num;
}
