<template>
  <form @submit.prevent="handleSubmit">
    <input
      type="text"
      name=""
      id=""
      placeholder="Enter Task"
      v-model="newTaskName"
    />
    <button>Add Task</button>
    // For Resetting the Store
    <button class="reset-button" @click="taskStore.$reset">Reset</button>
  </form>
</template>

<script>
import { useTaskStore } from "@/store/taskStore";
import { ref } from "vue";
export default {
  setup() {
    const taskStore = useTaskStore();
    const newTaskName = ref("");
    const handleSubmit = () => {
      if (newTaskName.value.length > 0) {
        taskStore.addTask({
          title: newTaskName.value,
          isFav: false,
          id: Math.floor(Math.random() * 10000),
        });
        newTaskName.value = "";
      }
    };
    return {
      newTaskName,
      handleSubmit,
    };
  },
};
</script>
<style scoped>
form {
  display: flex;
  justify-content: space-between;
}
form input {
  width: 400px;
  line-height: 24px;
}
form button {
  width: 100px;
  margin-left: 16px;
  display: inline-block;
  background: #fff;
  border: 2px solid #555;
  border-radius: 4px;
  padding: 6px;
  cursor: pointer;
  font-size: 1em;
  background: gold;
}
</style>
