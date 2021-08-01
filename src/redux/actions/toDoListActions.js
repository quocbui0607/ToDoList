import { TYPES } from "../types/toDoListTypes";

export const addTaskAction = (newTask) => ({
    type: TYPES.ADD_TASK,
    newTask
})

export const changeThemeAction = (themeID) => ({
    type: TYPES.CHANGE_THEME,
    themeID
})

export const completeTaskAction = (task) => ({
    type: TYPES.COMPLETE_TASK,
    task
})

export const deleteTaskAction = (deleteTask) => ({
    type: TYPES.DELETE_TASK,
    deleteTask
})

export const editTaskAction = (editTask) => ({
    type: TYPES.EDIT_TASK,
    editTask
})

export const updateTaskAction = (taskName) => ({
    type: TYPES.UPDATE_TASK,
    taskName
})



