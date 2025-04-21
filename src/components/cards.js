import { openImagePopup } from "./index.js";
function createCard(link, name, amount, isBelonging) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeAmount = cardElement.querySelector('.card__like-amount');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  likeAmount.textContent = amount;
  
  cardImage.addEventListener('click', () => {
    openImagePopup(link, name);
  });
  const deleteButton = cardElement.querySelector('.card__delete-button');
  if(isBelonging) {
    deleteButton.addEventListener('click', () => {
      cardElement.remove();
    });
  }
  likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('card__like-button_is-active');
  });

  return cardElement;
}
export {createCard};
