import React, { useState } from "react";
import { ChevronDown, Plus, BriefcaseBusiness } from "lucide-react";

export default function Header({
    project,
    role,
    selectedTab,
    setSelectedTab,
    onCreateTaskClick,
    onInviteMemberClick
}) {
    const [showDes, setShowDes] = useState(false);

    return (
        <header className="bg-white border-b border-gray-200 px-8 pt-8">

            {/* ================= Header ================= */}

            <div className="flex justify-between items-start">

                {/* Left Side */}
                <div className="flex items-start gap-5">

                    {/* Project Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm">
                        <BriefcaseBusiness className="w-6 h-6 text-white" />
                    </div>

                    {/* Project Details */}
                    <div className="max-w-3xl">

                        <h1 className="text-3xl font-bold text-gray-900">
                            {project?.title}
                        </h1>

                        <div className="flex items-center gap-3 mt-2">

                            <span className="px-2 py-1 rounded-lg bg-indigo-100 text-indigo-700 text-[12px] font-semibold">
                                {role}
                            </span>


                            <span className="text-gray-600 font-medium flex items-center gap-1">
                            <span className="text-gray-500  text-[12px] ">•</span>
                                {project?.members?.length || 0} Members
                            </span>

                        </div>

                        {/* Description Toggle */}

                        <button
                            onClick={() => setShowDes(!showDes)}
                            className="mt-6 flex items-center gap-2 text-[12px] text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                        >
                            About this project

                            <ChevronDown
                                className={`w-5 h-5 transition-transform duration-300 ${showDes ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        {/* Description */}

                        <div
                            className={`overflow-hidden transition-all duration-300 ${showDes ? "max-h-40 mt-3" : "max-h-0"
                                }`}
                        >
                            <p className="text-gray-600 leading-7 text-[15px]">
                                {project?.description}
                            </p>
                        </div>

                    </div>
                </div>

                {/* Right Side */}

                {role === "Lead" && (
                    <div className="flex gap-3">

                        <button onClick={onCreateTaskClick} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white px-4 py-2 rounded-xl font-medium shadow-sm">
                            <Plus size={18} />
                            Create Task
                        </button>

                        <button onClick={onInviteMemberClick} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white px-4 py-2 rounded-xl font-medium shadow-sm">
                            <Plus size={18} />
                            Invite Member
                        </button>

                    </div>
                )}
            </div>

            {/* ================= Tabs ================= */}

            <nav className="mt-8 flex gap-10">

                <button
                    onClick={() => setSelectedTab("tasks")}
                    className={`pb-4 text-sm font-semibold transition-colors ${selectedTab === "tasks"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    Tasks
                </button>

                <button
                    onClick={() => setSelectedTab("members")}
                    className={`pb-4 text-sm font-semibold transition-colors ${selectedTab === "members"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    Members
                </button>

                

            </nav>

        </header>
    );
}