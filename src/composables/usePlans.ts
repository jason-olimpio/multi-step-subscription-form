export const plans = [
  {
    id: 'arcade',
    name: 'Arcade',
    monthlyPrice: 9,
    yearlyPrice: 90,
    icon: '/images/icon-arcade.svg',
  },
  {
    id: 'advanced',
    name: 'Advanced',
    monthlyPrice: 12,
    yearlyPrice: 120,
    icon: '/images/icon-advanced.svg',
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 15,
    yearlyPrice: 150,
    icon: '/images/icon-pro.svg',
  },
]

export const addOns = [
  {
    id: 'service',
    name: 'Online service',
    description: 'Access to multiplayer games',
    monthlyPrice: 1,
    yearlyPrice: 10
  },
  {
    id: 'storage',
    name: 'Larger storage',
    description: 'Extra 1TB of cloud save',
    monthlyPrice: 2,
    yearlyPrice: 20
  },
  {
    id: 'profile',
    name: 'Customizable profile',
    description: 'Custom theme on your profile',
    monthlyPrice: 2,
    yearlyPrice: 20
  }
]

export const getPlanPrice = (id: string, billing: string) => {
  const plan = plans.find(plan => plan.id === id)

  return billing === 'monthly' ? plan?.monthlyPrice : plan?.yearlyPrice
}

export const getAddOnPrice = (id: string, billing: string) => {
  const addOn = addOns.find(addOn => addOn.id === id)

  return billing === 'monthly' ? addOn?.monthlyPrice : addOn?.yearlyPrice
}

export const getBillingPeriod = (billing: string) =>
  billing === 'monthly' ? '/mo' : '/yr'

export const getAddOnName = (id: string) =>
  addOns.find(addOn => addOn.id === id)?.name

export const getPlanName = (id: string) =>
  plans.find(plan => plan.id === id)?.name
