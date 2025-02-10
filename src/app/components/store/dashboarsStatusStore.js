import { create } from "zustand";

const useDashboardStatusStore = create((set) => ({
  dashboardStatus: "Free", // Default value
  setDashboardStatus: (value) => set({ dashboardStatus: value }),

  // Fetch subscription plan from backend
  fetchSubscriptionPlan: async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user/subscription`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch subscription plan");
      }

      const data = await response.json();
      set({ dashboardStatus: data.subscription_plan });
    } catch (error) {
      console.error("Error fetching subscription plan:", error);
    }
  },

  // Update subscription plan
  updateSubscriptionPlan: async (newPlan) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user/subscription`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({ subscription_plan: newPlan }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update subscription plan");
      }

      const data = await response.json();
      set({ dashboardStatus: data.subscription_plan });
    } catch (error) {
      console.error("Error updating subscription plan:", error);
    }
  },
}));

export default useDashboardStatusStore;
