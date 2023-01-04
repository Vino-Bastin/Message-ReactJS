import React from "react";

interface UserProfilePhotoInterface {
  url: string;
  size?: number;
}

const getRandomColorValue = () => {
  return `rgb(${Math.trunc(Math.random() * 255)},${Math.trunc(
    Math.random() * 255
  )},${Math.trunc(Math.random() * 255)})`;
};

const UserProfilePhoto: React.FC<UserProfilePhotoInterface> = ({
  url,
  size,
}) => {
  const sizeClassName = size ? `w-${size} h-${size}` : "w-12 h-12";

  return (
    <div
      className={`font-bold ${sizeClassName} rounded-full cursor-pointer grid place-content-center`}
      style={{ backgroundColor: getRandomColorValue() }}
    >
      {url.toUpperCase()}
    </div>
  );
};

export default UserProfilePhoto;
