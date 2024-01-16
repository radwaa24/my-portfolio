import React from "react";

const ProfilePicture = ({ user, fontSize, ...props }) => {
  const firstName = user.firstName;
  const lastName = user.lastName;

  return (
    <>
      {user.profilepicture ? (
        <img
          {...props}
          alt={`${firstName} ${lastName}'s Profile`}
          src={user.profilepicture}
          className="rounded-full"
        />
      ) : (
        <div
          {...props}
          className="w-10 h-10 flex items-center justify-center bg-gray-500 text-white rounded-full"
        >
          {firstName.charAt(0)}
          {lastName.charAt(0)}
        </div>
      )}
    </>
  );
};

export default ProfilePicture;
