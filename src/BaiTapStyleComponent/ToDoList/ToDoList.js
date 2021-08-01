import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import { Container } from "../Components/Container";
import { Dropdown } from "../Components/Dropdown";
import { Hr, TextField } from "../Components/TextField";
import { Button } from "../Components/Button";
import { Table, Tr, Thead, Th } from "../Components/Table";
import { Heading3 } from "../Components/Heading";
import { THEMES } from "../Themes/themeManagement";

import { connect } from "react-redux";
import {
  addTaskAction,
  changeThemeAction,
  completeTaskAction,
  deleteTaskAction,
  editTaskAction,
  updateTaskAction,
} from "../../redux/actions/toDoListActions";

class ToDoList extends Component {
  state = {
    taskName: "",
    taskEdit: null,
    isEdit: false
  };

  static getDerivedStateFromProps(props, state) {
    if (props.taskEdit?.id !== state.taskEdit?.id) {
      console.log(state)
      return {
        ...state,
        taskEdit: props.taskEdit,
        taskName: props.taskEdit?.taskName,
        isEdit: state.taskName === ""
      };
    }
    return state;
  }

  renderTaskToDo = () => {
    return this.props.taskList
      .filter((task) => !task.completed)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th>{task.taskName}</Th>
            <Th className="text-right">
              <Button
                className="mr-2"
                onClick={() => {
                  this.props.dispatch(editTaskAction(task));
                }}
              >
                <i className="fa fa-edit"></i>
              </Button>
              <Button
                className="mr-2"
                onClick={() => {
                  task.completed = true;
                  this.props.dispatch(completeTaskAction(task));
                }}
              >
                <i className="fa fa-check"></i>
              </Button>
              <Button
                onClick={() => {
                  this.props.dispatch(deleteTaskAction(task));
                }}
              >
                <i className="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };

  renderTaskCompleted = () => {
    return this.props.taskList
      .filter((task) => task.completed)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th>{task.taskName}</Th>
            <Th className="text-right">
              <Button
                onClick={() => {
                  this.props.dispatch(deleteTaskAction(task));
                }}
              >
                <i className="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };

  renderThemeOptions = () => {
    return THEMES.map((theme, index) => {
      return (
        <option key={index} value={theme.id}>
          {theme.name}
        </option>
      );
    });
  };

  render() {
    return (
      <ThemeProvider theme={this.props.themeToDoApp}>
        <Container className="w-50">
          <Dropdown
            onChange={(e) => {
              const themeID = e.target.value;

              this.props.dispatch(changeThemeAction(themeID));
            }}
          >
            {this.renderThemeOptions()}
          </Dropdown>
          <Heading3>To Do List</Heading3>
          <TextField
            label="Task name"
            className="w-50"
            onChange={(e) => {
              this.setState({
                taskName: e.target.value,
              });
            }}
            value={this.state.taskName}
          ></TextField>
          <Button
            className="ml-2"
            disabled={this.state.isEdit}
            onClick={() => {
              let { taskName } = this.state;

              let newTask = {
                id: Date.now(),
                taskName: taskName,
                completed: false,
              };
              this.props.dispatch(addTaskAction(newTask));
              this.setState({
                taskName: "",
              });
            }}
          >
            <i className="fa fa-plus mr-2"></i>
            Add task
          </Button>
          <Button
            className="ml-2"
            disabled={!this.state.isEdit}
            onClick={() => {
              this.props.dispatch(updateTaskAction(this.state.taskName));
            }}
          >
            <i className="fa fa-upload mr-2"></i>Update task
          </Button>

          <Hr />

          <Heading3>Task to do</Heading3>
          <Table>
            <Thead>{this.renderTaskToDo()}</Thead>
          </Table>

          <Heading3>Task completed</Heading3>
          <Table>
            <Thead>{this.renderTaskCompleted()}</Thead>
          </Table>
        </Container>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    themeToDoApp: state.toDoListReducer.themeToDoApp,
    taskList: state.toDoListReducer.taskList,
    taskEdit: state.toDoListReducer.taskEdit,
  };
};

export default connect(mapStateToProps)(ToDoList);
