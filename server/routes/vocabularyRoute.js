const route = require("express").Router();
const vocabularyController = require("../controllers/vocabularyController");
const { body } = require("express-validator");

const authMiddleware = require("../middlewares/authMiddleware");

route.use(authMiddleware);

route.get("/all/:uid", vocabularyController.getAllVocabulariesByUserId);
route.get("/vocabulary/:vid/", vocabularyController.getVocabularyById);
route.get(
  "/filter/:resources",
  vocabularyController.getVocabulariesByResources
);
route.get(
  "/search/:query/:uid",
  vocabularyController.getVocabulariesBySearchQuery
);
route.get("/:uid/:page", vocabularyController.getVocabulariesByUserId);
route.post(
  "/:uid",
  body("vocabulary").not().isEmpty(),
  body("definition").not().isEmpty(),
  vocabularyController.addNewVocabulary
);

module.exports = route;
