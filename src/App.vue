<script setup lang="ts">
import { ref, computed } from 'vue'
import { StepOne, StepTwo, StepThree, StepFour, ThankYou } from './components'
import { validateStep } from './composables/useForm'

const steps = ['Your Info', 'Select Plan', 'Add-ons', 'Summary']
const currentStepIndex = ref(0)
const submitted = ref(false)

const currentStepComponent = computed(() => {
  if (submitted.value) return ThankYou

  switch (currentStepIndex.value) {
    case 0: return StepOne
    case 1: return StepTwo
    case 2: return StepThree
    case 3: return StepFour
    default: return StepOne
  }
})

const handleSubmit = () => {
  const action = currentStepIndex.value < steps.length - 1
    ? goToNextStep
    : submitForm

  action()
}

const goToPreviousStep = () => {
  if (currentStepIndex.value > 0)
    currentStepIndex.value--
}

const goToNextStep = () => {
  const canAdvance = validateStep(currentStepIndex.value) && currentStepIndex.value < steps.length - 1

  if (canAdvance) currentStepIndex.value++
}

const goToStep = (stepIndex: number) => currentStepIndex.value = stepIndex

const submitForm = () => submitted.value = true
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-10">
    <div class="card w-full max-w-4xl bg-white shadow-xl">
      <div class="card-body p-4 flex flex-row">
        <div class="bg-no-repeat rounded-lg p-8 flex flex-col min-w-[250px]"
          :style="{ backgroundImage: `url(/images/bg-sidebar-desktop.svg)` }">
          <div class="space-y-8">
            <div v-for="(step, index) in steps" :key="index" class="flex items-center gap-4">
              <div :class="['w-8 h-8 rounded-full flex items-center justify-center font-bold text-md shrink-0',
                index === currentStepIndex ? 'bg-white text-blue-700' : 'border']">
                {{ index + 1 }}
              </div>

              <div class="uppercase">
                <div class="text-xs">Step {{ index + 1 }}</div>
                <div class="text-sm font-bold">{{ step }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex-1 p-8 ml-10">
          <form @submit.prevent="handleSubmit">
            <div class="min-h-[200px] py-4">
              <Transition name="fade" mode="out-in">
                <component :is="currentStepComponent" @goToStep="goToStep" />
              </Transition>
            </div>

            <div class="flex justify-between mt-6 gap-4" v-if="!submitted">
              <button type="button"
                class="px-4 py-2 text-gray-400 font-medium bg-transparent hover:text-gray-600 disabled:text-gray-300"
                :disabled="currentStepIndex === 0" @click="goToPreviousStep">
                Go Back
              </button>

              <button v-if="currentStepIndex < steps.length - 1" type="submit" class="btn btn-primary">
                Next Step
              </button>

              <button v-else type="submit" class="btn btn-primary">
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
