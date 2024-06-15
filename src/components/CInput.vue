<script lang="ts" setup>
withDefaults(
  defineProps<{
    modelValue: string | undefined | null
    selected?: boolean
    withRemove?: boolean
  }>(),
  {
    selected: false,
    withRemove: false,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | undefined): void
  (e: 'remove'): void
}>()

const updateModel = (v: string) => {
  if (!v || !v.length) emit('update:modelValue', undefined)
  else emit('update:modelValue', v)
}
</script>

<template>
  <div class="input-box">
    <input
      :value="modelValue"
      @input="(v) => updateModel((v.target as HTMLInputElement).value)"
      placeholder="Input text"
      :class="{ 'input-selected': selected }"
    />
    <button v-if="withRemove" class="input-box-button" name="remove" type="button" @click="emit('remove')">
      Remove
    </button>
  </div>
</template>

<style lang="scss" scoped>
.input-box {
  display: flex;
  align-items: center;
  gap: 1rem;

  input {
    display: flex;
    flex: 1;
    padding: 8px;
    outline: none;
  }

  .input-selected {
    background-color: lightgreen;
  }

  .input-box-button {
    padding: 0.25rem 1rem;

    color: red;
    background-color: white;
    border-color: red;
  }
}
</style>
