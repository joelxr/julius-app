import axios from 'axios'
import config from './config'

const { API_KEY, API_URL } = config

if (!API_KEY || !API_URL) {
  throw new Error(`API_KEY and API_URL must be defined`)
}

export const api = axios.create({
  baseURL: API_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    'api-key': API_KEY,
  },
})

export function useSummary<T>(basePath: string) {
  return {
    summary: () => {
      return api.get<T>(`${basePath}/summary`)
    },
  }
}

export function useCrud<T>(basePath: string) {
  return {
    find: (params: any) => {
      return api.get<T[]>(basePath, { params })
    },
    findOne: (id: number) => {
      return api.get<T>(`${basePath}/${id}`)
    },
    upsert: (data: any) => {
      return api.post<T>(basePath, data)
    },
    remove: (id: number) => {
      return api.delete<T>(`${basePath}/${id}`)
    },
  }
}
