import { useEffect, useState } from 'react'
import { Plus, LogOut, User } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../../shared/store/store-context.tsx'
import { useAuthHeaders } from '../../../shared/auth/useAuthHeaders'
import TaskCard from '../components/TaskCard'
import TaskModal from '../components/TaskModal'
import FilterBar from '../components/FilterBar'

const TodoPage: React.FC = () => {
  const { todoStore, userStore } = useStores()
  const { getHeaders } = useAuthHeaders()
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (userStore.user) todoStore.fetchTodos(getHeaders)
  }, [userStore.user])

  const list = todoStore.filteredTodos

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Mis Tareas</h1>
            <p className="text-gray-600">
              {list.length} {list.length === 1 ? 'tarea' : 'tareas'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {userStore.user && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">{userStore.user.email}</span>
              </div>
            )}

            <button
              onClick={() => { window.location.href = '/' }}
              className="px-4 py-2 text-gray-700 hover:bg-white/50 rounded-lg transition-colors font-medium inline-flex items-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Salir</span>
            </button>

            <button
              onClick={() => { todoStore.setEditing(null); setIsModalOpen(true) }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Nueva Tarea
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="mb-6">
          <FilterBar
            searchTerm={todoStore.searchTerm}
            onSearchChange={todoStore.setSearchTerm}
            statusFilter={todoStore.statusFilter}
            onStatusFilterChange={todoStore.setStatusFilter}
            dateFilter={todoStore.dateFilter}
            onDateFilterChange={todoStore.setDateFilter}
          />
        </div>

        {/* Lista */}
        {list.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No hay tareas que coincidan con los filtros.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {list.map((task) => (
              <TaskCard
                key={task._id ?? task.id}
                task={task}
                onEdit={(t) => { todoStore.setEditing(t); setIsModalOpen(true) }}
                onDelete={(id) => todoStore.deleteTodo(id, getHeaders)}
              />
            ))}
          </div>
        )}

        <TaskModal
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); todoStore.setEditing(null) }}
          onSave={(payload) => {
            if (todoStore.editing) {
              return todoStore.updateTodo(
                todoStore.editing._id ?? todoStore.editing.id!,
                payload,
                getHeaders
              )
            }
            return todoStore.createTodo(payload, getHeaders)
          }}
          editingTask={todoStore.editing}
        />
      </div>
    </div>
  )
}

export default observer(TodoPage)

