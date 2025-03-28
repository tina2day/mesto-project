const profilePopup = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');

const cardPopup = document.querySelector('.popup_type_new-card');
const addButton = document.querySelector('.profile__add-button');

const imagePopup = document.querySelector('.popup_type_image');
const imageCardPopup = imagePopup.querySelector('.popup__image');
const imageCaptionPopup = imagePopup.querySelector('.popup__caption');

const cardContainer = document.querySelector('.places__list');

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

function createCard(link, name) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    cardImage.addEventListener('click', () => {
        openImagePopup(link, name);
    });

    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_is-active');
    });

    deleteButton.addEventListener('click', () => {
        cardElement.remove();
    });

    return cardElement;
}

const closeByEsc = (evt) => {
    const openedPopup = document.querySelector('.popup_is-opened'); 
    if(evt.key==='Escape') {
        closeModal(openedPopup);
    }
};

function closeModal(popup) {      
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc);
}

function openModal(popup) {      
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc);
}

function openImagePopup(link, name) {
    imageCardPopup.src = link;
    imageCardPopup.alt = name;
    imageCaptionPopup.textContent = name;
    openModal(imagePopup);
}

const closeButtons = document.querySelectorAll('.popup__close');
closeButtons.forEach((closeButton) => {
    closeButton.addEventListener('click', () => {
        closeModal(closeButton.closest('.popup'));
    });
});

const profileElement = document.querySelector('.profile');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');
const profileTitle = profileElement.querySelector('.profile__title');
const profileDescription = profileElement.querySelector('.profile__description');
const profileFormElement = profilePopup.querySelector('.popup__form');

function createProfile() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
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
    openModal(cardPopup);
});

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const newCard = createCard(cardUrl.value, cardName.value);
    cardContainer.prepend(newCard);
    closeModal(cardPopup);
}

cardFormElement.addEventListener('submit', handleCardFormSubmit);

initialCards.forEach((cardData) => {
    const newCard = createCard(cardData.link, cardData.name);
    cardContainer.append(newCard);
});

const showInputError = (popupElement, inputElement, errorMessage) => {
    const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (popupElement, inputElement) => {
    const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.textContent = '';
    errorElement.classList.remove('popup__input-error_active');
};

const checkInputValidity = (popupElement, inputElement) => {
    if(!inputElement.validity.valid) {
        showInputError(popupElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(popupElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement) => {
    if(hasInvalidInput(inputList)){
        buttonElement.classList.add('popup__button_inactive');
    } else {
        buttonElement.classList.remove('popup__button_inactive');
    }
};

const setEventListener = (popupElement) => {
    const inputList = Array.from(popupElement.querySelectorAll('.popup__input'));
    const buttonElement = popupElement.querySelector('.popup__button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            toggleButtonState(inputList, buttonElement);
            checkInputValidity(popupElement, inputElement);
        });
    });
};

const enableValidation = () => {
    const popupList = Array.from(document.querySelectorAll('.popup'));
    popupList.forEach((popupElement) => {
        popupElement.addEventListener('click', (evt) => {
            if (!evt.target.closest('.popup__content')) {
                closeModal(popupElement);
            }
        });
        popupElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListener(popupElement);
    });
};

enableValidation();
        