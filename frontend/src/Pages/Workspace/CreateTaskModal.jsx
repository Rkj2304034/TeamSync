import React, { useState, useEffect } from 'react';
import { X, AlignLeft, Type, Folder, User, AlertCircle, Calendar } from 'lucide-react';



export default function CreateTaskModal({ onClose, onCreateTask, project }) {


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('Todo');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');


  // Lock background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);



  const handleSubmit = (e) => {
    e.preventDefault();

    // Format data to match your Mongoose schema exactly
    const newTaskData = {
      title,
      description,
      project: project._id ,
      assignedTo,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
    };

    onCreateTask(newTaskData);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 shrink-0">
          <h2 className="text-xl font-bold text-gray-900">Create New Task</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 p-2 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-8">
          <form id="create-task-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Title Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <Type className="w-4 h-4 text-gray-400"/> Task Title <span className="text-red-500">*</span>
              </label>
              <input 
                type="text"
                required
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              />
            </div>


            {/* Description Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <AlignLeft className="w-4 h-4 text-gray-400"/> Description
              </label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add any extra details, links, or context here..."
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px] resize-y transition-shadow"
              />
            </div>

            <hr className="border-gray-100 my-2" />

            {/* Metadata Grid (2 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 bg-gray-50/50 p-5 rounded-xl border border-gray-100">
              

              {/* Assignee Dropdown */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5"/> Assign To <span className="text-red-500">*</span>
                </label>
                <select 
                  required
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>Select team member...</option>
                  {project?.members?.map(m => (
                    <option key={m.user._id} value={m.user._id}>{m.user.name}({m.user.email}) </option>
                  ))}
                </select>
              </div>

              

              {/* Priority Dropdown */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5"/> Priority
                </label>
                <select 
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              {/* Due Date Picker */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5"/> Due Date
                </label>
                <input 
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full sm:w-1/2 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
                />
              </div>

            </div>

          </form>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
          <button 
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            form="create-task-form"
            className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition-colors"
          >
            Create Task
          </button>
        </div>

      </div>
    </div>
  );
}