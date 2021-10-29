import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ISynAndAnt } from "../../pages/showWordPage";
import { IVocabulary } from "../../types/types";
import Layout from "../Common/Layout/Layout";

interface IProps {
  showWord: IVocabulary;
  synAndAnt: ISynAndAnt;
  exampleSentences: string[];
}

const ShowWord: React.FC<IProps> = ({
  showWord,
  synAndAnt,
  exampleSentences,
}) => {
  const renderExampleSents = (sentences: string[]) => {
    return sentences.map((sentence, i) => {
      return (
        <p className="mb-2 flex flex-wrap">
          {sentence.split(" ").map((w) => {
            return (
              <span
                className={`mr-2 ${
                  showWord.vocabulary.toLocaleLowerCase() ===
                    w.toLocaleLowerCase() && "font-bold"
                }`}
              >
                {w}
              </span>
            );
          })}
        </p>
      );
    });
  };

  const func = (arr: string[]) => {
    return arr.map((s) => {
      return (
        <p
          className="px-4 py-2 mb-2 capitalize bg-gray-50 inline-block rounded mr-2"
          key={s}
        >
          {s}
        </p>
      );
    });
  };

  const pronounceWord = () => {
    var msg = new SpeechSynthesisUtterance();
    msg.text = showWord.vocabulary;
    window.speechSynthesis.speak(msg);
  };

  const history = useHistory();
  return (
    <Layout>
      <div
        onClick={history.goBack}
        className="p-4 text-xl cursor-pointer border-b-2"
      >
        <i className="fas fa-arrow-left"></i>
        <span className="ml-2">Back</span>
      </div>
      <div className="p-4 ">
        <div className="border-b-2">
          <div className="flex items-center">
            <h2 className="title mr-4">{showWord.vocabulary}</h2>
            <i
              onClick={pronounceWord}
              className="fas fa-volume-up cursor-pointer"
            ></i>
          </div>
          <div className="flex items-start my-4">
            <span className="font-medium mr-4 ">Defination</span>
            <span>{showWord.defination}</span>
          </div>
        </div>
        {showWord.exampleSentences && (
          <div>
            <h2 className="title my-2">Example Sentences</h2>
            {renderExampleSents(showWord.exampleSentences)}
          </div>
        )}
        {showWord.note && (
          <div className="my-4">
            <p className="title">Note</p>
            <p>{showWord.note}</p>
          </div>
        )}
        {synAndAnt["synonyms"].length > 0 && (
          <div>
            <h2 className="title my-4">Synonums</h2>
            {func(synAndAnt["synonyms"])}
          </div>
        )}
        {synAndAnt["antonyms"].length > 0 && (
          <div>
            <h2 className="title my-4">Antonyms</h2>
            {func(synAndAnt["antonyms"])}
          </div>
        )}
      </div>
      <h1 className="title m-4">More Example Sentences</h1>
      <div className="m-4 w-full">{renderExampleSents(exampleSentences)}</div>
    </Layout>
  );
};

export default ShowWord;
