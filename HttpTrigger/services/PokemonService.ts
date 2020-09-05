import { COMMON_TYPES } from '../../ioc/commonTypes'
import { IPokemonService } from './interfaces/IPokemonService'
import { IProxyAllPokemonRes, IPokemonRes, IProxyPokemonByIdRes, IProxyPokemonByTypeRes } from './interfaces/IPokemonRes'
import { inject , injectable} from 'inversify'
import { ILogger } from '../../commonServices/iLogger'
import { HttpClient } from '../../commonServices/HttpClient'

@injectable()
export class PokemonService extends HttpClient implements IPokemonService<IPokemonRes> {
  @inject(COMMON_TYPES.ILogger)
  private readonly _logger: ILogger

  constructor() {
    super('https://pokeapi.co/api/v2')
  }

  public async getAllPokemon(): Promise<IPokemonRes> {
    this._logger.info('GET all pokemon')
    const response: IProxyAllPokemonRes = await this.axiosInstance.get('/pokemon')
    const pokemonsName: string[] = response.results.map((result) => result.name)

    return {
      status: 200,
      body: {
        pokemons: pokemonsName
      }
    }
  }

  public async getPokemonById(id: string, type?: string): Promise<IPokemonRes> {
    this._logger.info('GET pokemon by ID')
    const response: IProxyPokemonByIdRes = await this.axiosInstance.get(`/pokemon/${id}`)
    let pokemonName: string = response.name

    if (type) {
      pokemonName = (response.types.find((pokemonType) => pokemonType.type.name === type))
        ? response.name
        : null
    }

    return {
      status: 200,
      body: {
        pokemons: [pokemonName]
      }
    }
  }

  public async getPokemonsByIds(idsQuery: string[], type?: string): Promise<IPokemonRes> {
    this._logger.info('GET pokemons by IDS')
    const pokemonsRes: IProxyPokemonByIdRes[] = []
    let pokemonName: string[] = []

    for (const id of idsQuery) {
      const response: IProxyPokemonByIdRes = await this.axiosInstance.get(`pokemon/${id}`)
      pokemonsRes.push(response)
      pokemonName.push(response.name)
    }
    if (type) {
      pokemonName = pokemonsRes
        .filter((pokemonRes) => pokemonRes.types.find((pokemonType) => pokemonType.type.name === type))
        .map((pokemonRes) => pokemonRes.name)
    }

    return {
      status: 200,
      body: {
        pokemons: pokemonName
      }
    }
  }

  public async getPokemonByType(type: string): Promise<IPokemonRes> {
    this._logger.info('GET pokemons by type')
    const pokemonsRes: IProxyPokemonByTypeRes = await this.axiosInstance.get(`/type/${type}`)

    return {
      status: 200,
      body: {
        pokemons: pokemonsRes.names.map((pokemonName) => pokemonName.name)
      }
    }
  }
}
