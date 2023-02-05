<template>
  <div>
    <label class="typo__label"></label>
    <VueMultiselect
      v-model="value"
      :options="options"
      :multiple="true"
      :close-on-select="false"
      :clear-on-select="false"
      :preserve-search="true"
      placeholder="Pick a category"
      label="name"
      track-by="name"
      :preselect-first="true"
      @select="setFilter"
    >
      <template
        slot="selection"
        slot-scope="{ values, search, isOpen }"
        @input="setFilter"
        ><span class="multiselect__single" v-if="values.length" v-show="!isOpen"
          >{{ values.length }} options selected</span
        ></template
      >
    </VueMultiselect>
  </div>
</template>

<script>
import VueMultiselect from "vue-multiselect";
export default {
  components: {
    VueMultiselect,
  },
  emits: ["change-filter"],
  data() {
    return {
      value: [],
      options: [
        { name: "Love" },
        { name: "State of the Nation" },
        { name: "War and Travel" },
        { name: "Crime" },
        { name: "Comedy" },
        { name: "Family and Self" },
        { name: "Science Fiction and Fantasy" },
      ],
    };
  },
  methods: {
    setFilter(event) {
      console.log(this.value);
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style></style>
