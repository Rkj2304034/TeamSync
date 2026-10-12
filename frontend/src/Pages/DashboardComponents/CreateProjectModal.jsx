import React, { useState, useEffect } from 'react';
import { X, Users, Shield, Plus, Trash2, AlignLeft, Type } from 'lucide-react';
import api from '../../api/axios';



export default function CreateProjectModal({ setShowCreateProject ,onCreateProject }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [membersToAdd, setMembersToAdd] = useState([]);
      const [userToAdd, setUserToAdd] = useState('');
      const [roleToAdd, setRoleToAdd] = useState('Member');
      const [allUsers,setAllUsers] = useState([]);

    // Prevent background scrolling
    
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    const getAllUsers = async() => {
        try{
            const res = await api.get("/api/auth/allUsers");

            if(res.data.success){
                console.log( "othres",res.data.others)
                setAllUsers(res.data.others);
            }
        }
        catch(error){
            console.log(error)
        }
    }   

    useEffect(() => {
        getAllUsers();
    },[])



      const handleAddMember = (e) => {
        e.preventDefault();

        const newUser = allUsers?.find(user => user._id == userToAdd)
        const newObj  =  {user : newUser, role : roleToAdd}
        setMembersToAdd(prev => [
            ...prev , newObj
        ])

        // reset values
        setUserToAdd("");

      };



      const handleRemoveMember = (userId) => {
        setMembersToAdd(membersToAdd.filter(m => m.user._id.toString() !== userId.toString()));
      };

      const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) {
          alert("Project title is required");
          return;
        }

        // Format data to match your Mongoose schema exactly
        const projectData = {
          title,
          description,
          members: membersToAdd
          // createdBy will usually be handled by your backend auth token
        };

        onCreateProject(projectData);
        setShowCreateProject(false);
      };

    // const handleSubmit = () => {

    // }

    return (
        <div className="fixed inset-0 z-50 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6" onClick={(e) => e.target === e.currentTarget && setShowCreateProject(false)}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h2 className="text-xl font-bold text-gray-900">Create New Project</h2>
                    <button onClick={() => setShowCreateProject(false)} className="text-gray-400 hover:text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>



                <div className="flex-1 overflow-y-auto p-8">
                    <form id="project-form" onSubmit={handleSubmit} className="space-y-8">

                        {/* Title & Description */}
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                                    Project Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Website Redesign"
                                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                                />
                            </div>


                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={description}
                                    required
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="What is the main goal of this project?"
                                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px] resize-y transition-shadow"
                                />
                            </div>
                        </div>



                        <hr className="border-gray-100" />


                         <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Users className="w-5 h-5 text-gray-500" />
                                <h3 className="font-semibold text-gray-900">Project Members</h3>
                            </div>

                             <div className="flex gap-3 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <select
                                    value={userToAdd}
                                    onChange={(e) => setUserToAdd(e.target.value)}
                                    className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="" disabled>Select user...</option>
                                    {allUsers.filter(u => !membersToAdd.find(m => m.user._id === u._id)).map(user => (
                                        <option key={user._id} value={user._id}>{user.name} ({user.email})</option>
                                    ))}
                                </select>

                                <select
                                    value={roleToAdd}
                                    onChange={(e) => setRoleToAdd(e.target.value)}
                                    className="w-32 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Member">Member</option>
                                    <option value="Lead">Lead</option>
                                </select>

                                <button
                                    type="button"
                                    onClick={handleAddMember}
                                    disabled={!userToAdd}
                                    className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
                                >
                                    <Plus className="w-4 h-4" /> Add
                                </button>
                            </div> 


                             <div className="space-y-2">
    {membersToAdd.length === 0 ? (
        <div className="text-center py-6 text-sm text-gray-500 border border-dashed border-gray-300 rounded-lg">
            No members added yet.
        </div>
    ) : (
        membersToAdd.map((member) => (
            <div
                key={member.user._id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white"
            >
                {/* Left Side - Avatar, Name & Email */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-base font-bold">
                        {member.user.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex flex-col">
                        <span className="font-medium text-sm text-gray-900">
                            {member.user.name}
                        </span>

                        <span className="text-xs text-gray-500">
                            {member.user.email}
                        </span>
                    </div>
                </div>

                {/* Right Side - Role & Remove */}
                <div className="flex items-center gap-4">
                    <span
                        className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md ${
                            member.role === "Lead"
                                ? "bg-indigo-50 text-indigo-700"
                                : "bg-gray-100 text-gray-600"
                        }`}
                    >
                        {member.role === "Lead" && (
                            <Shield className="w-3 h-3" />
                        )}
                        {member.role}
                    </span>

                    <button
                        type="button"
                        onClick={() => handleRemoveMember(member.user._id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        ))
    )}
</div>
                        </div> 

                    </form>
                </div>

                {/* Footer Actions */}
                <div className="px-8 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
                    <button
                        type="button"
                        onClick={() => setShowCreateProject(false)}
                        className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="project-form"
                        className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition-colors"
                    >
                        Create Project
                    </button>
                </div>

            </div>
        </div>
    );
}