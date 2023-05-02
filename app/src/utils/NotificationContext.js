import React from "react";
const NotificationContext = React.createContext({
 notificationCount: 0,
 setNotficationCount: () => {},
});

export default NotificationContext;