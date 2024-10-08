// src/components/Chat/MessageList.js
import React from "react";
import { List, Avatar } from "antd";

const MessageList = ({ messages, style }) => {
  return (
    <List
      style={style}
      itemLayout="horizontal"
      dataSource={messages}
      renderItem={(message) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={message.sender.avatar} />}
            title={message.sender.name}
            description={message.content}
          />
        </List.Item>
      )}
    />
  );
};

export default MessageList;
