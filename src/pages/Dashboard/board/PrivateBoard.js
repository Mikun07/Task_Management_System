import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeTask } from "@/redux/features/deleteTaskSlice";
import toast from "react-hot-toast";
import { fetchAllUser } from "@/redux/features/getAllUserSlice";
import OptionButton from "@/components/button/OptionButton";
import { DragDropContext, Draggable, Droppable, } from "react-beautiful-dnd";
import TaskCard from "@/components/card/TaskCard";
import { GrTextAlignFull } from "react-icons/gr";
import Modal from "@/components/modal/Modal";
import EditTaskForm from "@/components/forms/EditTaskForm";
import PreviewForm from "@/components/forms/PreviewForm";
import { fetchInviteTasks } from "@/redux/features/getInviteTaskSlice";
// import CreateTaskForm from "@/components/forms/CreateTaskForm";
import { AiOutlineLeft, AiOutlinePlus } from "react-icons/ai";
// import DisplayButton from "@/components/button/DisplayButton";
import { BASE_URL } from "@/config/api";
import { userToken } from "@/config/auth";
import { fetchUser } from "@/redux/features/getUserSlice";
import DisplayButton from "@/components/button/DisplayButton";
import InviteCreateTaskForm from "@/components/forms/InviteCreateTaskForm";
// Helper function to get priority color based on the task's priority
const getPriorityColor = (priority) => {
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
// TaskColumn component that supports drag-and-drop
const TaskColumn = React.memo(({ title, bgColor, tasks, columnId, board }) => {
    // Now you can use the board object inside the component
    const isAdminOrTeamLeader = board?.board_role === "admin" || board?.board_role === "teamLeader";
    const [modalEdit, setModalEdit] = useState(false); // State for edit task modal
    const [modalPreview, setModalPreview] = useState(false); // State for preview modal
    const [modalDelete, setModalDelete] = useState(false); // State for preview modal
    const [selectedTask, setSelectedTask] = useState(null); // The task selected for editing/previewing
    const dispatch = useDispatch();
    // Toggle modal visibility functions
    const toggleEditModal = () => setModalEdit(!modalEdit);
    const togglePreviewModal = () => setModalPreview(!modalPreview);
    const toggleDeleteModal = () => setModalDelete(!modalDelete);
    // Handles the click to edit a task, opens the edit modal
    const handleEditClick = (task) => {
        // console.log("Editing task:", task); // Log the task information
        setSelectedTask(task); // Store the selected task
        toggleEditModal(); // Open the edit modal
    };
    // Handles the click to preview a task, opens the preview modal
    const handlePreviewClick = (task) => {
        // console.log("Previewing task:", task); // Log the task information
        setSelectedTask(task);
        togglePreviewModal();
    };
    const handleDeleteClick = (task) => {
        // console.log("Deleting task:", task);
        setSelectedTask(task);
        toggleDeleteModal();
    };
    const TaskDelete = async (task) => {
        const deleteTaskData = { id: task.id };
        try {
            const result = await dispatch(removeTask(deleteTaskData));
            const { payload } = result;
            if (payload?.status === 204) {
                toast.success("Task Deleted");
                window.location.reload();
                toast.success("Task Deleted");
            }
            else {
                toast.error(payload?.detail);
            }
        }
        catch (err) {
            toast.error("Error deleting task:", err); // Log the error
        }
    };
    useEffect(() => {
        dispatch(fetchAllUser());
        dispatch(fetchUser());
    }, [dispatch]);
    const { data: allUser = [] } = useSelector((state) => state?.getAllUser || { data: [], loading: false });
    const getUserLabels = (assignedUsers, allUsers) => {
        if (!assignedUsers || assignedUsers.length === 0) {
            return "N/A"; // No users assigned
        }
        return assignedUsers
            .map((assignedUser) => {
            // Find the user in allUser by matching the user_id
            const user = allUsers.find((u) => u.id === assignedUser.user_id);
            if (user) {
                // Get first and last initials from the matched user
                const firstInitial = user.first_name ? user.first_name[0] : "";
                const lastInitial = user.last_name ? user.last_name[0] : "";
                return `${lastInitial}${firstInitial}`;
            }
            return ""; // Return empty string if no user found
        })
            .filter((initials) => initials) // Filter out empty initials
            .join(", "); // Join initials with commas if there are multiple users
    };
    const columnOptions = [
        { label: "Edit", onClick: () => toast.success("Edited") },
        { label: "Delete", onClick: () => toast.success("Deleted") },
    ];
    return (_jsxs("div", { className: "bg-white h-[500px] w-[300px] rounded-md p-2 overflow-y-auto custom__scrollbar", children: [_jsxs("div", { className: `flex justify-between items-center p-2 rounded-md sticky top-1 z-10 ${bgColor}`, children: [_jsx("p", { className: "flex capitalize font-semibold ", children: title }), _jsx(OptionButton, { options: columnOptions })] }), _jsx(Droppable, { droppableId: columnId, children: (provided) => (_jsxs("div", { className: "mt-2 flex flex-col gap-4", ...provided.droppableProps, ref: provided.innerRef, children: [" ", tasks.map((task, index) => {
                            return (_jsx(Draggable, { draggableId: String(task.id), index: index, children: (provided) => {
                                    const options = [
                                        { label: "Edit", onClick: () => handleEditClick(task) },
                                        {
                                            label: "Delete",
                                            onClick: () => handleDeleteClick(task),
                                        },
                                    ];
                                    return (_jsx("div", { ref: provided.innerRef, ...provided.draggableProps, ...provided.dragHandleProps, children: _jsx(TaskCard, { title: task.title, subtitle: _jsx("span", { className: getPriorityColor(task.priority), children: task.priority }), mainIcon: isAdminOrTeamLeader ? (_jsx(OptionButton, { options: options })) : null, actionIcons: [
                                                _jsx(GrTextAlignFull, { size: 20, onClick: () => handlePreviewClick(task) }, "1"),
                                                // <FaRegComment size={20} key="2" />,
                                                // <MdAttachment size={20} key="3" />,
                                            ], assignee: getUserLabels(task.assigned, allUser) }) }));
                                } }, task.id));
                        }), provided.placeholder] })) }), _jsxs(Modal, { isOpen: modalEdit, onClose: toggleEditModal, children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsx("h2", { className: "text-xl font-semibold", children: "Edit task" }), _jsx("button", { className: "bg-primary text-white py-2 px-4 rounded", onClick: toggleEditModal, children: "Close" })] }), selectedTask && (_jsx(EditTaskForm, { onClose: toggleEditModal, task: selectedTask }))] }), _jsxs(Modal, { isOpen: modalPreview, onClose: togglePreviewModal, children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsx("h2", { className: "text-xl font-semibold", children: "Preview" }), _jsx("button", { className: "bg-primary text-white py-2 px-4 rounded", onClick: togglePreviewModal, children: "Close" })] }), selectedTask && _jsx(PreviewForm, { data: selectedTask })] }), _jsx(Modal, { isOpen: modalDelete, onClose: toggleDeleteModal, children: _jsxs("div", { className: "flex flex-col gap-14 items-center justify-center", children: [_jsx("h2", { className: "text-xl font-semibold capitalize", children: "are you sure??" }), _jsxs("div", { className: "flex items-center gap-16", children: [_jsx("button", { className: "bg-red-500 text-white py-2 px-4 rounded", onClick: () => {
                                        if (selectedTask) {
                                            TaskDelete(selectedTask); // Pass the selected task to the delete function
                                        }
                                    }, children: "Delete" }), _jsx("button", { className: "bg-transparent border-2 border-red-500 text-red-500 py-2 px-4 rounded", onClick: toggleDeleteModal, children: "Cancel" })] })] }) })] }));
});
const PrivateBoardPage = () => {
    const location = useLocation();
    const board = location.state?.board;
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false); // State for add task modal
    const [taskList, setTaskList] = useState([]); // Initialize with an empty array
    const { data: tasks, loading: isLoading = [] } = useSelector((state) => state?.getInviteTask);
    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);
    // const { data: user } = useSelector((state: RootState) => state.getUser) as {
    //   data: User;
    // };
    useEffect(() => {
        if (board?.invited_by_id) {
            dispatch(fetchInviteTasks(board.invited_by_id)); // Pass invited_by_id to the thunk
        }
    }, [board?.invited_by_id, dispatch]);
    useEffect(() => {
        if (tasks) {
            setTaskList(tasks); // Set taskList only when tasks are fetched
        }
    }, [tasks]);
    if (isLoading) {
        return _jsx("div", { children: "Loading..." });
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
                    Authorization: `Bearer ${userToken || JSON.parse(localStorage.getItem("userToken"))}`, // Set the Authorization header directly in the headers object
                },
                body: JSON.stringify(editTaskData),
            });
            return response;
        }
        catch (error) {
            return error?.response?.data?.error;
        }
    };
    const onDragStart = (start) => {
        const draggedTaskId = start.draggableId;
        // Find the task by its ID
        const draggedTask = taskList.find((task) => String(task.id) === draggedTaskId);
        if (draggedTask) {
            // console.log("Selected task before dragging:", draggedTask);
        }
    };
    const onDragEnd = async (result) => {
        const { source, destination } = result;
        // Check if the destination is null (dropped outside)
        if (!destination)
            return;
        // Check if the item was dropped in the same position
        if (source.droppableId === destination.droppableId &&
            source.index === destination.index) {
            return; // No change in position
        }
        // Get source and destination columns based on their IDs
        const sourceColumnTasks = tasksByStatus[source.droppableId];
        const destinationColumnTasks = tasksByStatus[destination.droppableId];
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
        // Update the task list in the state, ensuring we update all affected columns
        setTaskList((prevTaskList) => {
            return prevTaskList.map((task) => (task.id === updatedTask.id ? updatedTask : task) // Update only the moved task
            );
        });
        // Update the task in the backend
        await handleEditTask(updatedTask);
    };
    // Function to map droppable IDs to task statuses
    const mapDroppableIdToStatus = (droppableId) => {
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
    function goBack() {
        window.history.back();
    }
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "flex flex-row  justify-between", children: _jsxs("div", { className: "flex gap-3 my-1", children: [_jsx("button", { className: "bg-white p-1 px-4 rounded-md font-bold items-center justify-center flex text-primaryGray", onClick: goBack, children: _jsx(AiOutlineLeft, { size: 20 }) }), (board?.board_role === "admin" ||
                            board?.board_role === "teamLeader") && (_jsxs("div", { children: [_jsx(DisplayButton, { onClick: toggleModal, title: "Add Task", image: _jsx(AiOutlinePlus, {}) }), _jsxs(Modal, { isOpen: modalOpen, onClose: toggleModal, children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsx("h2", { className: "text-xl font-semibold", children: "Create Task" }), _jsx("button", { className: "bg-primary text-white py-2 px-4 rounded", onClick: toggleModal, children: "Close" })] }), _jsx(InviteCreateTaskForm, { invited_by_id: board?.invited_by_id, onClose: toggleModal })] })] }))] }) }), _jsx(DragDropContext, { onDragStart: onDragStart, onDragEnd: onDragEnd, children: _jsx("div", { className: "flex gap-3", children: columns.map((column, index) => (_jsx(TaskColumn, { title: column.title, bgColor: column.bgColor, tasks: column.tasks, columnId: column.columnId, board: board }, index))) }) })] }));
};
export default PrivateBoardPage;
