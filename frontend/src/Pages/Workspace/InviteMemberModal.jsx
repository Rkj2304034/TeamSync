import React, { useState, useEffect } from 'react';
import { X, Mail, Link as LinkIcon, Shield, Plus, Trash2, Check, Copy } from 'lucide-react';
import api from '../../api/axios';

export default function InviteMemberModal({ project, onClose, onSendInvites }) {
    const [emailInput, setEmailInput] = useState('');
    const [selectedRole, setSelectedRole] = useState('Member');


    // Lock background scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

   

    const handleSubmit = async() => {
        
        try{

            const res = await api.post(`api/project/${project._id}/invite`, {
                email : emailInput,
                role : selectedRole
            })
            console.log(res)
            if(res.data.success){
                onClose();
            }

        }
        catch(error){
            console.log(error)
        }

    };

    return (
        <div className="fixed inset-0 z-50 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* NEW HEADER SECTION WITH PROJECT CONTEXT */}
                <div className="px-8 py-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-start shrink-0">
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-900">
                            Invite Team Members
                        </h2>



                        {/* Project Card */}
                        {project && (
                            <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3">
                                <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                                    Project
                                </p>

                                <h3 className="text-lg font-bold text-blue-900 mt-1">
                                    {project.title}
                                </h3>


                            </div>
                        )}
                    </div>

                    <button
                        onClick={onClose}
                        className="ml-6 text-gray-400 hover:text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Scrollable Body (Unchanged) */}
                <div className="flex-1 overflow-y-auto p-8">

                    {/* Invite Input Section */}
                    <form  className="mb-8">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                            <Mail className="w-4 h-4 text-gray-400" /> Email Address
                        </label>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="flex-1 relative">
                                <input
                                    type="email"
                                    value={emailInput}
                                    onChange={(e) => setEmailInput(e.target.value)}
                                    placeholder="name@company.com"
                                    className="w-full bg-white border border-gray-300 rounded-lg pl-4 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                                />
                            </div>


                            <select
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                                className="w-full sm:w-36 bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                            >
                                <option value="Member">Member</option>
                                <option value="Lead">Lead</option>
                            </select>

                            
                        </div>
                    </form>

                    
                </div>

                {/* Footer Actions */}
                <div className="px-8 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                    type='submit'
                        disabled={!emailInput}
                        onClick={handleSubmit}
                        className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 shadow-sm transition-colors flex items-center gap-2"
                    >
                        <Mail className="w-4 h-4" />
                        Invite
                    </button>
                </div>

            </div>
        </div>
    );
}