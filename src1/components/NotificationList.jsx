function getColor(type) {
  switch (type) {
    case "error": return "red";
    default: return "green";
  }
}

const notificationContainerStyles = {
  position: "fixed",
  top: "10px",
  right: "10px",
  zIndex: "1000",
  border: "2px dashed #FF0000 !important"
};

const notificationStyles = {
  position: "relative",
  /* left: "125%", */
  margin: "0 0 3vh 0",
  padding: "2vh 1vw",
  backgroundColor: "#FFFFFF",
  borderRadius: "5px",
  boxShadow: "0 0 10px 1px #CCCCCC"
  /* transition: transform 0.5s ease-in */
};

export default function NotificationList({ notifications }) {
  return (
    <div style={notificationContainerStyles} >
      {notifications.map((n) => (
        <div key={n.id} style={{ ...notificationStyles, color: getColor(n.type) }} >
          {n.msg}
        </div>
      ))}
    </div>
  );
}