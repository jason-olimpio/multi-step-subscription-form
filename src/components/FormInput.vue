<script setup lang="ts">
type Props = {
  modelValue: string
  label: string
  type?: string
  placeholder?: string
  error?: string
}

defineProps<Props>()
defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="form-control w-full">
    <label class="label mb-1">
      <span class="label-text text-primary">{{ label }}</span>
    </label>

    <input :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :type="type || 'text'" :placeholder="placeholder" :class="[
        'input input-bordered border-gray-200 rounded-xl w-full bg-white',
        'text-gray-600 mb-1 focus:outline-none focus:ring-0 focus:border-gray-300',
        error && 'input-error'
      ]" />

    <span v-if="error" class="text-error text-sm">{{ error }}</span>
  </div>
</template>

<style lang="css" scoped>
input.input:-webkit-autofill,
input.input:-webkit-autofill:hover,
input.input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0 1000px #ffffff inset;
  box-shadow: 0 0 0 1000px #ffffff inset;
  -webkit-text-fill-color: #4b5563;
}
</style>