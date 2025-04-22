import { openImagePopup } from "./index.js";
import { deleteCard, putLike, deleteLike, userID} from "./server.js";
function createCard(link, name, likes, isBelonging, cardId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeAmount = cardElement.querySelector('.card__like-amount');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  likeAmount.textContent = likes.length;
  cardElement.id = cardId;
  cardImage.addEventListener('click', () => {
    openImagePopup(link, name);
  });
  likes.forEach((like) => {
    if(like._id === userID) {
      likeButton.classList.add('card__like-button_is-active');
    }
  });
  if(isBelonging) {
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.classList.remove('card__delete-button_active-none');
    deleteButton.addEventListener('click', () => {
      deleteCard(cardId);
      cardElement.remove();
    });
  }
  likeButton.addEventListener('click', () => {
      if(likeButton.classList.contains('card__like-button_is-active')) {
        likeButton.classList.remove('card__like-button_is-active');
        deleteLike(cardId).then(res => {likeAmount.textContent = res.likes.length});
      } else {
        putLike(cardId).then(res => {likeAmount.textContent = res.likes.length});
        likeButton.classList.add('card__like-button_is-active');
      }
  });

  return cardElement;
}
export {createCard};
