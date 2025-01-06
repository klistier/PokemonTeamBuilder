export interface IAbilityDetails {
  name: string;
  url: string;
}

export interface IAbility {
  ability: IAbilityDetails;
  is_hidden: boolean;
  slot: number;
}
