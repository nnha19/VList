export interface IVocabulary {
  vocabulary: string;
  _id: string;
  definition: string;
  exampleSentences?: string[];
  note?: string;
  timeStamp: string;
  resource?: string;
  owner: string;
}

export interface IVocabularies {
  vocabularies: IVocabulary[];
}

export interface IUser {
  username: string;
  email: string;
  joinedDate: string;
  vocabularies: string[];
  _id: string;
  token: string;
  status: string;
  learnings: IVocabularies["vocabularies"];
  notifications: {
    user: IUser;
    vocabulary: IVocabulary;
    action: string;
    _id: string;
    new: boolean;
  }[];
  sendNotisTo: string[];
}
export interface IUsers {
  users: IUser[];
}
