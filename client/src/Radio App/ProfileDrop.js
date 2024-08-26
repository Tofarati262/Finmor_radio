import {React,useContext} from 'react';
import "./ProfileDrop.css";
import { ProfilePicContext } from './components/context/picContext';
function ProfileDrop() {
    const {drop,setDrop}=useContext(ProfilePicContext);
    const handleLogout = async () => {
        console.log("trying");
        try {
          const response = await fetch("http://localhost:5000/logout/logout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          if (response.ok) {
            console.log("Successfully logged out");
            
            window.location.href = "http://localhost:3000/";
            // Perform any additional actions on successful logout, like redirecting the user
          } else {
            console.error("Failed to log out");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
  return (
    <  >
  <div className={`List ${drop ? 'show': ''}`}>
    <div className='Profile' >Profile</div> {/* Allows users to change the profile picture and theme */}
    <div className='Account' >Account</div>  {/* Allows users to change to premium or change to artist account  */}
    <div className="Upload" onClick={()=>window.location.href="http://localhost:3000/Upload"}>Upload</div>
    <div className='Logout' onClick={handleLogout}>Logout</div> {/*Allow users to logout of their account !remember to add and test jwt functionality */}
  </div>
 
  </>
    
  );
}

export default ProfileDrop;
