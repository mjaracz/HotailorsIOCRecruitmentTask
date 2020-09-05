import { IPokemonRes } from '../services/interfaces/IPokemonRes'

export interface IHttpTriggerResponse {
  body: IPokemonRes
  status: number
  headers: {
    'Content-Type': string
  }
}
