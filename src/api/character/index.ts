import api from '../connection';

import { Character, CharacterGenderEnum, CharacterStatusEnum } from './model';

export type ResponseInfo = {
  count: number;
  pages: number;
  next: string; // Next url to search by page
  prev: string | null;
};

export type RequestCharacter = {
  page: number;
  name?: string;
  type?: string;
  species?: string;
  gender?: CharacterGenderEnum;
  status?: CharacterStatusEnum | string;
};

export type ResponseCharacter = {
  info: ResponseInfo;
  results: Character[];
};

export const listCharacters = async (data?: RequestCharacter) => {
  let filter = '?';

  if (data) {
    Object.entries(data).forEach(([key, value], index) => {
      if (value) {
        filter += `${index ? '&' : ''}${key}=${value}`;
      }
    });
  }

  return await api.get<ResponseCharacter>(`/character/${filter}`);
};
