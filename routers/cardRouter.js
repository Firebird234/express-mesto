const cardRouter = require("express").Router();

const { createCard } = require("../controllers/cardControllers/createCard");
const { getCards } = require("../controllers/cardControllers/getCards");
const { deleteCard } = require("../controllers/cardControllers/deleteCard");
const { addLike } = require("../controllers/cardControllers/addLike");
const { removeLike } = require("../controllers/cardControllers/removeLike");

const Card = require("../card");

//КАРТОЧКИ
cardRouter.post("/cards", createCard);

cardRouter.get("/cards", getCards);

cardRouter.delete("/cards/:cardId", deleteCard);

cardRouter.put("/cards/:cardId/likes", addLike);

cardRouter.delete("/cards/:cardId/likes", removeLike);
//_____________________________КАРТОЧКИ

module.exports = cardRouter;
