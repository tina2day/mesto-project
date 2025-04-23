const config = {
  baseUrl: 'https://nomoreparties.co/v1/apf-cohort-202',
  authorization: 'c597d92d-5898-4bf5-baee-08b5177a1d55',
  contentType: 'application/json'
}

function checkImageUrl(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(true);
    img.onerror = () => reject(new Error('Картинка не загрузилась'));
  });
}

function getUserInformation() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: {
          authorization: config.authorization
        }
      })
        .then(res => {
          if(!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`)
          }
          return res.json();
        }).then(res => {return res;}).catch(err => console.log(err)); 
}

function getCardsInformation() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: {
          authorization: config.authorization
        }
      })
        .then(res => {
          if(!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
          }
          return res.json();
        }).catch(err => console.log(err));
}

function saveUserInformation(name, description) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: config.authorization,
          'Content-Type': config.contentType
        },
        body: JSON.stringify({
          name: `${name}`,
          about: `${description}`
        })
    }).then(res => {
      if(!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
      })
      .then((result) => {
        console.log(result);
      });
}

function postNewCard(name, link) {
  return checkImageUrl(link)
    .then(() => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'Post',
        headers: {
            authorization: config.authorization,
            'Content-Type': config.contentType
        },
        body: JSON.stringify({
            name: `${name}`,
            link: `${link}`
        })
    }).then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })});
}

function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
          authorization: config.authorization,
      }
  }).then(res => {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((result) => {
    return result;
  }).catch(err => console.log(err));
}

function putLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
        authorization: config.authorization,
    }
}).then(res => {
  if(res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
})
.then((result) => {
  return result;
}).catch(err => console.log(err));
}

function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
        authorization: config.authorization,
    }
}).then(res => {
  if(res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
})
.then((result) => {
  return result;
}).catch(err => console.log(err));
}

function updateAvatar(urlAvatar) {
  return checkImageUrl(urlAvatar)
    .then(() => {
      return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: config.authorization,
          'Content-Type': config.contentType
        },
        body: JSON.stringify({
          avatar: urlAvatar
        })
      });
    })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    });
}
export{
  getCardsInformation, 
  postNewCard, 
  getUserInformation, 
  deleteCard, 
  putLike, 
  deleteLike, 
  updateAvatar, 
  checkImageUrl,
  saveUserInformation};
