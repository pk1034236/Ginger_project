import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"

const ProfilePage = () => {
  const location = useLocation();
  const email = location.state.email;
  const navigate = useNavigate();

  const [details, setDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState({});

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/user?email=${email}`
      );
      setDetails(response.data);
      setEditedDetails(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [email]);

  const handleLogout = () => {
    navigate("/login");
  };

  const handleChange = (e) => {
    setEditedDetails({
      ...editedDetails,
      [e.target.name]: e.target.value,
    });
  };

  const toggleEdit = () => {
    if (isEditing) {
      axios
        .put(`http://localhost:5000/user/${details.id}`, editedDetails)
        .then((response) => {
          console.log("User details updated successfully");
          // Re-fetch user details after successful update
          fetchUserData();
        })
        .catch((error) => {
          console.error("Error updating user details:", error.message);
        });
    }
    setIsEditing(!isEditing);
  };

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-gray-100 rounded-lg">
      <h1 className="text-xl font-bold mb-4">Edit Profile</h1>
      <div>
        {!isEditing ? (
          <div>
            <p>
              <strong>Name:</strong> {details.name}
            </p>
         
            <p>
              <strong>Age:</strong> {details.age}
            </p>
            <p>
              <strong>Date of Birth:</strong> {formatDate(details.dob)}
            </p>
            <p>
              <strong>Contact:</strong> {details.contact}
            </p>
          </div>
        ) : (
          <form>
            <div className=" flex flex-col justify-center items-center">     
            <div className="   flex flex-col">  
            <label>Name:</label>  
            <div className=" p-2 ">
               <input
              type="text"
              name="name"
              className="p-2 rounded"
              value={editedDetails.name}
              onChange={handleChange}
            /></div>
           </div>

           <div className="   flex flex-col">  
            <label>Age:</label>  
            <div className=" p-2 ">
            <input
              type="text"
              name="age"
              className="p-2 rounded"
              value={editedDetails.age}
              onChange={handleChange}
            /></div></div>

<div className="   flex flex-col">  
            <label>Date of Birth:</label>  
            <div className=" p-2 ">
          <input
  type="date"
  name="dob"
  className="p-2 rounded"
  value={formatDate(editedDetails.dob)} // Use formatDate to format the date
  onChange={handleChange}
/></div></div>
<div className="   flex flex-col">  
            <label>Contact:</label>  
            <div className=" p-2 ">
            <input
              type="text"
              name="contact"
              className="p-2 rounded"
              value={editedDetails.contact}
              // value={formatDate(editedDetails.contact)}
              onChange={handleChange}
            /></div></div>.
            </div>

          </form>
        )}
      </div>
      <div className="flex items-center justify-center mb-3">
        {/* <div className=" flex justify-center items-center"> */}
        <button
          className={`bg-${isEditing ? "green" : "blue"}-500 hover:bg-${
            isEditing ? "green" : "blue"
          }-700 text-black font-bold mb- py-2  self-center px-7 bg-amber-500 rounded focus:outline-none focus:shadow-outline`}
          type="button"
          onClick={toggleEdit}
        >
          {isEditing ? "Save" : "Edit"}
        </button></div>
      {/* </div> */}
      <div className=" flex justify-center items-center">      <button className="  px-8 py-2 font-bold rounded bg-[red] text-black " onClick={handleLogout}>Logout</button>
    </div></div>

  );
};

export default ProfilePage;
