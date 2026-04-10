"use client";

import React from "react";

// Library imports
import { Avatar } from "antd";
import { QuestionOutlined } from "@ant-design/icons";

// Types
import { CategoryAvatarProps } from "../../types";

const CategoryAvatar: React.FC<CategoryAvatarProps> = ({
  icon = <QuestionOutlined />,
  color = "#d9d9d9",
}) => {
  return (
    <Avatar
      size="small"
      style={{
        backgroundColor: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
      icon={icon}
    />
  );
};

export default CategoryAvatar;
