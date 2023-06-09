import React from "react";
import { User } from "../../types/userTypes";
const UserProfile = (props: { toggle: boolean; user: User }) => {
  const { toggle, user } = props;
  return (
    <div
      className={`flex gap-5 items-center mb-10 ${
        toggle
          ? "bg-none transition-all duration-300 delay-200"
          : "bg-white rounded-xl p-2"
      }`}
    >
      <div className="min-w-[3.5rem] h-[3.5rem]">
        <img
          src="https://avatars.githubusercontent.com/u/47259776?v=4"
          alt=""
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <div className={toggle ? "opacity-0 delay-200" : ""}>
        <h3 className="text-xl">{user?.name ? user.name : user?.username}</h3>
        <span className="text-[0.75rem] opacity-60">{user?.email ?? ""}</span>
      </div>
    </div>
  );
};

export default UserProfile;
