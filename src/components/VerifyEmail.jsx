import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BASE_API } from "../helper/Constants";
import queryString from 'query-string';

function VerifyEmail() {
    const [isLoading,setisLoading] = useState(true);
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const location = useLocation();
  const [isValid,setisValid] = useState(false);
    useEffect(() => {
      const { email, token } = queryString.parse(location.search);
  
      const verifyEmail = async () => {
        try {
          const response = await axios.post(BASE_API+'api/verify-email', { email, token });
          setMessage(response.data);
          setisValid(1);
        } catch (error) {
          setMessage('Error verifying email');
          setisValid(0);
        }
      };
  
      if (email && token) {
        verifyEmail();
      } else {
        setMessage('Invalid verification link');
      }
    }, [location]);
  return (
    <>
      <main>
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                    <h2>Please wait for your verification</h2>
                    {isValid ? <> <span className="text-success">{message}</span> 
                        
                    </> :  <span className="text-danger">{message}</span>}
                    <Link to="/" >Go to Login</Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default VerifyEmail;
