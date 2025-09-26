import { createContext, useContext, useState } from "react";
import NotificationList from "../components/NotificationList";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (msg, type = "success") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, msg, type }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ addNotification }} >
      {children}
      <NotificationList notifications={notifications} />
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}
