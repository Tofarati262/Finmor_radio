import {React,useContext} from 'react';
import "./ProfileDrop.css";
import { ProfilePicContext } from './components/context/picContext';
function ProfileDrop() {
    const {drop,setDrop}=useContext(ProfilePicContext);
  return (
    <  >
{    drop&&( <div className="List">
    <div className='Profile' >Profile</div> {/* Allows users to change the profile picture and theme */}
    <div className='Account' >Account</div>  {/* Allows users to change to premium or change to artist account  */}
    <div className="Upload">Upload</div>
    <div className='Logout'>Logout</div> {/*Allow users to logout of their account !remember to add and test jwt functionality */}
  </div>)
}   
  </>
    
  );
}

export default ProfileDrop;
