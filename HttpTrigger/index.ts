import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { Logger } from '../commonServices/logger'
import { COMMON_TYPES } from '../ioc/commonTypes'
import { ILogger } from '../commonServices/iLogger'
import { IPokemonService } from './services/interfaces/IPokemonService'
import { IPokemonRes } from './services/interfaces/IPokemonRes'
import { Container } from 'inversify'
import { IHttpTriggerResponse } from './interface/IHttpTrigger'
import getContainer from '../ioc/inversify.config'

const httpTrigger: AzureFunction = async (ctx: Context, req: HttpRequest): Promise<IHttpTriggerResponse> => {
  const container: Container = getContainer()
  const logger: Logger = container.get<ILogger>(COMMON_TYPES.ILogger) as Logger
  const pokemonService: IPokemonService<IPokemonRes> = container.get<IPokemonService<IPokemonRes>>(COMMON_TYPES.IPokemonService)
  const idsQuery = (req.query.id) ? req.query.id.split(',') : []
  logger.init(ctx, '1')

  if (req.query.type && !req.query.id) {
    const bodyResponse = await pokemonService.getPokemonByType(req.query.type)
    return ctx.res = {
      body: bodyResponse,
      status: 200,
      headers: {'Content-Type': 'application/json'}
    }
  }
  if (idsQuery.length === 1) {
    const bodyResponse = await pokemonService.getPokemonById(idsQuery[0], req.query?.type)
    return ctx.res = {
      body: bodyResponse,
      status: 200,
      headers: {'Content-Type': 'application/json'}
    }
  }
  if (idsQuery.length > 1) {
    const bodyResponse = await pokemonService.getPokemonsByIds(idsQuery, req.query?.type)
    return ctx.res = {
      body: bodyResponse,
      status: 200,
      headers: {'Content-Type': 'application/json'}
    }
  }

  return ctx.res = {
    body: await pokemonService.getAllPokemon(),
    status: 200,
    headers: {'Content-Type': 'application/json'},
  }
}

export default httpTrigger
