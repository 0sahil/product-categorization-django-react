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
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";


import { useState } from 'react';
import Layout from 'components/Layout';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from 'features/user';


const SignUp = () => {
  const dispatch = useDispatch();
	const { registered, loading } = useSelector(state => state.user);

	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		email: '',
		password: '',
	});

	const { first_name, last_name, email, password } = formData;

	const onChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = e => {
		e.preventDefault();
		dispatch(register({ first_name, last_name, email, password }));
	};

	if (registered) return <Navigate to='/login' />;
  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your Name, Email and Password to register
          </MDTypography>
        </MDBox>
        <form className='mt-5' onSubmit={onSubmit}>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox>
            <MDBox mb={2}>
              <MDInput
               name='first_name'
               type="text" 
               label="First Name" 
               variant="standard" 
               fullWidth 						
               onChange={onChange}
						   value={first_name}
						   required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text"
               name='last_name'
               label="Last Name" 
               variant="standard" 
               fullWidth 
               onChange={onChange}
               value={last_name}
               required
               />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" 
               label="Email" 
               variant="standard" 
               fullWidth 
               name='email'
               onChange={onChange}
               value={email}
               required/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" 
               label="Password" 
               variant="standard" 
               fullWidth 
               name='password'
               onChange={onChange}
               value={password}
               required/>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton fullWidth>
              {loading ? (
					<div className='spinner-border text-primary' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</div>
				) : (
					<button className='btn btn-primary mt-4'>Register</button>
				)}
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
        </form>
      </Card>
    </CoverLayout>
  );
}

export default SignUp;
