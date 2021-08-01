import { THEMES } from "../../BaiTapStyleComponent/Themes/themeManagement";
import { TYPES } from "../types/toDoListTypes";

const initialState = {
  themeToDoApp: THEMES[0].theme,
  taskList: [
    { id: "1", taskName: "Clean the house", completed: false },
    { id: "2", taskName: "Complete this app", completed: true },
    { id: "3", taskName: "Pot the plants", completed: true },
    { id: "4", taskName: "Learn Node.js", completed: false },
    { id: "5", taskName: "Learn Angular", completed: false },
  ],
  taskEdit: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.ADD_TASK: {
      if (action.newTask.taskName.trim() === "") {
        alert("Task is required!");
        return { ...state };
      }

      let taskListUpdate = state.taskList;

      const index = taskListUpdate.findIndex(
        (task) =>
          task.taskName.toLowerCase() ===
          action.newTask.taskName.trim().toLowerCase()
      );
      if (index !== -1) {
        alert("Task existed!");
        return { ...state, taskEdit: { taskName: "" } };
      }

      state.taskList = [...taskListUpdate, action.newTask];
      return { ...state, taskEdit: { taskName: "" } };
    }

    case TYPES.CHANGE_THEME: {
      const selectedTheme = THEMES.find(
        (theme) => theme.id.toString() === action.themeID
      );
      state.themeToDoApp = { ...selectedTheme.theme };
      return { ...state };
    }

    case TYPES.COMPLETE_TASK: {
      state.taskList = [...state.taskList];
      return { ...state };
    }

    case TYPES.DELETE_TASK: {
      return {
        ...state,
        taskList: state.taskList.filter(
          (task) => task.id !== action.deleteTask.id
        ),
      };
    }

    case TYPES.EDIT_TASK: {
      return {
        ...state,
        taskEdit: action.editTask,
      };
    }

    case TYPES.UPDATE_TASK: {
      const taskListUpdate = [...state.taskList];
      const index = taskListUpdate.findIndex(
        (task) => task.id === state.taskEdit?.id
      );
      if (index !== -1) {
        taskListUpdate[index].taskName = action.taskName;
        state.taskEdit = { taskName: "" };
        state.taskList = taskListUpdate;
      }

      return {
        ...state,
      };
    }

    default:
      return { ...state };
  }
};
