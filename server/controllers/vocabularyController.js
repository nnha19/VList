const Vocabulary = require("../Models/Vocabulary");
const User = require("../Models/User");

const getVocabulariesByUserId = async (req, res) => {
  try {
    const { uid } = req.params;
    const vocabularies = await Vocabulary.find({ owner: uid });
    res.status(200).json(vocabularies);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const addNewVocabulary = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await User.findById(uid);
    if (!user) {
      res.status(400).json("User can't be found.");
    } else {
      const { vocabulary, defination, exampleSentences, note } = req.body;
      const newVocabulary = await Vocabulary.create({
        vocabulary,
        defination,
        exampleSentences,
        note,
        timeStame: new Date(),
        owner: uid,
      });
      user.vocabularies.push(newVocabulary);
      await user.save();
      res.status(200).json(newVocabulary);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getVocabularyById = async (req, res) => {
  try {
    const { vid } = req.params;
    const vocabulary = await Vocabulary.findById(vid);
    if (vocabulary) {
      res.status(200).json(vocabulary);
    } else {
      res.status(400).json("Can't find the vocabulary with given ID.");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Something went wrong with the server. Try again.");
  }
};

exports.getVocabulariesByUserId = getVocabulariesByUserId;
exports.addNewVocabulary = addNewVocabulary;
exports.getVocabularyById = getVocabularyById;
