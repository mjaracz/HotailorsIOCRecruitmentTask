import axios, {AxiosInstance, AxiosResponse} from 'axios'
import { injectable } from 'inversify'

@injectable()
export abstract class HttpClient {
  protected readonly axiosInstance: AxiosInstance

  protected constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
    })

    this._initializeResponseInterceptor()
  }
  protected _handleError = (error) => Promise.reject(error)

  private readonly _initializeResponseInterceptor = () => {
    this.axiosInstance.interceptors.response.use(
      this._handleResponse,
      this._handleError,
    )
  }

  private readonly _handleResponse = ({ data }: AxiosResponse) => data
}
