interface BaseModel {
  name: string;
  url: string;
}

export enum CharacterStatusEnum {
  alive = 'Alive',
  dead = 'Dead',
  unknown = 'unknown',
}

export enum CharacterGenderEnum {
  female = 'Female',
  male = 'Male',
  genderless = 'Genderless',
  unknown = 'unknown',
}

export interface Character {
  id: number; // The id of the character.
  name: string; // The name of the character.
  status: CharacterStatusEnum; // The status of the character ('Alive', 'Dead' or 'unknown').
  species: string; // The species of the character.
  type: string; // The type or subspecies of the character.
  gender: CharacterGenderEnum; // The gender of the character ('Female', 'Male', 'Genderless' or 'unknown').
  origin: BaseModel; //	Name and link to the character's origin location.
  location: BaseModel; // Name and link to the character's last known location endpoint.
  image: string; // Link to the character's image. All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars.
  episode: Array<string>; // List of episodes in which this character appeared.
  url: string; // Link to the character's own URL endpoint.
  created: Date; //	Time at which the character was created in the database
}

export interface Episode {
  id: number;
  url: string;
  name: string;
  episode: string;
  air_date: string;
  characters: string[];
}
