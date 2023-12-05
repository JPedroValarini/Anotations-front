<template>
  <div class="d-flex flex-column align-items-center" style="margin-top: 150px">
    <i
      class="bi bi-paperclip text-secondary"
      style="font-size: 5rem; transform: rotate(225deg)"
    ></i>
    <span class="text-primary" style="font-size: 2rem; font-weight: 500"
      >Anotações</span
    >
    <span class="text-secondary" style="font-size: 1rem"> by Speedio</span>
    <button
      @click="redirectToCreateNote"
      class="btn btn-primary btn-lg mt-5 rounded-button"
      style="font-size: 18px"
    >
      <span class="mx-3"> + Criar Anotação </span>
    </button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    redirectToCreateNote() {
      this.$router.push("/create-note");
    },
  },
};
</script>

<style>
.rounded-form {
  border-radius: 15px !important;
}

.rounded-button {
  border-radius: 30px !important;
}

.selected {
  border: 1px solid #28a745;
  border-radius: 5px;
  padding: 5px;
}
</style>
