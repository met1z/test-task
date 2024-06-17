import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useInputsStore = defineStore('inputs', () => {
  const inputs = ref<(string | undefined)[]>([undefined, undefined, undefined])
  const search = ref<string | undefined>(undefined)

  const searchMatches = computed(() => {
    if (!search.value) return false
    for (const item of inputs.value) {
      if (!item) continue
      if (item.toLowerCase().includes(search.value.toLowerCase().trim())) return true
    }
    return false
  })

  function addInput() {
    inputs.value.push(undefined)
  }

  function updateInput(index: number, value: string | undefined) {
    inputs.value[index] = value
  }

  function removeInput(index: number) {
    inputs.value.splice(index, 1)
  }

  return { inputs, search, searchMatches, addInput, updateInput, removeInput }
})
