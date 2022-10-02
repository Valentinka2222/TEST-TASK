import { saveToken } from './api';

const baseUrl = 'https://frontend-test-assignment-api.abz.agency/api/v1';

export const getUsers = () => {
  return fetch(`${baseUrl}/users`).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error('Proccess server errors.');
    }
  });
};
export const getUsersByPage = newUrl =>
  fetch(`${newUrl}`).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error('Page not found');
    }
  });

export const getUsersById = async id => {
  return fetch(`${baseUrl}/users/${id}`)
    .then(res => res.json())
    .then(function (data) {
      console.log(data);
      if (data.success) {
        alert('process success response');
      } else {
        alert('proccess server errors');
      }
    });
};
getUsers().then(res => {
  console.log(res);
});
export const сreateUserPositions = async () => {
  return fetch(`${baseUrl}/positions`).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error('Page not found');
    }
  });
};
export const getToken = () =>
  fetch(`${baseUrl}/token`)
    .then(function (response) {
      return response.json();
    })
    .catch(function (error) {
      alert(error);
    });

export const сreateUser = (formData, token) => {
  return fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data,boundary="boundary",application/json',
      Token: token,
    },

    body: JSON.stringify(formData),
  })
    .then(function (response) {
      saveToken(token);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.success) {
        alert('process success response');
      } else {
        alert('proccess server errors');
      }
    })
    .catch(function (er) {
      console.error(er);
    });
};
