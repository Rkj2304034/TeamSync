import React from "react";
import { MoreVertical } from "lucide-react";

export default function MemberTab({ members }) {
    return (
        <main className="flex-1 bg-[#fcfcfc] overflow-y-auto p-8">

            <div className="max-w-8xl mx-auto">

                {/* Heading */}

                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Members ({members.length})
                </h2>

                {/* Member List */}

                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

                    {members.map((member, index) => (

                        <div
                            key={member.user}
                            className={`grid grid-cols-[2.5fr_1fr_2fr_auto] items-center px-6 py-5 transition-colors hover:bg-gray-50 ${index !== members.length - 1
                                    ? "border-b border-gray-100"
                                    : ""
                                }`}
                        >

                            {/* Member */}

                            <h3 className="text-gray-900 font-semibold">
                                        {member.user.name}
                                    </h3>

                            {/* Email */}

                            <div className="text-sm text-gray-500">
                                {member.user.email}
                            </div>



                            {/* Role */}

                            <div>

                                {member.role === "Lead" ? (

                                    <span className="px-3 py-1 rounded-md text-xs font-semibold bg-indigo-100 text-indigo-700">
                                        Lead
                                    </span>

                                ) : (

                                    <span className="px-3 py-1 rounded-md text-xs font-semibold bg-blue-100 text-blue-700">
                                        Member
                                    </span>

                                )}

                            </div>


                            {/* Actions */}

                            {member.role === "Lead" ? (

                                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">

                                    <MoreVertical className="w-5 h-5 text-gray-500" />

                                </button>

                            ) : (

                                <div></div>

                            )}

                        </div>

                    ))}

                </div>

            </div>

        </main>
    );
}