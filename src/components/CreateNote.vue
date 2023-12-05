<template>
  <form @submit.prevent="saveNote">
    <div class="form-group m-3">
      <textarea
        class="form-control"
        id="description"
        v-model="description"
        placeholder="Exp.: Ao ligar falar com Luiza"
        rows="6"
      ></textarea>
    </div>

    <div class="form-group m-3">
      <label for="businessPotential" class="text-secondary mb-2 d-flex">
        Potencial de Negócio
      </label>
      <div class="input-group rounded-form">
        <div class="input-group-prepend">
          <div class="input-group-text">R$</div>
        </div>
        <input
          type="text"
          class="form-control rounded-form"
          id="businessPotential"
          v-model="businessPotential"
          pattern="\d+,\d{2}"
          @input="handleInput"
          placeholder="00,00"
        />
      </div>
    </div>

    <div class="form-group m-3">
      <label class="text-secondary mb-2 d-flex">Categorização</label>
      <div
        class="form-check form-check-inline"
        v-for="category in categoriesOptions"
        :key="category"
      >
        <input
          class="form-check-input"
          type="checkbox"
          :id="category"
          :value="category"
          v-model="selectedCategories"
        />
        <label class="form-check-label" :for="category">{{ category }}</label>
      </div>
    </div>

    <div class="form-group m-3">
      <label class="text-secondary mb-2 d-flex">Lembrete</label>
      <VueDatePicker
        :key="pickerKey"
        v-model="reminderDate"
        format="dd/MM/yyyy HH:mm"
        :show-time-picker="true"
      ></VueDatePicker>
    </div>

    <div class="d-flex justify-content-start m-3">
      <button
        type="button"
        class="btn btn-danger rounded-circle text-white mr-3 mt-3"
      >
        <i class="bi bi-trash"></i>
      </button>

      <button
        type="submit"
        class="btn btn-primary btn-lg mt-3 rounded-button flex-grow-1"
      >
        <span class="mx-5" style="font-size: 16px"> Salvar </span>
      </button>
    </div>
  </form>
</template>

<script>
import axios from "@/services/axios";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  components: { VueDatePicker },
  data() {
    return {
      categoriesOptions: ["Importante", "Urgente", "Baixa"],
      description: "",
      businessPotential: "",
      selectedCategories: [],
      reminderDate: new Date(),
      pickerKey: 0,
    };
  },
  methods: {
    handleInput() {
      this.businessPotential = this.businessPotential.replace(/[^\d,]/g, "");

      const parts = this.businessPotential.split(",");
      if (parts.length > 1) {
        parts[1] = parts[1].slice(0, 2);
        this.businessPotential = parts.join(",");
      }
    },
    async saveNote() {
      if (!this.description || !this.businessPotential) {
        console.error("Por favor, preencha todos os campos obrigatórios.");
        return;
      }

      try {
        const formattedCategories = this.selectedCategories.map(
          (category) => category
        );

        const response = await axios.post("/notes", {
          title: this.description,
          content: parseFloat(this.businessPotential.replace(",", ".")),
          categories: formattedCategories,
          reminder_date: this.reminderDate,
        });

        if (response.status === 200 || response.status === 201) {
          console.log("Nota salva:", response.data);

          this.$router.push("/list-note");
        } else {
          console.error(
            "Erro ao salvar nota. Resposta do servidor:",
            response.status
          );
        }
      } catch (error) {
        console.error("Erro ao salvar nota:", error);
      }
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
