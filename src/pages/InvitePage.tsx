import { BASE_URL } from "@/config/api";
import React from "react";
import { useNavigate } from "react-router-dom";

const InvitePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  function sendToken() {
    // Get the current page URL
    const url = window.location.href;
    console.log("Current URL:", url);  // Debug the URL
  
    // Create a URL object to easily parse the query parameters
    const urlObj = new URL(url);
  
    // Extract the token parameter from the URL
    const token = urlObj.searchParams.get('token');
    console.log("Extracted Token:", token);  // Debug the extracted token
  
    if (token) {
      // Prepare the POST request
      fetch(`${BASE_URL}/user/invite/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token }) // Sending the token in the body
      })
      .then(response => response.json())
      .then(data => {
        console.log("Response from server:", data);  // Debug the server response
      })
      .catch(error => {
        console.error("Error sending token:", error);  // Handle any errors
      });
    } else {
      console.log("No token found in the URL");
    }
  }
  

 // https://stmstasks.netlify.app/invite?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJheW9taWt1bm9sYWxleWUrMUBnbWFpbC5jb20iLCJpZCI6MywiZXhwIjoxNzI5Njg5OTEzfQ.F3NkNFUdrtOljasZIOEMbFgwnu-8fHWgXcXmm7B-T9E

  return (
    <div className="overflow-hidden h-screen p-3 flex justify-center items-center bg-primary bg-opacity-[12%]">
      <div className="lg:w-[500px] p-3 w-full lg:h-[300px] h-full rounded-md shadow-md bg-white flex flex-col gap-20 items-center  justify-center">
        <h1 className="capitalize text-3xl text-center w-full">
          do you accept the invitation
        </h1>

        <div>
          <div className="flex items-center gap-16">
            <button onClick={sendToken} className="bg-primary text-white py-2 px-4 rounded w-28 h-12 text-xl">
              Yes
            </button>
            <button
              className="w-28 h-12 text-xl bg-transparent border-2 border-primaryGray text-primaryGray py-2 px-4 rounded"
              onClick={handleLogin}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitePage;
