<template>
  <div>
    <div v-for="note in notes" :key="note.id" class="note-card rounded-form" style="background-color: #f7f7f7;">
      <div class="note-content">
        <i class="bi bi-paperclip" @click="goToCreateNote"></i>
        <div>
          <h5 class="note-title">{{ note.title }}</h5>
          <p class="note-reminder">{{ formatDate(note.reminder_date) }}</p>
        </div>
      </div>
      <div class="note-actions">
        <i class="bi bi-trash" @click="openDeleteModal(note.id)"></i>
      </div>
    </div>

    <div v-if="isDeleteModalOpen" class="modal">
      <div class="modal-content">
        <div
          class="mb-3"
          style="
            border-bottom: var(--bs-modal-header-border-width) solid
              var(--bs-modal-header-border-color);
          "
        >
          <div class="mb-4">
            <span class="close" @click="closeDeleteModal">&times;</span>
          </div>
          <div class="mb-4">
            <h4>Deseja excluir esta anotação?</h4>
          </div>
        </div>
        <p>
          Você está prestes a deletar uma anotação e esta ação não poderá ser
          desfeita. <br />
          Tem certeza que deseja excluí-la?
        </p>

        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeDeleteModal">
            Cancelar
          </button>
          <button class="btn btn-danger" @click="confirmDeleteNote">
            Excluir
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="d-flex justify-content-start div-button">
    <button
      @click="redirectCreateNote"
      class="btn btn-primary btn-lg mt-3 rounded-button flex-grow-1 create-note-button"
      style="font-size: 18px"
    >
      <span class="mx-5"> + Criar Anotação </span>
    </button>
  </div>
</template>

<script>
import axios from "@/services/axios";

export default {
  data() {
    return {
      notes: [],
      isDeleteModalOpen: false,
      noteToDeleteId: null,
    };
  },
  created() {
    this.fetchNotes();
  },
  methods: {
    redirectCreateNote() {
      this.$router.push("/create-note");
    },
    goToCreateNote() {
      this.$router.push("/create-note");
    },
    async fetchNotes() {
      try {
        const response = await axios.get("/notes");

        if (response.status === 200) {
          this.notes = response.data;
        } else {
          console.error(
            "Erro ao obter notas. Resposta do servidor:",
            response.status
          );
        }
      } catch (error) {
        console.error("Erro ao obter notas:", error);
      }
    },
    formatDate(dateString) {
      const options = {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      const date = new Date(dateString);
      return date.toLocaleDateString("pt-BR", options);
    },
    openDeleteModal(noteId) {
      this.isDeleteModalOpen = true;
      this.noteToDeleteId = noteId;
    },
    closeDeleteModal() {
      this.isDeleteModalOpen = false;
      this.noteToDeleteId = null;
    },
    async confirmDeleteNote() {
      if (this.noteToDeleteId) {
        try {
          const response = await axios.delete(`/notes/${this.noteToDeleteId}`);

          if (response.status === 204) {
            this.fetchNotes();
          } else {
            console.error(
              "Erro ao excluir nota. Resposta do servidor:",
              response.status
            );
          }
        } catch (error) {
          console.error("Erro ao excluir nota:", error);
        } finally {
          this.closeDeleteModal();
        }
      }
    },
  },
};
</script>

<style>
.rounded-form {
  border-radius: 15px !important;
}

.note-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

.note-content {
  display: flex;
  align-items: center;
}

.note-content i {
  margin-right: 10px;
}

.note-title {
  text-decoration: underline;
  margin: 0;
}

.note-reminder {
  margin: 0;
}

.note-actions i {
  cursor: pointer;
  color: red;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  padding-top: 60px;
}

.modal-content {
  background-color: #fefefe;
  margin: 5% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.modal-footer {
  display: flex;
  margin-top: 20px;
}

.div-button {
  margin-top: 150px;
}

</style>
