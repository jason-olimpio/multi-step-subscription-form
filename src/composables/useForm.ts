import { reactive, ref } from 'vue'
import { z } from 'zod'

export const formData = reactive({
  name: '',
  email: '',
  phone: '',
  plan: 'arcade',
  billing: 'monthly',
  addOns: [] as string[],
})

const stepOneSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(3, 'Name must be at least 3 characters'),
  email: z.email('Invalid email address').min(1, 'Email is required'),
  phone: z
    .string()
    .min(1, 'Phone is required')
    .regex(/^[\d\s\-\+\(\)]{10,}$/, 'Phone must be at least 10 digits'),
})

const stepTwoSchema = z.object({
  plan: z.string().min(1, 'Please select a plan'),
  billing: z.string().min(1, 'Please select billing period'),
})

const stepThreeSchema = z.object({
  addOns: z.array(z.string()).optional(),
})

const stepFourSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email'),
  phone: z.string().min(1, 'Phone is required'),
  plan: z.string().min(1, 'Plan is required'),
  addOns: z.array(z.string()).optional(),
})

export const errors = ref<Record<string, string>>({})

const stepSchemas: Record<number, z.ZodSchema> = {
  0: stepOneSchema,
  1: stepTwoSchema,
  2: stepThreeSchema,
  3: stepFourSchema,
}

export const validateStep = (step: number): boolean => {
  errors.value = {}

  const schema = stepSchemas[step]
  if (!schema) return true

  const { name, email, phone, plan, billing, addOns } = formData

  try {
    const dataToValidate =
      {
        0: { name, email, phone },
        1: { plan, billing },
        2: { addOns },
        3: { name, email, phone, plan, addOns },
      }[step] || {}

    schema.parse(dataToValidate)

    return true
  } catch (error: unknown) {
    const zodError = error as z.ZodError

    zodError.issues.forEach(issue => {
      const field = issue.path[0] as string
      errors.value[field] = issue.message
    })

    return false
  }
}
