import axios from 'axios'

const { API_KEY, API_URL } = process.env

if (!API_KEY || !API_URL) {
  throw new Error(`API_KEY and API_URL must be defined`)
}

console.log(API_URL)

export const api = axios.create({
  baseURL: API_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    'api-key': API_KEY,
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
