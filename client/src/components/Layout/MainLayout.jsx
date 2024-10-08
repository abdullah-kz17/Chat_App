import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  MessageOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
// import UserList from "../UserList/UserList";
import ChatList from "../Chat/ChatList";
import ChatWindow from "../Chat/ChatWindow";

const { Sider, Content } = Layout;

const MainLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200} theme="light">
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ height: "100%", borderRight: 0 }}
        >
          <Menu.Item key="1" icon={<MessageOutlined />}>
            Chats
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            {user?.name}
          </Menu.Item>
          <Menu.Item key="3" icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ display: "flex", padding: "24px" }}>
          <div style={{ width: "30%", marginRight: "24px" }}>
            <ChatList onChatSelect={setSelectedChat} />
          </div>
          {selectedChat ? (
            <ChatWindow chat={selectedChat} style={{ flex: 1 }} />
          ) : (
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Select a chat to start messaging
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
