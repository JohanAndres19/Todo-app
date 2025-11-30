import { Pencil, Trash2, Calendar } from 'lucide-react'
import React from 'react'
import { observer } from 'mobx-react-lite'

export type Todo = {
  _id?: string
  id?: string
  title: string
  description?: string
  status: 'pending' | 'in_progress' | 'completed' | string
  due_date?: string | null
}

type TaskCardProps = {
  task: Todo
  onEdit: (task: Todo) => void
  onDelete: (id: string) => void
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 border-yellow-300',
  in_progress: 'bg-blue-100 border-blue-300',
  completed: 'bg-green-100 border-green-300',
}

const statusLabels: Record<string, string> = {
  pending: 'Pendiente',
  in_progress: 'En Progreso',
  completed: 'Completada',
}

const TaskCardComponent: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  const id = task._id ?? task.id ?? ''

  return (
    <div
      className={`${statusColors[task.status] ?? 'bg-white'} border-2 rounded-lg p-4 shadow-md hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 relative min-h-[200px] flex flex-col`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg text-gray-800 pr-2 break-words flex-1">{task.title}</h3>

        <div className="flex gap-1 flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 hover:bg-white/50 rounded transition-colors"
            aria-label="Editar tarea"
          >
            <Pencil className="w-4 h-4 text-gray-700" />
          </button>

          <button
            onClick={() => onDelete(id)}
            className="p-1.5 hover:bg-white/50 rounded transition-colors"
            aria-label="Eliminar tarea"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-gray-700 text-sm mb-3 break-words flex-1">{task.description}</p>
      )}

      <div className="mt-auto">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-semibold px-2 py-1 rounded bg-white/60">
            {statusLabels[task.status] ?? task.status}
          </span>

          {task.due_date && (
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(task.due_date)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export const TaskCard = observer(TaskCardComponent)
export default TaskCard

