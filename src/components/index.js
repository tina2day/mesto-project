import {createCard} from './cards.js';
import {getCardsInformation, postNewCard, getUserInformation, updateAvatar} from './server.js';
import {enableValidation, hideInputError} from './validate.js';
import {closeModal, openModal} from './modal.js';
import '../pages/index.css';
import avatar from '../images/avatar.jpg';

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
getUserInformation();
getCardsInformation();
const avatarImage = document.querySelector('.profile__image');
avatarImage.style.backgroundImage = `url(${avatar})`;
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

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');
imageProfilePopup.classList.add('popup_is-animated');

function openImagePopup(link, name) {
    imageCardPopup.src = link;
    imageCardPopup.alt = name;
    imageCaptionPopup.textContent = name;
    openModal(imagePopup);
}

const profileElement = document.querySelector('.profile');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');
const profileTitle = profileElement.querySelector('.profile__title');
const profileDescription = profileElement.querySelector('.profile__description');
const profileFormElement = profilePopup.querySelector('.popup__form');

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
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(profilePopup);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

const cardName = cardPopup.querySelector('.popup__input_type_card-name');
const cardUrl = cardPopup.querySelector('.popup__input_type_url');
const cardFormElement = cardPopup.querySelector('.popup__form');

addButton.addEventListener('click', () => {
    cardName.value = "";
    cardUrl.value = "";
    hideInputError(cardPopup, cardName, validationSettings);
    hideInputError(cardPopup, cardUrl, validationSettings);
    openModal(cardPopup);
});

function handleProfileImageSubmit(evt) {
    evt.preventDefault();
    avatarImage.style.backgroundImage = `url(${editImageUrl.value})`;
    updateAvatar(editImageUrl.value);
    closeModal(imageProfilePopup);
}

editImage.addEventListener('click', () => {
    editImageUrl.value = avatar;
    hideInputError(imageProfilePopup, editImageUrl, validationSettings);
    openModal(imageProfilePopup);
});

imageProfileFormElement.addEventListener('submit', handleProfileImageSubmit);

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    postNewCard(cardName.value, cardUrl.value).then(res => {
        const newCard = createCard(cardUrl.value, cardName.value, res.likes, true, res._id);
        cardContainer.prepend(newCard);
    });
    closeModal(cardPopup);
}

cardFormElement.addEventListener('submit', handleCardFormSubmit);

enableValidation(validationSettings);
export {validationSettings, openImagePopup, cardContainer, createCard};