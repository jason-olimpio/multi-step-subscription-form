<script setup lang="ts">
import { formData, errors } from '../composables/useForm'
import { plans, getPlanPrice, getBillingPeriod } from '../composables/usePlans'

const getPrice = (plan: typeof plans[0]) =>
    `$${getPlanPrice(plan.id, formData.billing)}${getBillingPeriod(formData.billing)}`
</script>

<template>
    <div class="flex flex-col gap-4">
        <div>
            <h2 class="text-2xl font-bold text-primary">Select your plan</h2>
            <p class="text-gray-500 mb-4 mt-2">You have the option of monthly or yearly billing.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div v-for="plan in plans" :key="plan.id"
                class="card border-2 cursor-pointer transition-all hover:border-primary"
                :class="formData.plan === plan.id ? 'border-primary' : 'border-base'" @click="formData.plan = plan.id">
                <div class="card-body p-4">
                    <img class="w-10 h-10 mb-8":src="plan.icon" />

                    <div class="flex flex-col gap-1">
                        <h3 class="font-bold text-md text-primary">{{ plan.name }}</h3>
                        <p class="text-sm text-gray-500">{{ getPrice(plan) }}</p>
                        <p class="text-primary" v-if="formData.billing === 'yearly'">2 months free</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="form-control mt-4 bg-gray-100 p-3 rounded-lg flex flex-row items-center justify-center gap-4">
            <span class="font-bold" :class="formData.billing === 'monthly' ? 'text-primary' : 'text-gray-400'">
                Monthly
            </span>

            <input type="checkbox"
                class="toggle bg-primary border-primary checked:bg-primary checked:border-primary before:bg-white"
                :checked="formData.billing === 'yearly'"
                @change="formData.billing = formData.billing === 'monthly' ? 'yearly' : 'monthly'" />

            <span class="font-bold" :class="formData.billing === 'yearly' ? 'text-primary' : 'text-gray-400'">
                Yearly
            </span>
        </div>

        <span v-if="errors.plan" class="text-error text-sm">{{ errors.plan }}</span>
        <span v-if="errors.billing" class="text-error text-sm">{{ errors.billing }}</span>
    </div>
</template>
