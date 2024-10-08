// src/components/Chat/ChatList.js
import React, { useState, useEffect } from "react";
import { List, Avatar } from "antd";
import { getChats } from "../../services/api";

const ChatList = ({ onChatSelect }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const data = await getChats();
        setChats(data);
      } catch (error) {
        console.error("Failed to fetch chats:", error);
      }
    };
    fetchChats();
  }, []);

  return (
    <List
      itemLayout="horizontal"
      dataSource={chats}
      renderItem={(chat) => (
        <List.Item onClick={() => onChatSelect(chat)}>
          <List.Item.Meta
            avatar={
              <Avatar src={chat.isGroupChat ? null : chat.users[1].avatar} />
            }
            title={chat.chatName}
            description={
              chat.latestMessage
                ? chat.latestMessage.content
                : "No messages yet"
            }
          />
        </List.Item>
      )}
    />
  );
};

export default ChatList;
