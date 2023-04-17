<template>
  <div class="task">
    <header>{{ task.title }}</header>
    <div class="icons">
      <i class="material-icons" @click="handleDelete(task.id)"> delete</i>
      <i
        class="material-icons"
        :class="{ active: task.isFav }"
        @click="addFavourite(task.id)"
      >
        favorite</i
      >
    </div>
  </div>
</template>

<script>
import { useTaskStore } from "@/store/taskStore";
export default {
  props: ["task"],
  setup() {
    const taskStore = useTaskStore();

    const addFavourite = (id) => {
      taskStore.toggleFav(id);
    };
    const handleDelete = (id) => {
      taskStore.deleteTask(id);
    };
    return {
      taskStore,
      handleDelete,
      addFavourite,
    };
  },
};
</script>
<style scoped>
.task {
  padding: 6px 20px;
  background: #fff;
  margin-top: 20px;
  border-radius: 4px;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.task h3,
.task.icons {
  display: inline-block;
}
.task.icons {
  text-align: right;
}
.task i {
  font-size: 1.4em;
  margin-left: 6px;
  color: #bbb;
  cursor: pointer;
}
.task i.active {
  color: darkorange;
}
</style>
