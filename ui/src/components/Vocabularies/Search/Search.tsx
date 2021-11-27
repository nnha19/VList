import React, { useEffect, useState } from "react";
import { IVocabularies } from "../../../types/types";

interface IProps {
  setSkeletonLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search: React.FC<IProps> = ({ setSkeletonLoading }) => {
  const [searchVal, setSearchVal] = useState("");

  const searchVocabularyHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchVal === "") return;
    setSkeletonLoading(true);
  };

  useEffect(() => {
    if (searchVal.length < 1) {
      setTimeout(() => {}, 1000);
    }
  }, [searchVal]);

  return (
    <div className="mt-4 sm:mt-0 w-3/5  mx-auto">
      <form onSubmit={searchVocabularyHandler} className="relative">
        <input
          onChange={(e) => setSearchVal(e.target.value)}
          className="border-2 w-full p-2 rounded-full"
          type="text"
          placeholder="Search Vocabularies"
        />
      </form>
    </div>
  );
};

export default Search;
