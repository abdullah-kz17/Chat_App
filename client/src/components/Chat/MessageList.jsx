import React from "react";
import { List, Avatar } from "antd";
import "./MessageList.scss"; // SCSS for custom styling

const MessageList = ({ messages, currentUser }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={messages}
      renderItem={(message) => {
        const isCurrentUser = message.sender._id === currentUser._id;
        return (
          <div className={`message ${isCurrentUser ? "right" : "left"}`}>
            <List.Item>
              {!isCurrentUser && (
                <Avatar src={message.sender.avatar} className="avatar" />
              )}
              <div className="message-content">
                {!isCurrentUser && (
                  <span className="sender-name">{message.sender.name}</span>
                )}
                <div className="message-bubble">
                  <p className="message-text">{message.content}</p>
                  <span className="timestamp">
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </List.Item>
          </div>
        );
      }}
    />
  );
};

export default MessageList;
