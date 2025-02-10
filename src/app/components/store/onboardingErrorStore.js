import { create } from 'zustand'

const onboardingErrorStore = create((set) => ({
    onboardingErrorStore: false, 
    setonboardingErrorStore: (value) => set({ onboardingErrorStore: value }),
}))

export default onboardingErrorStore;