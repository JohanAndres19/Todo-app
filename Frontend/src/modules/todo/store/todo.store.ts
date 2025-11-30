import { makeAutoObservable, runInAction } from 'mobx'
import { TodosApi, type Todo } from '../api/todos.api'

export class TodoStore {
  todos: Todo[] = []
  loading = false
  error: string | null = null

  // UI state
  editing: Todo | null = null
  searchTerm = ''
  statusFilter = ''
  dateFilter = ''

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  // ================================
  // FETCH
  // ================================
  fetchTodos = async (getHeaders: () => Promise<any>) => {
    this.loading = true
    try {
      const headers = await getHeaders()
      const data = await TodosApi.list(headers)

      runInAction(() => {
        this.todos = data
      })
    } catch (err: any) {
      this.setError(err)
    } finally {
      runInAction(() => {
        this.loading = false
      })
    }
  }

  // ================================
  // CREATE
  // ================================
  createTodo = async (payload: Partial<Todo>, getHeaders: () => Promise<any>) => {
    this.loading = true
    try {
      const headers = await getHeaders()
      const created = await TodosApi.create(payload, headers)

      runInAction(() => {
        this.todos.unshift(created)
      })
    } catch (err: any) {
      this.setError(err)
    } finally {
      this.loading = false
    }
  }

  // ================================
  // UPDATE
  // ================================
  updateTodo = async (id: string, payload: Partial<Todo>, getHeaders: () => Promise<any>) => {
    this.loading = true
    try {
      const headers = await getHeaders()
      const updated = await TodosApi.update(id, payload, headers)

      runInAction(() => {
        this.todos = this.todos.map(t =>
          (t._id ?? t.id) === id ? updated : t
        )
      })
    } catch (err: any) {
      this.setError(err)
    } finally {
      this.loading = false
    }
  }

  // ================================
  // DELETE
  // ================================
  deleteTodo = async (id: string, getHeaders: () => Promise<any>) => {
    try {
      const headers = await getHeaders()
      await TodosApi.remove(id, headers)

      runInAction(() => {
        this.todos = this.todos.filter(t => (t._id ?? t.id) !== id)
      })
    } catch (err: any) {
      this.setError(err)
    }
  }

  // ================================
  // UI STATE (arrow methods, no más this undefined)
  // ================================
  setEditing = (task: Todo | null) => {
    this.editing = task
  }

  setSearchTerm = (v: string) => {
    this.searchTerm = v
  }

  setStatusFilter = (v: string) => {
    this.statusFilter = v
  }

  setDateFilter = (v: string) => {
    this.dateFilter = v
  }

  // ================================
  // ERROR HANDLING
  // ================================
  private setError = (err: any) => {
    runInAction(() => {
      this.error = err?.message ?? 'Unknown error'
    })
  }

  // ================================
  // COMPUTED - FILTERED LIST
  // ================================
  get filteredTodos() {
    const search = this.searchTerm.trim().toLowerCase()

    return this.todos.filter(t => {
      const matchesSearch =
        !search ||
        (t.title ?? '').toLowerCase().includes(search) ||
        (t.description ?? '').toLowerCase().includes(search)

      const matchesStatus =
        !this.statusFilter || t.status === this.statusFilter

      const matchesDate =
        !this.dateFilter || t.due_date === this.dateFilter

      return matchesSearch && matchesStatus && matchesDate
    })
  }
}

