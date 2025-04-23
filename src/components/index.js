import {createCard} from './cards.js';
import {getCardsInformation, postNewCard, getUserInformation, updateAvatar, checkImageUrl, saveUserInformation} from './api.js';
import {enableValidation, hideInputError} from './validate.js';
import {closeModal, openModal} from './modal.js';
import '../pages/index.css';
let userID = '';
const validationSettings = {
    popupFormElementSelector: '.popup__form',
    popupElementSelector: '.popup',
    popupContentSelector: '.popup__content',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active' 
}

const profilePopup = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');

const imageProfilePopup = document.querySelector('.popup_type_edit-image');
const editImage = document.querySelector('.profile__image_overlay_icon');
const editImageUrl = imageProfilePopup.querySelector('.popup__input_type_url');
const imageProfileFormElement = imageProfilePopup.querySelector('.popup__form');

const cardPopup = document.querySelector('.popup_type_new-card');
const addButton = document.querySelector('.profile__add-button');

const imagePopup = document.querySelector('.popup_type_image');
const imageCardPopup = imagePopup.querySelector('.popup__image');
const imageCaptionPopup = imagePopup.querySelector('.popup__caption');

const cardContainer = document.querySelector('.places__list');

const loadingIndicator = document.querySelector('.places__loading-indicator');

let avatar = "";
const avatarImage = document.querySelector('.profile__image');

const profileElement = document.querySelector('.profile');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');
const profileTitle = profileElement.querySelector('.profile__title');
const profileDescription = profileElement.querySelector('.profile__description');
const profileFormElement = profilePopup.querySelector('.popup__form');

const cardName = cardPopup.querySelector('.popup__input_type_card-name');
const cardUrl = cardPopup.querySelector('.popup__input_type_url');
const cardFormElement = cardPopup.querySelector('.popup__form');

getUserInformation().then(res => {
    userID = res._id;
    avatar = res.avatar;
    profileTitle.textContent = res.name;
    profileDescription.textContent = res.about;
    return res;
}).then(res => avatarImage.style.backgroundImage = `url(${avatar})`);

getCardsInformation().then(cards => {
    loadingIndicator.style.display = 'block';
    const checkPromises = cards.map((cardData, i) =>
      checkImageUrl(cardData.link)
        .then(() => ({ card: cardData, isValid: true }))
        .catch(err => {
          console.log(`Не удалось загрузить изображение: ${cardData.link}`, err);
          return { card: cardData, isValid: false };
        })
    );
  
    Promise.all(checkPromises).then(results => {
      results.forEach(({ card, isValid }) => {
        if (isValid) {
          cardContainer.append(createCard(
            card.link,
            card.name,
            card.likes,
            card.owner._id === userID,
            card._id
          ));
        }
      });
    }).finally(() => loadingIndicator.style.display = 'none');
  });

function openImagePopup(link, name) {
    imageCardPopup.src = link;
    imageCardPopup.alt = name;
    imageCaptionPopup.textContent = name;
    openModal(imagePopup);
}

function createProfile() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    hideInputError(profilePopup, nameInput, validationSettings);
    hideInputError(profilePopup, jobInput, validationSettings);
}

editButton.addEventListener('click', () => {
    createProfile();
    openModal(profilePopup);
});

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const popupButton = profileFormElement.querySelector('.popup__button');
    popupButton.textContent = "Сохранение...";
    saveUserInformation(nameInput.value, jobInput.value).then(() => {
        profileTitle.textContent = nameInput.value;
        profileDescription.textContent = jobInput.value;
        popupButton.textContent = "Сохранить";
        closeModal(profilePopup);
    }).catch(err => {
        console.log(err);
    }).finally(() => popupButton.textContent = "Сохранить");
}

function handleProfileImageSubmit(evt) {
    evt.preventDefault();
    const popupButton = imageProfileFormElement.querySelector('.popup__button');
    popupButton.textContent = "Сохранение...";
    avatar = editImageUrl.value;
    updateAvatar(avatar).then(() => {
            avatarImage.style.backgroundImage = `url(${avatar})`;
            popupButton.textContent = "Сохранить";
            closeModal(imageProfilePopup);
    }).catch(err => {
        console.log(err);
    }).finally(() => popupButton.textContent = "Сохранить");
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const popupButton = cardFormElement.querySelector('.popup__button');
    popupButton.textContent = "Сохранение...";
    postNewCard(cardName.value, cardUrl.value).then(res => {
        const newCard = createCard(cardUrl.value, cardName.value, res.likes, true, res._id);
        cardContainer.prepend(newCard);
        popupButton.textContent = "Сохранить";
        closeModal(cardPopup);
    }).catch(err => {
        console.log(err);
    }).finally(() => popupButton.textContent = "Сохранить");
    
}

addButton.addEventListener('click', () => {
    cardName.value = "";
    cardUrl.value = "";
    hideInputError(cardPopup, cardName, validationSettings);
    hideInputError(cardPopup, cardUrl, validationSettings);
    openModal(cardPopup);
});

editImage.addEventListener('click', () => {
    editImageUrl.value = avatar;
    hideInputError(imageProfilePopup, editImageUrl, validationSettings);
    openModal(imageProfilePopup);
});

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

imageProfileFormElement.addEventListener('submit', handleProfileImageSubmit);

cardFormElement.addEventListener('submit', handleCardFormSubmit);

enableValidation(validationSettings);
export {validationSettings, openImagePopup, cardContainer, createCard, userID};