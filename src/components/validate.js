import {closeModal} from './modal.js';
const showInputError = (popupElement, inputElement, errorMessage, settings) => {
    const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
};

const hideInputError = (popupElement, inputElement, settings) => {
    const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(settings.errorClass);
};

const checkInputValidity = (popupElement, inputElement, settings) => {
    if(!inputElement.validity.valid) {
        showInputError(popupElement, inputElement, inputElement.validationMessage, settings);
    } else {
        hideInputError(popupElement, inputElement, settings);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement, settings) => {
    if(hasInvalidInput(inputList)){
        buttonElement.classList.add(settings.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(settings.inactiveButtonClass);
    }
};

const setEventListener = (popupElement, settings) => {
    const inputList = Array.from(popupElement.querySelectorAll(settings.inputSelector));
    const buttonElement = popupElement.querySelector(settings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, settings);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            toggleButtonState(inputList, buttonElement, settings);
            checkInputValidity(popupElement, inputElement, settings);
        });
    });
};

const enableValidation = (settings) => {
    const popupList = Array.from(document.querySelectorAll(settings.popupElementSelector));
    popupList.forEach((popupElement) => {
        popupElement.addEventListener('click', (evt) => {
            if (!evt.target.closest(settings.popupContentSelector)) {
                closeModal(popupElement);
            }
        });
        popupElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListener(popupElement, settings);
    });
};
export {enableValidation, hideInputError};