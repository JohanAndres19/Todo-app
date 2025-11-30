import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import type { Todo } from './TaskCard'


type TaskModalProps = {
  isOpen: boolean
  onClose: () => void
  onSave: (task: { title: string; description?: string; status: string; due_date?: string | null }) => void
  editingTask?: Todo | null
}


export const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSave, editingTask }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<'pending' | 'in_progress' | 'completed' | string>('pending')
  const [dueDate, setDueDate] = useState('')


  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title ?? '')
      setDescription(editingTask.description ?? '')
      setStatus(editingTask.status ?? 'pending')
      setDueDate(editingTask.due_date ?? '')
    } else {
      setTitle('')
      setDescription('')
      setStatus('pending')
      setDueDate('')
    }
  }, [editingTask, isOpen])


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return


    onSave({ title: title.trim(), description: description.trim(), status, due_date: dueDate || null })
    onClose()
  }


  if (!isOpen) return null


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">{editingTask ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded transition-colors" aria-label="Cerrar modal">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>


        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">Título *</label>
            <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="Ingresa el título de la tarea" required />
          </div>


          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">Descripción</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none" placeholder="Agrega una descripción..." rows={4} />
          </div>


          <div>
            <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-1">Estado</label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
              <option value="pending">Pendiente</option>
              <option value="in_progress">En Progreso</option>
              <option value="completed">Completada</option>
            </select>
          </div>


          <div>
            <label htmlFor="dueDate" className="block text-sm font-semibold text-gray-700 mb-1">Fecha de Vencimiento</label>
            <input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
          </div>


          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">Cancelar</button>
            <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">{editingTask ? 'Guardar' : 'Crear'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}


export default TaskModal
