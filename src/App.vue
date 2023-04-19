<template>
  <main>
    <!-- Header -->
    <header>
      <img src="@/assets/pinia-logo.svg" alt="pinia logo" />
      <h1>Pinia ToDo List</h1>
      <!-- Task Input -->
      <div class="new-task-form">
        <task-form />
      </div>
    </header>

    <nav class="filter">
      <button @click="filtertask = 'all'">All Tasks</button>
      <button @click="filtertask = 'fav'">Favorite Tasks</button>
    </nav>

    <div v-if="taskStore.loading" class="loading">Loading Tasks...</div>

    <!-- Task List -->

    <div class="task-list" v-if="filtertask === 'all'">
      <p>You have total {{ taskStore.totalCount }} Tasks Pending</p>
      <div v-for="task in taskStore.tasks" :key="task">
        <TaskDetails :task="task" />
      </div>
    </div>

    <div class="task-list" v-if="filtertask === 'fav'">
      <p>You have {{ taskStore.favCount }} Favorite Tasks Pending</p>
      <div v-for="task in taskStore.favs" :key="task">
        <TaskDetails :task="task" />
      </div>
    </div>
  </main>
</template>

<script>
import { useTaskStore } from "@/store/taskStore";
import TaskDetails from "./components/TaskDetails.vue";
import { ref } from "vue";
import TaskForm from "./components/TaskForm.vue";
export default {
  components: {
    TaskDetails,
    TaskForm,
  },
  setup() {
    const taskStore = useTaskStore();
    taskStore.getTasks();
    const filtertask = ref("all");
    return {
      filtertask,
      taskStore,
    };
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;800&family=VT323&display=swap");

body {
  background: #f2f2f2;
  color: #444;
  margin: 0;
}
body * {
  font-family: "Poppins";
}

/* header */
header {
  text-align: center;
  background: darkorange;
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
header img {
  max-width: 60px;
  transform: rotate(-10deg);
}
header h1 {
  margin: 0;
  font-size: 2em;
  padding-top: 25px;
  margin-left: 15px;
  color: #777;
  transform: rotate(2deg);
}

.task-list {
  max-width: 640px;
  margin: 0 auto;
}
.filter {
  max-width: 640px;
  margin: 20px auto;
  text-align: right;
}
.filter button {
  display: inline-block;
  margin-left: 10px;
  background: #fff;
  border: 2px solid #555;
  border-radius: 4px;
  padding: 6px;
  cursor: pointer;
  font-size: 1em;
}
.new-task-form {
  max-width: 640px;
  margin: 20px auto;
}
.loading {
  max-width: 640px;
  border: 1px solid #ffd859;
  color: #3a3a3a;
  padding: 5px 0;
  text-align: center;
  margin: 30px auto;
}
</style>
