import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/root";
import { AppDispatch } from "@/redux/store";
import { fetchTask } from "@/redux/features/getTaskSlice";
import TaskCard from "@/components/card/TaskCard";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import Modal from "@/components/modal/Modal";
import EditTaskForm from "@/components/forms/EditTaskForm";
import PreviewForm from "@/components/forms/PreviewForm";
import DisplayButton from "@/components/button/DisplayButton";
import { AiOutlinePlus } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { GrTextAlignFull } from "react-icons/gr";
import { MdAttachment } from "react-icons/md";
import { Users } from "@/data/data.json";
import CreateTaskForm from "@/components/forms/CreateTaskForm";
import toast from "react-hot-toast";
import OptionButton from "@/components/button/OptionButton";
import { BASE_URL } from "@/config/api";
import { userToken } from "@/config/auth";

// Task interface
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

// Task state interface from Redux store
interface TaskState {
  data: Task[] | null;
  success: boolean;
  error: string | null;
  loading: boolean;
}

// TaskColumnProps for rendering task columns
interface TaskColumnProps {
  title: string;
  bgColor: string;
  tasks: Task[];
  columnId: string; // Each column will have an ID for DnD
}

// Helper function to get priority color based on the task's priority
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "text-green-500"; // High priority - green
    case "Medium":
      return "text-yellow-500"; // Medium priority - yellow
    case "Low":
      return "text-red-500"; // Low priority - red
    default:
      return "text-gray-500"; // Default gray
  }
};

// Helper function to get user's initials based on their ID
const getUserLabel = (id: string) => {
  const user = Users.find((user) => user.value === String(id));
  return user
    ? `${user?.lastname?.charAt(0)}${user?.firstname?.charAt(0)}` // Show user's initials
    : "Unknown User"; // Fallback if no user is found
};

