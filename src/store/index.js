import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    newToDo: '',
    allToDos: [],
  },

  mutations: {

    SET_NEW_TODO(state, newTodo) {
      state.newToDo = newTodo;
    },

    SUBIT_TO_ALL_TODO(state, currentTodo) {

      if (state.allToDos.length > 0) {
        state.allToDos.unshift({ todoId: state.allToDos.length + 1, todoName: currentTodo, completeStatus: false })
      } else {
        state.allToDos.push(
          { todoId: 1, todoName: currentTodo, completeStatus: false }
        );
      }
    },

    CHANGE_TODO_STATUS(state, checkDataArr) {

      let allTodosArr = state.allToDos;

      allTodosArr.forEach((todo) => checkDataArr.forEach((checkTodo) => {
        if (todo.todoId === checkTodo.todoId) {
          todo.completeStatus = !todo.completeStatus;
        }
      }
      ));

      [...state.allToDos, ...checkDataArr];

    },

    DELETE_TODO(state, rowdata) {

      const allTodos = state.allToDos;
      let filteredTodo = allTodos.filter((todo) => todo.todoId !== rowdata.todoId);
      // console.log('after-delete-finalTodoArray', filteredTodo);
      this.state.allToDos = filteredTodo;
    },

  },

  actions: {

    setNewToDo(state, newTodo) {
      state.commit("SET_NEW_TODO", newTodo);
    },

    submitToDo(state, currentTodo) {
      state.commit("SUBIT_TO_ALL_TODO", currentTodo);
    },

    changeToDoStatus(state, checkDataArr) {
      state.commit("CHANGE_TODO_STATUS", checkDataArr);
    },

    deleteToDo(state, rowdata) {
      state.commit("DELETE_TODO", rowdata);
    },

  },

  modules: {},

  getters: {
    getNewTaskName: state => state.newToDo,
    getAllTodos: state => state.allToDos,
  }

})
