import React, { useContext } from "react";
import "./Profile.css";
import profile_icon from "../../Assets/Icons/iconamoon_profile-bold.png";
import { UserContext } from "../../Context/Context";
const Profile = () => {
  const { setModalProfileOpen } = useContext(UserContext);
  return (
    <div
      className="profile"
      onClick={() => {
        setModalProfileOpen(true);
      }}
    >
      <img src={profile_icon} alt="" />
    </div>
  );
};

export default Profile;
