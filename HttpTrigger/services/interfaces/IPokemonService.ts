export interface IPokemonService<T> {
  getAllPokemon(): Promise<T>
  getPokemonById(id: string, type?: string): Promise<T>
  getPokemonsByIds(idsQuery: string[], type?: string): Promise<T>
  getPokemonByType(type: string): Promise<T>
}
