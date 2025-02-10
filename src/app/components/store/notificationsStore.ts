import { create } from "zustand";

interface Notification {
  id: string;
  notificationTitle: string;
  notificationMessage: string;
  notificationSection: string;
  notificationTime: string;
}

interface NotificationsState {
  notifications: Notification[];
  fetchNotifications: () => Promise<void>;
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string,user_id:string) => void;
}

const useNotificationsStore = create<NotificationsState>((set: any) => ({
  notifications: [],
  fetchNotifications: async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user/notifications`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const formattedNotifications = data.notifications.map(
          (notification: any) => ({
            id: notification._id,
            notificationTitle: notification.category,
            notificationMessage: notification.heading,
            notificationSection: notification.section || "/",
            notificationTime: notification.delta,
          })
        );
        set({ notifications: formattedNotifications.reverse() });
      } else {
        console.error("Failed to fetch notifications:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  },
  addNotification: (notification: Notification) =>
    set((state: any) => ({
      notifications: [...state.notifications, notification],
    })),
    removeNotification: async (id: string, user_id:string) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/notifications/delete`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            body: JSON.stringify({
              notification_id: id,
              user_id: user_id, // Ensure user_id is retrieved appropriately
            }),
          }
        );
    
        if (response.ok) {
          // Update local state to remove the notification
          set((state: any) => ({
            notifications: state.notifications.filter(
              (notif: Notification) => notif.id !== id
            ),
          }));
        } else {
          console.error("Failed to delete notification:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting notification:", error);
      }
    }
}));

export default useNotificationsStore;
