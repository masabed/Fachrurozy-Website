import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory(); // React Router v5 navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
  
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) throw new Error(data.message || "Login failed");
  
      // ✅ Store token & role in localStorage
      localStorage.setItem("token", data.token); 
      localStorage.setItem("role", data.role);   // ✅ Store user role
  
      // ✅ Extract user name and role from API response
      const userName = data.user.name;
      const userRole = data.role;
  
      // ✅ Show popup with user details
      alert(`Welcome, ${userName}, ${userRole}`);
  
      // ✅ Redirect based on role
      if (userRole === "superAdmin") {
        history.push("/adminpanel");
      } else {
        history.push("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src="/images/rozy.png"
              alt="login form"
              className="rounded-start w-100"
            />
          </MDBCol>

          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">

              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: "1px" }}>
                Sign into your account
              </h5>

              {error && <p className="text-danger">{error}</p>}

              <form onSubmit={handleLogin}>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email address"
                  type="email"
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  type="password"
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <MDBBtn className="mb-4 px-5" color="dark" size="lg" type="submit" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default Login;
