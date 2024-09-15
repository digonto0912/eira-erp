import React from "react";
import "./Notification.css";

function Notification() {
  const notifications = [
    {
      message:
        "High-quality ambient temperature and humidity sensors can be operated in two modes. One mode sends alerts when temperature or humidity goes above or below your thresholds."
    },
    {
      message:
        "High-quality ambient temperature and humidity sensors can be operated in two modes. One mode sends alerts when temperature or humidity goes above or below your thresholds."
    },
    {
      message:
        "High-quality ambient temperature and humidity sensors can be operated in two modes. One mode sends alerts when temperature or humidity goes above or below your thresholds."
    },
    {
      message:
        "High-quality ambient temperature and humidity sensors can be operated in two modes. One mode sends alerts when temperature or humidity goes above or below your thresholds."
    },
    {
      message:
        "High-quality ambient temperature and humidity sensors can be operated in two modes. One mode sends alerts when temperature or humidity goes above or below your thresholds."
    }
  ];

  return (
    <div className="notification-container">
      {notifications.map((notification, index) => (
        <div className="notification-card" key={index}>
          <p>{notification.message}</p>
        </div>
      ))}
    </div>
  );
}

export default Notification;
