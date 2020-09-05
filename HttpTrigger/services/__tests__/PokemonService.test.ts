import { Container } from 'inversify'
import { IPokemonService } from '../interfaces/IPokemonService'
import { IPokemonRes } from '../interfaces/IPokemonRes'
import { COMMON_TYPES } from '../../../ioc/commonTypes'
import getContainer from '../../../ioc/inversify.config'
import axios from 'axios'

describe('PokemonService class', () => {
  let pokemonService
  let axiosInstanceSpyOn
  const container: Container = getContainer()

  beforeEach(() => {
    axiosInstanceSpyOn = jest.spyOn(axios, 'create')
    pokemonService = container.get<IPokemonService<IPokemonRes>>(COMMON_TYPES.IPokemonService)
  })

  it('should be defined without crashing', () => {
    expect(pokemonService).toBeDefined()
  })

  describe('when call getAllPokemon method', () => {
    it('should call axios instance correctly', () => {
      pokemonService.getAllPokemon()
      expect(axiosInstanceSpyOn).toHaveBeenCalled()
    })
  })
  describe('when call getPokemonById method', () => {
    it('should call axios instance correctly', () => {
      pokemonService.getPokemonById()
      expect(axiosInstanceSpyOn).toHaveBeenCalled()
    })
  })
  describe('when call getPokemonsByIds method', () => {
    it('should call axios instance correctly', () => {
      pokemonService.getPokemonsByIds()
      expect(axiosInstanceSpyOn).toHaveBeenCalled()
    })
  })
  describe('when call getPokemonByType method', () => {
    it('should call axios instance correctly', () => {
      pokemonService.getPokemonByType()
      expect(axiosInstanceSpyOn).toHaveBeenCalled()
    })
  })

})
