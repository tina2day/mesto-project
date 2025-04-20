function getUserInformation() {
    return fetch('https://nomoreparties.co/v1/apf-cohort-202/users/me', {
        headers: {
          authorization: 'c597d92d-5898-4bf5-baee-08b5177a1d55'
        }
      })
        .then(res => res.json())
        .then((result) => {
          console.log(result);
        }); 
}

function getCardsInformation() {
    return fetch('https://nomoreparties.co/v1/apf-cohort-202/cards', {
        headers: {
          authorization: 'c597d92d-5898-4bf5-baee-08b5177a1d55'
        }
      })
        .then(res => res.json())
        .then((result) => {
          console.log(result);
        });
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
      }).then(res => res.json())
      .then((result) => {
        console.log(result);
      });
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
    }).then(res => res.json())
    .then((result) => {
      console.log(result);
    });
}