import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    loading: false,
  }),
  getters: {
    favs() {
      return this.tasks.filter((task) => task.isFav);
    },
    favCount() {
      return this.tasks.reduce((previousCount, currentTask) => {
        return currentTask.isFav ? previousCount + 1 : previousCount;
      }, 0);
    },
    totalCount: (state) => state.tasks.length,
  },
  actions: {
    async getTasks() {
      this.loading = true;
      const response = await fetch("http://localhost:3000/tasks");
      const data = await response.json();
      this.tasks = data;
      this.loading = false;
    },
    async addTask(task) {
      this.tasks.push(task);
      await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      });
    },
    async deleteTask(id) {
      this.tasks = this.tasks.filter((t) => t.id !== id);
      await fetch("http://localhost:3000/tasks/" + id, {
        method: "DELETE",
      });
    },
    async toggleFav(id) {
      const task = this.tasks.find((t) => t.id === id);
      task.isFav = !task.isFav;
      await fetch("http://localhost:3000/tasks/" + id, {
        method: "PATCH",
        body: JSON.stringify({ isFav: task.isFav }),
        headers: { "Content-Type": "application/json" },
      });
    },
  },
});
