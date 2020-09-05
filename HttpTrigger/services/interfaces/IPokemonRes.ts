export interface IProxyAllPokemonRes {
  count: number
  next: string
  previous: string
  results: IPokemonResults[]
}

export interface IPokemonResults {
  name: string
  url: string
}

export interface IPokemonRes {
  status: number
  body: {
    pokemons: string[] | string
  }
}

export interface IProxyPokemonByIdRes {
  abilities: object[]
  base_experience: number
  forms: object[]
  game_indices: object[]
  height: number
  held_items: object[]
  id: number
  is_default: boolean
  location_area_encounters: string
  movies: object[]
  name: string
  order: number
  species: object
  sprites: object
  stats: object[]
  types: IProxyPokemonType[]
  weight: number
}

export interface IProxyPokemonByTypeRes {
  abilities: object[]
  base_experience: number
  forms: object[]
  game_indices: object[]
  height: number
  held_items: object[]
  id: number
  is_default: boolean
  location_area_encounters: string
  movies: object[]
  names: IProxyPokemonByTypeName[]
  order: number
  species: object
  sprites: object
  stats: object[]
  types: IProxyPokemonType[]
  weight: number
}

interface IProxyPokemonByTypeName {
  language: {
    name: string
    url: string
  }
  name: string
}

export interface IProxyPokemonType {
  slot: number
  type: {
    name: string
    url: string
  }
}
