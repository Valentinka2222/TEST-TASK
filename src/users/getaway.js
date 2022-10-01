import { saveToken } from './api';

const baseUrl = 'https://frontend-test-assignment-api.abz.agency/api/v1';

export const getUsers = async () => {
  return fetch(`${baseUrl}/users`).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error('Proccess server errors.');
    }
  });
};
export const getUsersByPage = newUrl => {
  const error = new Error('Page not found');
  return fetch(newUrl).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw error;
    }
  });
};

export const getUsersById = id => {
  return fetch(`${baseUrl}/users/${id}`)
    .then(res => {
      return res.json();
    })
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
export const сreateUserPositions = () => {
  return fetch(`${baseUrl}/positions`).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error('Page not found');
    }
  });
};
export function getToken() {
  return fetch(`${baseUrl}/token`)
    .then(function (response) {
      return response.json();
    })
    .catch(function (error) {
      alert(error);
    });
}

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
