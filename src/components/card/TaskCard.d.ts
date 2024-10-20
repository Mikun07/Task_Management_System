import React from "react";
interface TaskCardProps {
    title: string;
    subtitle: JSX.Element;
    mainIcon: React.ReactNode;
    actionIcons: React.ReactNode[];
    assignee: string;
}
declare const TaskCard: React.FC<TaskCardProps>;
export default TaskCard;
