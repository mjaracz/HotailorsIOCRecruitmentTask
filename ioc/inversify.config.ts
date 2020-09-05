import 'reflect-metadata'
import { Container } from 'inversify'
import { COMMON_TYPES } from './commonTypes'

import { Logger } from '../commonServices/logger'
import { ILogger } from '../commonServices/iLogger'
import { IPokemonService } from '../HttpTrigger/services/interfaces/IPokemonService'
import { IPokemonRes } from '../HttpTrigger/services/interfaces/IPokemonRes'
import { PokemonService } from '../HttpTrigger/services/PokemonService'

const getContainer: (() => Container) = (): Container => {
  const container: Container = new Container()

  container
    .bind<ILogger>(COMMON_TYPES.ILogger)
    .to(Logger)
    .inSingletonScope()

  container
    .bind<IPokemonService<IPokemonRes>>(COMMON_TYPES.IPokemonService)
    .to(PokemonService)

  return container
}

export default getContainer
