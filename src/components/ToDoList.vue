<template>
  <div>
    <el-row>
      <el-col :xs="24" :sm="24" :md="23" :lg="22" :xl="22" :offset="1">
        <el-table
          :data="
            tableData.filter(
              (data) =>
                !search ||
                data.todoName.toLowerCase().includes(search.toLowerCase())
            )
          "
          @selection-change="handleSelectionChange"
          style="width: 100%"
        >
          <el-table-column type="selection" width="55"> </el-table-column>

          <el-table-column label="Name" prop="todoName">
            <template slot-scope="scope">
              <div
                v-if="
                  rowDataEditable && scope.row.todoId === selectedRowData.todoId
                "
              >
                <el-input
                  v-model="scope.row.todoName"
                  size="small"
                  @blur="$emit('blur-input')"
                  @keyup.enter="$emit('enter-input')"
                />
              </div>
              <div v-else-if="scope.row.completeStatus == true">
                <span class="taskCompleted">{{ scope.row.todoName }}</span>
              </div>
              <div v-else>
                <span>{{ scope.row.todoName }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="Status" prop="completeStatus">
            <template slot-scope="scope">
              <div v-if="scope.row.completeStatus == true">
                <span class="">Complete</span>
              </div>
              <div v-else>
                <span class="">Incomplete</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              {{ (scope = "") }}
              <el-input
                v-model="search"
                size="mini"
                placeholder="Type to search"
              />
            </template>
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                ><span
                  v-if="
                    rowDataEditable &&
                      scope.row.todoId === selectedRowData.todoId
                  "
                  >Update</span
                ><span v-else>Edit</span></el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >Delete</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :xs="24" :sm="24" :md="23" :lg="22" :xl="22" :offset="1" />

      <el-dialog
        title="Delete Confirmation"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
        class="text-left"
      >
        <h1 class="text-center">
          Are you want to delete {{ selectedRowData.todoName }}?
        </h1>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="handleDeleteConfirm"
            >Confirm</el-button
          >
        </span>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      search: "",
      multipleSelection: [],
      selectedRowIndex: 0,
      selectedRowData: {},
      rowDataEditable: false,
      dialogVisible: false,
    };
  },

  methods: {
    ...mapActions({
      deleteTodo: "deleteToDo",
      changeTodoStatus: "changeToDoStatus",
    }),

    handleSelectionChange(val) {
      // console.log("check-value", val);
      this.multipleSelection.push(val);
      this.changeTodoStatus(val);
    },

    handleEdit(index, row) {
      console.log(index, row);
      this.selectedRowData = row;
      this.rowDataEditable = !this.rowDataEditable;
    },
    handleDelete(index, row) {
      console.log("selected", index, row);
      this.selectedRowIndex = index;
      this.selectedRowData = row;
      this.dialogVisible = true;
    },

    handleDeleteConfirm() {
      this.dialogVisible = false;
      this.deleteTodo(this.selectedRowData);
    },

    handleClose(done) {
      this.$confirm("Are you sure to close this dialog?")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
  },
  computed: {
    ...mapGetters({ tableData: "getAllTodos", getCheckTodos: "getCheckTodos" }),
  },

  mounted() {
    this.multipleSelection.push(this.getCheckTodos);
  },
};
</script>

<style>
.text-center {
  text-align: center;
}
.text-left {
  text-align: left;
}
.taskCompleted {
  text-decoration: line-through;
}
</style>
