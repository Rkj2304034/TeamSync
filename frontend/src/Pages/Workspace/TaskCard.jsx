import React from "react";
import { Calendar } from "lucide-react";
import { Badge } from "./Badge";

export default function TaskCard({ task, isSelected, onClick }) {
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

    const formatDate = (date) => {
    if (!date) return "No Due Date";

    return new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

    return (
        <div
            onClick={onClick}
            className={ `flex flex-col gap-5 bg-white border rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                isSelected
                    ? "border-blue-500 ring-2 ring-blue-200 shadow-md"
                    : "border-gray-200 hover:border-blue-300 hover:shadow-md"
            }`}
        >


            <div className="flex justify-between items-start gap-3">
                <h3 className="text-base font-semibold text-gray-900 leading-5">
                    {task.title}
                </h3>

                <Badge variant={getPriorityColor(task.priority)}>
                    {task.priority}
                </Badge>
            </div>



            
            <div className="mt-5 flex justify-between items-center">

                <div className="flex items-center gap-2  text-[13px] ">
                    Assigned To : {task?.assignedTo.name}
                </div>



                {/* Due Date */}
                <div
                    className={`flex items-center gap-1 text-xs font-medium ${
                        task.priority === "High"
                            ? "text-red-600"
                            : "text-gray-500"
                    }`}
                >
                    <Calendar size={14} />
                    {formatDate(task.dueDate)}
                </div>
            </div>
        </div>
    );
}