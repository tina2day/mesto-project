
const closeModal = (popup) => {      
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc);
}

const openModal = (popup) => {      
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc);
}

const closeButtons = document.querySelectorAll('.popup__close');
closeButtons.forEach((closeButton) => {
    closeButton.addEventListener('click', () => {
        closeModal(closeButton.closest('.popup'));
    });
});

const closeByEsc = (evt) => {
    const openedPopup = document.querySelector('.popup_is-opened'); 
    if(evt.key==='Escape') {
        closeModal(openedPopup);
    }
};
export {closeModal, openModal};