import React from 'react';

function ProfileDrop() {
  return (
    <div className='List'>
      <div className='Profile' />   {/* Allows users to change the profile picture and theme */}
      <div className='Account' />  {/* Allows users to change to premium or change to artist account and upload */}
      <div className='Logout'>Logout</div> {/*Allow users to logout of their account !remember to add and test jwt functionality */}
    </div>
  );
}

export default ProfileDrop;
