import React, { useEffect, useState } from "react";

import { IVocabulary } from "../types/types";
import axios from "axios";
import ShowWord from "../components/ShowWord/ShowWord";
import Spinner from "../components/Common/Spinner/Spinner";
import { useParams } from "react-router";
import Layout from "../components/Common/Layout/Layout";
import { useAuthContext } from "../customHooks/useAuthContext";

export interface ISynAndAnt {
  synonyms: string[];
  antonyms: string[];
}

const ShowWordPage = () => {
  const {
    user: { token },
  } = useAuthContext();
  const { wid } = useParams<any>();

  const [showWord, setShowWord] = useState({} as IVocabulary);
  const [loading, setLoading] = useState(false);
  const [exampleSentences, setExampleSentences] = useState<string[]>([]);
  const [secLoading, setSecLoading] = useState(false);
  const [synAndAnt, setSynAndAnt] = useState<ISynAndAnt>({
    synonyms: [],
    antonyms: [],
  });

  useEffect(() => {
    //Fetch Syn and Ant from third party API
    if (!showWord.vocabulary) return;
    (async () => {
      try {
        setLoading(true);
        const resp: any = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${showWord.vocabulary}`
        );
        const { synonyms, antonyms } = resp.data[0].meanings[0].definitions[0];
        setSynAndAnt({ synonyms, antonyms });
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    })();
  }, [wid, showWord.vocabulary]);

  useEffect(() => {
    try {
      setSecLoading(true);
      //Fetch detail of a vocabulary own API
      (async () => {
        const resp = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/vocabulary/vocabulary/${wid}`,
          {
            headers: {
              authorization: `bearer ${token}`,
            },
          }
        );
        setShowWord(resp.data);
        setSecLoading(false);
      })();
    } catch (err) {
      setSecLoading(false);
    }
  }, [wid]);

  useEffect(() => {
    //Fetch Example sentences from thid party API
    (async () => {
      try {
        const resp: any = await axios.get(
          `https://api.wordnik.com/v4/word.json/${showWord.vocabulary}/examples?includeDuplicates=false&useCanonical=false&limit=10&api_key=bwb6m06esfjyeun8kfsqltkt4riytwfkux1rmkpqgwcjlfhyc`
        );
        const sentences: string[] = resp.data.examples.map(
          (example: any) => example.text
        );
        setExampleSentences(Array.from(new Set(sentences)));
      } catch (err) {
        console.log(err);
      }
    })();
  }, [wid, showWord.vocabulary]);

  return (
    <Layout>
      {loading || secLoading ? (
        <Spinner />
      ) : (
        <ShowWord
          exampleSentences={exampleSentences}
          synAndAnt={synAndAnt}
          showWord={showWord}
        />
      )}
    </Layout>
  );
};
export default ShowWordPage;
