<script setup lang="ts">
import { computed } from 'vue'
import { formData } from '../composables/useForm'
import { getPlanPrice, getAddOnPrice, getBillingPeriod, getAddOnName } from '../composables/usePlans'

const totalAddOnsPrice = computed(() => formData.addOns.reduce((sum, id) => sum + (getAddOnPrice(id, formData.billing) || 0), 0))

const totalPrice = computed(() => (getPlanPrice(formData.plan, formData.billing) || 0) + totalAddOnsPrice.value)

const emit = defineEmits<{
  (event: 'goToStep', stepIndex: number): void
}>()
</script>

<template>
  <div class="flex flex-col gap-4">
    <div>
      <h2 class="text-3xl font-bold text-primary mb-2">Finishing up</h2>
      <p class="text-gray-500">
        Double checking everything looks OK before confirming.
      </p>
    </div>
    <div class="w-full bg-gray-100 rounded-lg p-6 mt-6">
      <div class="flex justify-between items-center"
        :class="{ 'border-b border-gray-300 pb-4': formData.addOns.length > 0 }">
        <div class="flex flex-col">
          <span class="capitalize font-bold text-primary">
            {{ formData.plan }} ({{ formData.billing }})
          </span>

          <span class="underline text-gray-400 cursor-pointer" @click="emit('goToStep', 1)">
            Change
          </span>
        </div>

        <span class="font-bold text-primary">
          ${{ getPlanPrice(formData.plan, formData.billing) }}{{ getBillingPeriod(formData.billing) }}
        </span>
      </div>

      <div v-for="addOnId in formData.addOns" :key="addOnId" class="flex justify-between text-sm mt-3">
        <span class="text-gray-400">{{ getAddOnName(addOnId) }}</span>
        <span class="text-primary">
          +${{ getAddOnPrice(addOnId, formData.billing) }}{{ getBillingPeriod(formData.billing) }}
        </span>
      </div>
    </div>

    <div class="flex justify-between items-center m-4">
      <span class="text-gray-400">Total (per {{ formData.billing === 'monthly' ? 'month' : 'year' }})</span>
      <span class="text-xl font-bold text-primary">${{ totalPrice }}{{ getBillingPeriod(formData.billing) }}</span>
    </div>
  </div>
</template>
