import { IAbility } from "./IAbility";

export interface IPokemonDetails {
  abilities: IAbility[];
  height: number;
  id: number;
  moves: string[];
  name: string;
  image: string;
  weight: number;
}
