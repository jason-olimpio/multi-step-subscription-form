<script setup lang="ts">
import FormInput from './FormInput.vue'
import { formData, errors } from '../composables/useForm'
</script>

<template>
    <div class="flex flex-col gap-4">
        <div>
            <h2 class="text-3xl font-bold text-primary">Personal Info</h2>
            <p class="text-gray-500 mb-4 mt-2">Please provide your name, email address, and phone number.</p>
        </div>

        <FormInput v-model="formData.name" label="Name" type="text" placeholder="e.g. Stephen King"
            :error="errors.name" />

        <FormInput v-model="formData.email" label="Email Address" type="email" placeholder="e.g. stephenking@lorem.com"
            :error="errors.email" />

        <FormInput v-model="formData.phone" label="Phone Number" type="tel" placeholder="e.g. +1 234 567 890"
            :error="errors.phone" />
    </div>
</template>
