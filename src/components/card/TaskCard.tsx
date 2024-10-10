import React from "react";

interface TaskCardProps {
  title: string;
  subtitle: JSX.Element;
  mainIcon: React.ReactNode;
  actionIcons: React.ReactNode[];
  assignee: string;
}

const TaskCard: React.FC<TaskCardProps> = React.memo(
  ({ title, subtitle, mainIcon, actionIcons, assignee }) => {
    return (
      <div className="bg-white rounded-md border-[1px] shadow-md p-2 relative">
        <div className="flex justify-between p-2 pb-3 border-b-2">
          <div>
            <h2 className="flex capitalize font-semibold">{title}</h2>
            <p className="flex capitalize font-semibold">{subtitle}</p>
          </div>
          <span className="cursor-pointer">{mainIcon}</span>
        </div>

        <div className="flex justify-between p-2 pt-3">
          <div className="flex gap-5 cursor-pointer">
            {actionIcons.map((icon, index) => (
              <span key={index}>{icon}</span>
            ))}
          </div>
          <div className="h-7 w-7 bg-primary text-white rounded-full flex items-center justify-center text-sm text">
            <p className="font-medium">{assignee}</p>
          </div>
        </div>
      </div>
    );
  }
);

export default TaskCard;
