<template>
  <div class="todo-container todo-wrap">
    <my-header @addToDo="addToDo" />
    <my-list :todos="todos" />
    <my-footer
      :todos="todos"
      :checkAllTodo="checkAllTodo"
      :clearAllTodo="clearAllTodo"
    />
  </div>
</template>
<script>
import MyHeader from "./MyHeader.vue";
import MyList from "./MyList.vue";
import MyFooter from "./MyFooter.vue";
export default {
  name: "PageOne",
  components: {
    MyHeader,
    MyList,
    MyFooter,
  },
  data() {
    return {
      todos: JSON.parse(localStorage.getItem("todos")) || [],
    };
  },
  methods: {
    // 添加todo
    addToDo(todoObj) {
      this.todos.unshift(todoObj);
    },
    // 勾选or取消todo
    checkTodo(id) {
      this.todos.forEach((todo) => {
        if (todo.id === id) todo.done = !todo.done;
      });
    },
    deleteTodo(id) {
      this.todos = this.todos.filter((todo) => {
        return todo.id !== id;
      });
    },
    // 全选or取消全选
    checkAllTodo(done) {
      this.todos.forEach((todo) => {
        todo.done = done;
        console.log("全部done");
      });
    },
    // 清除已完成的
    clearAllTodo() {
      this.todos = this.todos.filter((todo) => {
        return !todo.done;
      });
      console.log("clear!");
    },
    updateTodo(id, title) {
      this.todos.forEach((todo) => {
        if (todo.id === id) todo.title = title;
      });
    },
  },
  mounted() {
    this.$bus.$on("checkTodo", this.checkTodo);
    this.$bus.$on("deleteTodo", this.deleteTodo);
    this.$bus.$on("updateTodo", this.updateTodo);
  },
  beforeDestroy() {
    this.$bus.$off("checkTodo");
    this.$bus.$off("deleteTodo");
    this.$bus.$off("updateTodo");
  },
  watch: {
    todos: {
      deep: true,
      immediate: true,
      handler(value) {
        localStorage.setItem("todos", JSON.stringify(value));
      },
    },
  },
};
</script>
<style>
body {
  background: #fff;
}
.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}
.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}
.btn-edit {
  color: #fff;
  background-color: skyblue;
  border: 1px solid rgb(112, 201, 236);
  margin-right: 5px;
}
.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}
.btn:focus {
  outline: none;
}
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>