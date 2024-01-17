// const config = {
//   baseUrl: 'https://nomoreparties.co/v1/wff-cohort-4',
//   headers: {
//     authorization: '14f77105-3b2d-422f-94c2-318e8127f8a3',
//     'Content-Type': 'application/json',
//   },
// };

export const getInitialCards = async (config) => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((resolve) => {
      if (resolve.ok) return resolve.json();
      return Promise.reject(`Error: ${resolve.status}`);
    })
    .catch((error) => console.error(error));
};

export const pushAccountCredentials = async (config, name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then((resolve) => {
      if (resolve.ok) return resolve.json();
      return Promise.reject(`Error: ${resolve.status}`);
    })
    .catch((error) => console.error(error));
};

export const getAccountCredentials = async (config) => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((resolve) => {
      if (resolve.ok) return resolve.json();
      return Promise.reject(`Error: ${resolve.status}`);
    })
    .catch((error) => console.error(error));
};

export const pushNewPlace = async (config, name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then((resolve) => {
      if (resolve.ok) return resolve.json();
      return Promise.reject(`Error: ${resolve.status}`);
    })
    .catch((error) => console.error(error));
};

export const removePlace = async (config, id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then((resolve) => {
      if (resolve.ok) return resolve.json();
      return Promise.reject(`Error: ${resolve.status}`);
    })
    .catch((error) => console.error(error));
};

export const likePlace = async (config, id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then((resolve) => {
      if (resolve.ok) return resolve.json();
      return Promise.reject(`Error: ${resolve.status}`);
    })
    .catch((error) => console.error(error));
};

export const unlikePlace = async (config, id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then((resolve) => {
      if (resolve.ok) return resolve.json();
      return Promise.reject(`Error: ${resolve.status}`);
    })
    .catch((error) => console.error(error));
};

export const pushProfilePicture = (config, link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  })
    .then((resolve) => {
      if (resolve.ok) return resolve.json();
      return Promise.reject(`Error: ${resolve.status}`);
    })
    .catch((error) => console.error(error));
};
