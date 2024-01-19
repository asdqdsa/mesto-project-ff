// const config = {
//   baseUrl: 'https://nomoreparties.co/v1/wff-cohort-4',
//   headers: {
//     authorization: '14f77105-3b2d-422f-94c2-318e8127f8a3',
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin': '*',
//   },
// };

// fetch fn
export async function fetchRequest(config, method, path, body) {
  const request = {
    method: method,
    headers: config.headers,
  };
  if (body != null) {
    console.log('not null', body);
    request.body = JSON.stringify(body);
    console.log(request);
  }
  return fetch(`${config.baseUrl}${path}`, request)
    .then((resolve) => {
      if (resolve.ok) return resolve.json();
      return Promise.reject(`Error: ${resolve.status}`);
    })
    .catch((error) => console.error(error));
}

export const getInitialCards = (config) => fetchRequest(config, 'GET', '/cards', null);

export const pushAccountCredentials = (config, name, about) =>
  fetchRequest(config, 'PATCH', '/users/me', { name: name, about: about });

export const getAccountCredentials = (config) =>
  fetchRequest(config, 'GET', '/users/me', null);

export const pushNewPlace = (config, name, link) =>
  fetchRequest(config, 'POST', '/cards', { name: name, link: link });

export const removePlace = (config, id) =>
  fetchRequest(config, 'DELETE', `/cards/${id}`, null);

export const likePlace = (config, id) =>
  fetchRequest(config, 'PUT', `/cards/likes/${id}`, null);

export const unlikePlace = (config, id) =>
  fetchRequest(config, 'DELETE', `/cards/likes/${id}`, null);

export const pushProfilePicture = (config, link) =>
  fetchRequest(config, 'PATCH', '/users/me/avatar', { avatar: link });

export const getLink = async (link, placeHolderLink) => {
  return fetch(link)
    .then((resolve) => {
      if (!resolve.ok) return placeHolderLink;
      return resolve.url;
    })
    .catch(() => placeHolderLink);
};
