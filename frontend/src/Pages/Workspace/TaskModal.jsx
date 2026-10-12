import React, { useState, useEffect } from 'react';
import { X, Calendar, ChevronDown, AlignLeft, MessageSquare, Send, Tag, User, AlertCircle, Edit2 } from 'lucide-react';
import { Badge } from './Badge'


export default function TaskModal({
  task,
  onClose,
  onUpdateTask,
  userRole
}) {
  const [newComment, setNewComment] = useState("");
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [tempTask , setTempTask ] = useState(null);

  useEffect(() => {
    setTempTask(task);
  },[task])

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "red";
      case "Medium":
        return "yellow";
      case "Low":
        return "green";
      default:
        return "gray";
    }
  };

  // Prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);



  if (!task) return null;

  const handleChange = (e) => {
    setTempTask({...tempTask , [e.target.name] : e.target.value })
  }

  const handleSaveChanges= (e) => {
    
    const updatedTask = {...tempTask, [e.target.name] : e.target.value }

    onUpdateTask(task._id,updatedTask)
    setTempTask(updatedTask)
    setIsEditingDesc(false);
  }

 

  return (

    <div
      className="fixed inset-0 z-50 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >


      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-scroll animate-in fade-in zoom-in-95 duration-200">



        {/* Header - Fixed Alignment */}
        <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-start shrink-0">

          <div className="flex  gap-3  items-center ">
            <h2 className="text-2xl font-bold text-gray-900">{tempTask?.title}</h2>
            <Badge variant={getPriorityColor(tempTask?.priority)} children={tempTask?.priority} />
          </div>


          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 p-2 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>




        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto flex flex-col md:flex-row">

          {/* Main Content (Left Side) */}
          <div className="flex-1 p-8 border-r border-gray-100 flex flex-col">

            {/* Description Section with Lead Edit Permissions */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">


                <div className="flex items-center gap-2 text-gray-900 font-semibold text-lg">
                  <AlignLeft className="w-5 h-5 text-gray-500" />
                  <h3>Description</h3>
                </div>
                {userRole == 'Lead' && !isEditingDesc && (
                  <button
                    onClick={() => setIsEditingDesc(true)}
                    className="text-sm flex items-center gap-1.5 text-gray-500 hover:text-gray-900 px-2 py-1 rounded hover:bg-gray-50 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                )}
              </div>



              {isEditingDesc ? (

                <div className="space-y-3">
                  <textarea
                    autoFocus
                    className="w-full text-gray-700 text-sm leading-relaxed bg-white p-4 rounded-xl border-2 border-blue-500 min-h-[120px] focus:outline-none resize-y"
                    name = "description"
                    value={tempTask?.description}
                    onChange={handleChange}
                  />

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setIsEditingDesc(false)}
                      className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveChanges}
                      className="px-3 py-1.5 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-md"
                    >
                      Save
                    </button>

                  </div>
                </div>

              ) : (
                <div className="text-gray-700 text-sm leading-relaxed bg-gray-50/50 p-5 rounded-xl border border-gray-100 min-h-[120px]">
                  {tempTask?.description || <span className="text-gray-400 italic">No description provided.</span>}
                </div>
              )}


            </div>

            {/* Comments Section (Restored & Pinned to bottom of flow) */}


            {/* <div className="flex flex-col flex-1">
              
              <div className="flex items-center gap-2 mb-4 text-gray-900 font-semibold text-lg">
                <MessageSquare className="w-5 h-5 text-gray-500" />
                <h3>Activity</h3>
              </div>


              <div className="space-y-4 mb-6 flex-1">
                {task.comments?.length > 0 ? (
                  task.comments.map((comment, idx) => (
                    <div key={idx} className="flex gap-3">
                      <img src={comment.authorAvatar} alt="" className="w-8 h-8 rounded-full border border-gray-200 mt-1" />
                      <div className="flex-1 bg-gray-50 border border-gray-100 p-3.5 rounded-lg">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-semibold text-sm text-gray-900">{comment.authorName}</span>
                          <span className="text-xs text-gray-400">{comment.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-700">{comment.text}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 italic">No activity yet.</p>
                )}
              </div>


              <form onSubmit={handlePostComment} className="flex gap-3 items-start mt-auto pt-4 border-t border-gray-100">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">
                  You
                </div>
                <div className="flex-1 relative">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full border border-gray-200 bg-gray-50 focus:bg-white rounded-lg p-3 pr-12 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none min-h-[80px] transition-all"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handlePostComment(e);
                      }
                    }}
                  />
                  <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="absolute bottom-3 right-3 p-1.5 bg-blue-600 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div> */}
          </div>

          {/* Properties Sidebar (Right Side) with RBAC logic */}
          <div className="w-full md:w-[320px] bg-gray-50/30 p-8 shrink-0">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">Properties</h4>

            <div className="space-y-6">

              {/* STATUS: Members can't see/select Completed */}
              <div>

                <label className="block text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-gray-400" /> Status
                </label>


                <div className="relative">
                  <select
                    name="status"
                    value={tempTask?.status}
                    onChange={ handleSaveChanges}
                    className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-medium hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-sm"
                  >
                    <option value="Todo">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="In Review">In Review</option>
                    {userRole === 'Lead' && <option value="Completed">Completed</option>}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>


              </div>



              {/* PRIORITY: Dropdown for Lead, Text for Member */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-gray-400" /> Priority
                </label>
                {userRole === 'Lead' ? (
                  <div className="relative">
                    <select
                      value={tempTask?.priority}
                      onChange={handleSaveChanges}
                      name='priority'
                      className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-medium hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-sm"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                ) : (
                  <div className="w-full bg-gray-100/50 border border-transparent rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700">
                    {tempTask?.priority || 'Low'}
                  </div>
                )}
              </div>

              {/* ASSIGNEE: Dropdown for Lead, Text/Read-only for Member */}
              <div className="w-full flex items-center gap-2 bg-gray-100/50 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700">
                    Assigned To:  {' '}
                    {tempTask?.assignedTo?.name}
                  </div>

              <div>
  <label className="block text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1.5">
    <Calendar className="w-4 h-4 text-gray-400" />
    Due Date
  </label>

  <input
    type="date"
    name="dueDate"
    value={
      tempTask?.dueDate
        ? new Date(tempTask.dueDate).toISOString().split("T")[0]
        : ""
    }
    onChange={userRole === "Lead" ? handleSaveChanges : undefined}
    disabled={userRole !== "Lead"}
    className={`w-full rounded-lg px-3 py-2.5 text-sm font-medium border transition-all
      ${
        userRole === "Lead"
          ? "bg-white border-gray-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          : "bg-gray-100 text-gray-600 border-gray-200 cursor-not-allowed"
      }`}
  />
</div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}