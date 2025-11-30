import axios from 'axios'


export type Todo = {
  _id?: string
  id?: string
  title: string
  description?: string
  status: 'pending' | 'in_progress' | 'completed' | string
  due_date?: string | null
  createdAt?: string
}


const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })


export const TodosApi = {
  list: async (headers?: Record<string, string>) => {
    const res = await api.get<Todo[]>('/', { headers })
    return res.data
  },
  create: async (payload: Partial<Todo>, headers?: Record<string, string>) => {
    const res = await api.post<Todo>('/', payload, { headers })
    return res.data
  },
  update: async (id: string, payload: Partial<Todo>, headers?: Record<string, string>) => {
    const res = await api.put<Todo>(`/${id}`, payload, { headers })
    return res.data
  },
  remove: async (id: string, headers?: Record<string, string>) => {
    console.log(`${id}`)
    const res = await api.delete(`/${id}`, { headers })
    return res.data
  },
}


