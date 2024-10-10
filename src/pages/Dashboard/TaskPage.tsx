import DisplayButton from "@/components/button/DisplayButton";
import TaskCard from "@/components/card/TaskCard";
import CreateTaskForm from "@/components/forms/CreateTaskForm";
import Modal from "@/components/modal/Modal";
import { fetchTask } from "@/redux/features/getTaskSlice";
import { RootState } from "@/redux/root";
import { AppDispatch } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { GrTextAlignFull } from "react-icons/gr";
import { MdAttachment } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Users } from "@/data/data.json";
import EditTaskForm from "@/components/forms/EditTaskForm";

interface Task {
  id: number;
  title: string;
  priority: string;
  status: string;
  assigned_to: string;
  created_at: string;
  deadline: string;
  description: string;
  owner_id: number;
}

interface TaskState {
  data: Task[] | null;
  success: boolean;
  error: string | null;
  loading: boolean;
}

interface TaskColumnProps {
  title: string;
  bgColor: string;
  tasks: Task[];
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "text-green-500"; // Green color for High
    case "Medium":
      return "text-yellow-500"; // Yellow color for Medium
    case "Low":
      return "text-red-500"; // Red color for Low
    default:
      return "text-gray-500"; // Default color if not matched
  }
};

const getUserLabel = (id: string) => {
  const user = Users.find((user) => user.value === String(id));
  return user
    ? `${user?.lastname?.charAt(0)}${user?.firstname?.charAt(0)}`
    : "Unknown User";
};

const TaskColumn: React.FC<TaskColumnProps> = React.memo(
  ({ title, bgColor, tasks }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const toggleModal = () => setModalOpen(!modalOpen);
    const toggleEditModal = () => setModalEdit(!modalEdit);

    const handleEditClick = (task: Task) => {
      setSelectedTask(task); // Set the selected task
      toggleEditModal(); // Open the edit modal
    };

    return (
      <div className="bg-white h-[500px] w-[300px] rounded-md p-2 overflow-y-auto custom__scrollbar">
        <div
          className={`flex justify-between items-center p-2 rounded-md sticky top-1 z-10 ${bgColor}`}
        >
          <p className="flex capitalize font-semibold ">{title}</p>
          <span className="cursor-pointer">
            <BsThreeDots size={30} />
          </span>
        </div>
        <div className="mt-2 flex flex-col gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              subtitle={
                <span className={getPriorityColor(task.priority)}>
                  {task.priority}
                </span>
              }
              mainIcon={
                <BsThreeDots size={20} onClick={() => handleEditClick(task)} />
              }
              actionIcons={[
                <GrTextAlignFull size={20} key="1" />,
                <FaRegComment size={20} key="2" />,
                <MdAttachment size={20} key="3" />,
              ]}
              assignee={getUserLabel(task.assigned_to)}
            />
          ))}
          <Modal isOpen={modalEdit} onClose={toggleEditModal}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold">Edit task</h2>
              <button
                className="bg-primary text-white py-2 px-4 rounded"
                onClick={toggleEditModal}
              >
                Close
              </button>
            </div>

            {selectedTask && <EditTaskForm task={selectedTask} />}
          </Modal>
        </div>

        <div className="border mt-3 rounded-md">
          <DisplayButton
            onClick={toggleModal}
            title="Add Task"
            image={<AiOutlinePlus />}
          />
          <Modal isOpen={modalOpen} onClose={toggleModal}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold">Create Task</h2>
              <button
                className="bg-primary text-white py-2 px-4 rounded"
                onClick={toggleModal}
              >
                Close
              </button>
            </div>

            <CreateTaskForm />
          </Modal>
        </div>
      </div>
    );
  }
);

const TaskPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTask());
  }, [dispatch]);

  const { data: tasks, loading: isLoading } = useSelector(
    (state: RootState) => state.getTask as TaskState
  );

  const taskArray = tasks || [];
  console.log(taskArray);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const tasksByStatus = {
    toDo: taskArray.filter((task) => task.status === "To Do"),
    inProgress: taskArray.filter((task) => task.status === "In Progress"),
    complete: taskArray.filter((task) => task.status === "Completed"),
    blocked: taskArray.filter((task) => task.status === "Blocked"),
  };

  const columns = [
    {
      title: "To Do",
      bgColor: "bg-primary",
      tasks: tasksByStatus.toDo,
    },
    {
      title: "In Progress",
      bgColor: "bg-yellow-500",
      tasks: tasksByStatus.inProgress,
    },
    {
      title: "Completed",
      bgColor: "bg-green-500",
      tasks: tasksByStatus.complete,
    },
    {
      title: "Blocked",
      bgColor: "bg-red-500",
      tasks: tasksByStatus.blocked,
    },
  ];

  return (
    <div className="flex gap-3">
      {columns.map((column, index) => (
        <TaskColumn
          key={index}
          title={column.title}
          bgColor={column.bgColor}
          tasks={column.tasks}
        />
      ))}
    </div>
  );
};

export default TaskPage;
