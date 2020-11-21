<template>
  <el-container>
    <el-header><span class="header-title"> To Do</span></el-header>
    <el-container>
      <el-aside>Side bar</el-aside>

      <el-main>
        <el-row>
          <el-col :span="24" class="m-t-40"></el-col>
        </el-row>

        <el-form
          @submit.native.prevent
          :model="taskForm"
          :rules="rules"
          ref="taskForm"
          class="demo-taskForm"
        >
          <el-row>
            <el-col :xs="21" :sm="21" :md="10" :lg="11" :xl="10" :offset="3">
              <div class="add-task-input">
                <el-form-item label="Task Name" prop="name">
                  <el-input
                    v-model="taskForm.name"
                    @change="changeTodo"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>

            <el-col :xs="24" :sm="24" :md="7" :lg="4" :xl="3">
              <el-form-item class="add-task-btn"
                ><br />
                <el-button
                  type="primary"
                  @click="submitForm('taskForm')"
                  icon="el-icon-plus"
                  >Create</el-button
                >
                <el-button @click="resetForm('taskForm')">Reset</el-button>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="10" :lg="6" :xl="8" />
          </el-row>
        </el-form>

        <ToDoList />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import ToDoList from "./ToDoList.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    ToDoList,
  },

  data() {
    return {
      taskForm: {
        name: "",
      },

      rules: {
        name: [
          {
            required: true,
            message: "Please a input task name.",
            trigger: "blur",
          },
          // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
        ],
      },
    };
  },

  methods: {
    ...mapActions({
      setNewTodo: "setNewToDo",
      submitTodo: "submitToDo",
    }),

    changeTodo(e) {
      console.log("this.taskForm.name", e);
      this.setNewTodo(e);
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitTodo(this.taskForm.name);
          this.resetForm("taskForm");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },

  computed: {
    ...mapGetters({ newTask: "getNewTaskName", allTodos: "getAllTodos" }),
  },

  mounted() {
    this.taskForm.name = this.newTask;
  },
};
</script>

<style>
.el-header {
  height: 52px !important;
  background-color: #409eff;
  color: #ffffff;
  line-height: 48px;
}
.header-title {
  font-size: 20px;
  vertical-align: middle;
  float: left;
  padding: 0px 28px;
}

.el-aside {
  background-color: #f4f4f4;
  color: #333;
  text-align: center;
  line-height: 200px;
  min-width: 0;
  max-width: 220px;
}

@media only screen and (max-width: 720px) {
  .el-aside {
    display: none;
  }
}

.el-main {
  background-color: #ffffff;
  color: #333;
}

.title-bar {
  font-size: 20px;
  color: #3e69e4;
  text-align: left;
}
.add-task-input {
  color: #4770dc;
  text-align: left;
}
.add-task-btn {
  text-align: left;
  margin-left: 0 important;
  float: right;
}
.m-t-40 {
  margin-top: 40px;
}
</style>
