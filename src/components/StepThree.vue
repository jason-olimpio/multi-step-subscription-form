<script setup lang="ts">
import { formData } from '../composables/useForm'
import { addOns, getAddOnPrice, getBillingPeriod } from '../composables/usePlans'
</script>

<template>
  <div class="flex flex-col gap-4">
    <div>
      <h2 class="text-2xl font-bold text-primary">Pick add-ons</h2>
      <p class="text-gray-500 mb-4 mt-2">Add-ons help enhance your gaming experience.</p>
    </div>

    <div class="space-y-3">
      <div v-for="addOn in addOns" :key="addOn.id" class="form-control border border-primary p-4 rounded-lg">
        <label class="label cursor-pointer flex items-center gap-4">
          <input type="checkbox" class="checkbox checkbox-primary checkbox-sm"
            :checked="formData.addOns.includes(addOn.id)" @change="
              formData.addOns = formData.addOns.includes(addOn.id)
                ? formData.addOns.filter(id => id !== addOn.id)
                : [...formData.addOns, addOn.id]
              " />

          <div class="flex flex-col flex-1">
            <span class="label-text text-primary">{{ addOn.name }}</span>
            <span class="label-text text-gray-400">{{ addOn.description }}</span>
          </div>

          <span class="text-primary">+${{ getAddOnPrice(addOn.id, formData.billing) }}{{
            getBillingPeriod(formData.billing) }}</span>
        </label>
      </div>
    </div>
  </div>
</template>
