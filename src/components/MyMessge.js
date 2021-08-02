import React from "react";

const MyMessge = ({ message }) => {
  if (message?.attachments?.length > 0) {
    return (
      <img
        src={message.attachments[0].file}
        alt="message-attachments"
        className="message-image"
        style={{ float: "right" }}
      />
    );
  }
  return (
    <div
      className="message"
      style={{
        float: "right",
        marginRight: "18px",
        color: "#fff",
        backgroundColor: "#16a085",
      }}
    >
      {message.text}
    </div>
  );
};

export default MyMessge;
