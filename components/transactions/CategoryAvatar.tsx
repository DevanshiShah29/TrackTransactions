import React from "react";
import { Avatar } from "antd";

const CategoryAvatar: React.FC<{ icon: React.ReactNode; color: string }> = ({ icon, color }) => (
  <Avatar size="small" style={{ backgroundColor: color }} icon={icon} />
);

export default CategoryAvatar;
