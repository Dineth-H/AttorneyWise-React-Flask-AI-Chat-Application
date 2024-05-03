import React from "react";

interface IcoUserProps {
  width: string;
  height: string;
  id: string;
  onClick: () => void;
}

function IcoUser({ width, height, id, onClick }: IcoUserProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      id={id}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      style={{ backgroundColor: "white", borderRadius: "20%", padding: "5%", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}
      onClick={onClick}
    >
      <path
        d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
        fill="black"
      />
    </svg>
  );
}

export default IcoUser;
