<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

import CInput from './components/CInput.vue'
import { useInputsStore } from './stores/inputs'

const inputStore = useInputsStore()
const { inputs, search, searchMatches } = storeToRefs(inputStore)

const msg = ref<string | undefined>(undefined)

const countVowel = (v?: string) => {
  if (!v) return 0
  else {
    const vowels = ['a', 'e', 'i', 'o', 'u']
    const lowered = v.toLowerCase()

    return Array.from(lowered).reduce((c, char) => (vowels.includes(char) ? c + 1 : c), 0)
  }
}

const checkItemMatch = (v?: string) => {
  if (!v || !search.value) return false
  else return v.includes(search.value.trim())
}

const validateInputs = (v: 'add' | 'remove', index?: number) => {
  if (msg.value) return
  if (v === 'add' && inputs.value.length === 10) {
    msg.value = 'Can not be added more than 10 inputs'
    setTimeout(() => (msg.value = undefined), 2000)
    return
  } else if (v === 'remove' && inputs.value.length === 1) {
    msg.value = 'Last item can not be removed'
    setTimeout(() => (msg.value = undefined), 2000)
    return
  } else if (v === 'add') inputStore.addInput()
  else if (v === 'remove' && index != null) inputStore.removeInput(index)
}
</script>

<template>
  <main class="main-block">
    <div class="input-block">
      <h3>Search input</h3>
      <CInput v-model="search" :selected="searchMatches" />
      <div v-for="(item, index) in inputs" :key="index">
        <label>Number of vowel: {{ countVowel(item) }}</label>
        <CInput
          :model-value="item"
          :selected="checkItemMatch(item)"
          with-remove
          @update:model-value="(v) => inputStore.updateInput(index, v)"
          @remove="validateInputs('remove', index)"
        />
      </div>
      <button name="Add item" type="button" class="add-item-button" @click="validateInputs('add')">Add item</button>
    </div>
    <div v-if="msg" class="snackbar">{{ msg }}</div>
  </main>
</template>

<style scoped lang="scss">
.snackbar {
  position: absolute;
  top: 8px;
  padding: 8px;
  background-color: white;
  border: 1px solid grey;
}

.main-block {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .input-block {
    display: flex;
    flex-direction: column;
    gap: 16px;

    width: 370px;

    .input-block-search {
      width: 100%;
    }

    .add-item-button {
      padding: 0.25rem 2rem;

      color: blue;
      background-color: white;
      border-color: blue;
    }
  }
}
</style>
