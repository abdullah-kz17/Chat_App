import React, { useState, useEffect } from "react";
import { List, Avatar } from "antd";
import { getUsers } from "../../services/api";

const UserList = ({ style }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <List
      style={style}
      itemLayout="horizontal"
      dataSource={users}
      renderItem={(user) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={user.avatar} />}
            title={user.name}
            description={user.email}
          />
        </List.Item>
      )}
    />
  );
};

export default UserList;
