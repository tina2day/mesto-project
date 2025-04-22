import {cardContainer, createCard} from './index.js';
let userID = '';
function getUserInformation() {
    return fetch('https://nomoreparties.co/v1/apf-cohort-202/users/me', {
        headers: {
          authorization: 'c597d92d-5898-4bf5-baee-08b5177a1d55'
        }
      })
        .then(res => {
          if(!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`)
          }
          return res.json();
        })
        .then((result) => {
          userID = result._id;
          return result;
        }).catch(err => console.log(err)); 
}

function getCardsInformation() {
    return fetch('https://nomoreparties.co/v1/apf-cohort-202/cards', {
        headers: {
          authorization: 'c597d92d-5898-4bf5-baee-08b5177a1d55'
        }
      })
        .then(res => {
          if(!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
          }
          return res.json();
        })
        .then((cards) => {
          console.log(cards);
          cards.forEach((cardData) => {
            const newCard = createCard(cardData.link, cardData.name, cardData.likes, cardData.owner._id === userID, cardData._id);
            cardContainer.append(newCard);
        });
    }).catch(err => console.log(err));
}

function saveUserInformation(name, description) {
    return fetch('https://nomoreparties.co/v1/apf-cohort-202/users/me', {
        method: 'PATCH',
        headers: {
          authorization: 'c597d92d-5898-4bf5-baee-08b5177a1d55',
          'Content-Type': 'application/json'
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
      }).catch(err => console.log(err));
}

function postNewCard(name, link) {
    return fetch('https://nomoreparties.co/v1/apf-cohort-202/cards', {
        method: 'Post',
        headers: {
            authorization: 'c597d92d-5898-4bf5-baee-08b5177a1d55',
            'Content-Type': 'application/json'
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
    })
    .then((result) => {
      console.log(result);
    }).catch(err => console.log(err));
}

function deleteCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/apf-cohort-202/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
          authorization: 'c597d92d-5898-4bf5-baee-08b5177a1d55',
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
  return fetch(`https://nomoreparties.co/v1/apf-cohort-202/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
        authorization: 'c597d92d-5898-4bf5-baee-08b5177a1d55',
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
  return fetch(`https://nomoreparties.co/v1/apf-cohort-202/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
        authorization: 'c597d92d-5898-4bf5-baee-08b5177a1d55',
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
  return fetch('https://nomoreparties.co/v1/apf-cohort-202/users/me/avatar', {
    method: 'PATCH',
        headers: {
          authorization: 'c597d92d-5898-4bf5-baee-08b5177a1d55',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: `${urlAvatar}`
        })
      }).then(res => {
        if(!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        console.log(result);
      }).catch(err => console.log(err));
}
export{getCardsInformation, postNewCard, getUserInformation, deleteCard, putLike, deleteLike, userID};
