import axios from "axios";
import React from "react";
import { useAuthContext } from "../../../customHooks/useAuthContext";
import { IVocabulary } from "../../../types/types";
import Label from "../../Common/Label/Label";

import "./AddToLearning.css";

interface IProps {
  vocabulary: IVocabulary;
}

const AddToLearning: React.FC<IProps> = ({ vocabulary }) => {
  const {
    user: { token, learnings, _id },
    setUser,
  } = useAuthContext();
  const alreadyOnLearnings = learnings.some((l) => l._id === vocabulary._id);

  const handleAddToLearning = async () => {
    try {
      const resp = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/learnings/${_id}/${vocabulary._id}`,
        method: alreadyOnLearnings ? "DELETE" : "POST",
        headers: {
          authorization: `bearer ${token}`,
        },
      });

      if (alreadyOnLearnings) {
        setUser((prev) => ({
          ...prev,
          learnings: prev.learnings.filter((l) => l._id !== vocabulary._id),
        }));
      } else {
        setUser((prev) => ({
          ...prev,
          learnings: [...prev.learnings, vocabulary],
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };
  return vocabulary.owner === _id ? (
    <button
      onClick={handleAddToLearning}
      id="add-to-learning"
      className="h-8 text-white w-8 rounded-full bg-primaryColor relative atl-btn"
    >
      {!alreadyOnLearnings ? (
        <i className="fas fa-plus"></i>
      ) : (
        <i className="fas fa-minus"></i>
      )}
      <Label
        text={`${
          alreadyOnLearnings ? "Remove From Learning" : "Add To Learning"
        }`}
      />
    </button>
  ) : null;
};

export default AddToLearning;