// TaskColumn component that supports drag-and-drop
const TaskColumn: React.FC<TaskColumnProps> = React.memo(
  ({ title, bgColor, tasks, columnId }) => {
    const [modalEdit, setModalEdit] = useState(false); // State for edit task modal
    const [modalPreview, setModalPreview] = useState(false); // State for preview modal
    const [selectedTask, setSelectedTask] = useState<Task | null>(null); // The task selected for editing/previewing

    // Toggle modal visibility functions
    const toggleEditModal = () => setModalEdit(!modalEdit);
    const togglePreviewModal = () => setModalPreview(!modalPreview);

    // Handles the click to edit a task, opens the edit modal
    const handleEditClick = (task: Task) => {
      console.log("Editing task:", task); // Log the task information
      setSelectedTask(task); // Store the selected task
      toggleEditModal(); // Open the edit modal
    };

    // Handles the click to preview a task, opens the preview modal
    const handlePreviewClick = (task: Task) => {
      console.log("Previewing task:", task); // Log the task information
      setSelectedTask(task);
      togglePreviewModal();
    };

    const columnOptions = [
      { label: "Edit", onClick: () => toast.success("Edited") },
      { label: "Delete", onClick: () => toast.success("Deleted") },
    ];

    return (
      <div className="bg-white h-[500px] w-[300px] rounded-md p-2 overflow-y-auto custom__scrollbar">
        <div
          className={`flex justify-between items-center p-2 rounded-md sticky top-1 z-10 ${bgColor}`}
        >
          <p className="flex capitalize font-semibold ">{title}</p>
          <OptionButton options={columnOptions} />
        </div>

        {/* Droppable container for tasks within the column */}
        <Droppable droppableId={columnId}>
          {(provided) => (
            <div
              className="mt-2 flex flex-col gap-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.map((task, index) => (
                // Each task is draggable
                <Draggable
                  key={task.id}
                  draggableId={String(task.id)} // Ensure this is unique for each task
                  index={index}
                >
                  {(provided) => {
                    // Move options definition inside the map function
                    const options = [
                      { label: "Edit", onClick: () => handleEditClick(task) },
                      {
                        label: "Delete",
                        onClick: () => console.log("Option 2 clicked"),
                      },
                      // Add more options as needed
                    ];

                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskCard
                          title={task.title}
                          subtitle={
                            <span className={getPriorityColor(task.priority)}>
                              {task.priority}
                            </span>
                          }
                          mainIcon={
                            <OptionButton options={options} /> // Now properly placed
                          }
                          actionIcons={[
                            <GrTextAlignFull
                              size={20}
                              key="1"
                              onClick={() => handlePreviewClick(task)}
                            />,
                            <FaRegComment size={20} key="2" />,
                            <MdAttachment size={20} key="3" />,
                          ]}
                          assignee={getUserLabel(task.assigned_to)} // Display assignee's initials
                        />
                      </div>
                    );
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* Edit Task Modal */}
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

        {/* Preview Task Modal */}
        <Modal isOpen={modalPreview} onClose={togglePreviewModal}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold">Preview</h2>
            <button
              className="bg-primary text-white py-2 px-4 rounded"
              onClick={togglePreviewModal}
            >
              Close
            </button>
          </div>
          {selectedTask && <PreviewForm data={selectedTask} />}
        </Modal>
      </div>
    );
  }
);

// Main component for the TaskPage
const TaskPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false); // State for add task modal
  const [taskList, setTaskList] = useState<Task[]>([]); // Initialize with an empty array

  const dispatch = useDispatch<AppDispatch>();

  // Extract tasks from Redux store
  const { data: tasks, loading: isLoading } = useSelector(
    (state: RootState) => state.getTask as TaskState
  );

  useEffect(() => {
    const fetchTasks = async () => {
      await dispatch(fetchTask());
    };

    fetchTasks();
  }, [dispatch]);

  useEffect(() => {
    if (tasks) {
      setTaskList(tasks); // Set taskList only when tasks are fetched
    }
  }, [tasks]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const tasksByStatus = {
    toDo: taskList.filter((task) => task.status === "To Do"),
    inProgress: taskList.filter((task) => task.status === "In Progress"),
    complete: taskList.filter((task) => task.status === "Completed"),
    blocked: taskList.filter((task) => task.status === "Blocked"),
  };

  const columns = [
    {
      title: "To Do",
      bgColor: "bg-primary",
      tasks: tasksByStatus.toDo,
      columnId: "toDo",
    },
    {
      title: "In Progress",
      bgColor: "bg-yellow-500",
      tasks: tasksByStatus.inProgress,
      columnId: "inProgress",
    },
    {
      title: "Completed",
      bgColor: "bg-green-500",
      tasks: tasksByStatus.complete,
      columnId: "complete",
    },
    {
      title: "Blocked",
      bgColor: "bg-red-500",
      tasks: tasksByStatus.blocked,
      columnId: "blocked",
    },
  ];

  // Add this to the TaskPage component
  const handleEditTask = async (editTaskData) => {
    try {
      const response = await fetch(`${BASE_URL}/tasks/${editTaskData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            userToken || JSON.parse(localStorage.getItem("userToken"))
          }`, // Set the Authorization header directly in the headers object
        },
        body: JSON.stringify(editTaskData),
      });
      return response;
    } catch (error) {
      return error?.response?.data?.error;
    }
  };

  const onDragStart = (start: { draggableId: string }) => {
    const draggedTaskId = start.draggableId;

    // Find the task by its ID
    const draggedTask = taskList.find(
      (task) => String(task.id) === draggedTaskId
    );

    if (draggedTask) {
      // console.log("Selected task before dragging:", draggedTask);
    }
  };

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;

    // Check if the destination is null (dropped outside)
    if (!destination) return;

    // Check if the item was dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return; // No change in position
    }

    // Get source and destination columns based on their IDs
    const sourceColumnTasks =
      tasksByStatus[source.droppableId as keyof typeof tasksByStatus];
    const destinationColumnTasks =
      tasksByStatus[destination.droppableId as keyof typeof tasksByStatus];

    // Get the task being moved
    const taskToMove = sourceColumnTasks[source.index];

    // Log the task being moved before updating
    // console.log(
    //   `Task being moved: ID = ${taskToMove.id}, Title = ${taskToMove.title}`
    // );

    // Remove the task from the source column
    const updatedSourceColumnTasks = [...sourceColumnTasks];
    updatedSourceColumnTasks.splice(source.index, 1); // Remove from the original column

    // Update the task's status if it was moved to a different column
    const updatedTask = {
      ...taskToMove,
      status: mapDroppableIdToStatus(destination.droppableId),
    };

    // Add the task to the destination column at the correct index
    const updatedDestinationColumnTasks = [...destinationColumnTasks];
    updatedDestinationColumnTasks.splice(destination.index, 0, updatedTask); // Insert into new column

    // Log the task after moving
    // console.log(
    //   `Task after being moved: ID = ${updatedTask.id}, Title = ${updatedTask.title}`
    // );

    // Update the task list in the state, ensuring we update all affected columns
    setTaskList((prevTaskList) => {
      return prevTaskList.map(
        (task) => (task.id === updatedTask.id ? updatedTask : task) // Update only the moved task
      );
    });

    // Update the task in the backend
    await handleEditTask(updatedTask);
  };

  // Function to map droppable IDs to task statuses
  const mapDroppableIdToStatus = (droppableId: string): string => {
    switch (droppableId) {
      case "toDo":
        return "To Do";
      case "inProgress":
        return "In Progress";
      case "blocked":
        return "Blocked";
      case "complete":
        return "Completed";
      default:
        return "To Do"; // Fallback status (should not occur)
    }
  };

  const toggleModal = () => setModalOpen(!modalOpen);

  return (
    <>
      {/* Add Task Button and Modal */}
      <div className="my-1 rounded-md">
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

      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="flex gap-3">
          {columns.map((column, index) => (
            <TaskColumn
              key={index}
              title={column.title}
              bgColor={column.bgColor}
              tasks={column.tasks}
              columnId={column.columnId}
            />
          ))}
        </div>
      </DragDropContext>
    </>
  );
};

export default TaskPage;
