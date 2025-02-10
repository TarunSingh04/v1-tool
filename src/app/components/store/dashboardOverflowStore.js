import { create } from 'zustand'

const dashboardOverflowStore = create((set) => ({
    dashboardOverflow: false, 
    setDashboardOverflow: (value) => set({ dashboardOverflow: value }),
}))

export default dashboardOverflowStore;