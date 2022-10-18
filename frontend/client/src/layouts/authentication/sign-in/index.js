/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/


// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { resetRegistered, login } from 'features/user';
import Layout from 'components/Layout';


function Basic() {
  // const [rememberMe, setRememberMe] = useState(false);

  // const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const dispatch = useDispatch();
	const { loading, isAuthenticated, registered } = useSelector(
		state => state.user
	);

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	useEffect(() => {
		if (registered) dispatch(resetRegistered());
	}, [registered]);

	const { email, password } = formData;

	const onChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = e => {
		e.preventDefault();

		dispatch(login({ email, password }));
	};

	if (isAuthenticated) return <Navigate to='/dashboard' />;

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
        
          <MDBox>
          <form className='mt-5' onSubmit={onSubmit}>
            <MDBox mb={2}>
              <MDInput 
               type="email" 
               label="Email" 
               fullWidth 
               name='email'
               onChange={onChange}
               value={email}
               required/>

            </MDBox>
            <MDBox mb={2}>
              <MDInput 
               type="password" 
               label="Password" 
               fullWidth 
               name='password'
               onChange={onChange}
               value={password}
               required/>
            </MDBox>
            {/* {email} */}
            <MDBox display="flex" alignItems="center" ml={-1}>
              {/* <Switch checked={rememberMe} onChange={handleSetRememberMe} /> */}
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                // onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                {/* &nbsp;&nbsp;Remember me */}
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton fullWidth>
              {loading ? (
					<div className='spinner-border text-primary' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</div>
				) : (
					<button className='btn btn-primary mt-4'>Login</button>
				)}
              </MDButton>
            </MDBox>
            </form>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/users/register"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>

      </Card>
      
    </BasicLayout>
  );
}

export default Basic;
