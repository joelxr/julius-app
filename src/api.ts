import axios from 'axios'

const apiKey = process.env.API_KEY || ''

export const api = axios.create({
  baseURL: 'http://localhost:8091',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    'api-key': apiKey,
  },
})

export function useInsights<T>(basePath: string) {
  return {
    insights: (id: number) => {
      return api.get<T>(`${basePath}/${id}/insights`)
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
