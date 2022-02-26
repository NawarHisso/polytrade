import React, { useEffect } from "react";
import { Button, Card, CardContent, CardHeader } from "@mui/material";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { GoogleLogin } from "react-google-login";

import Icon from "./Icon";
import { CONFIG } from "../../constants";
import { googleLogin } from "../../actions/auth";
import { useLocation } from "react-router-dom";

const Auth = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("profile");
    if (isLoggedIn) history.push("/storage");
  }, [location, history]);

  const googleSuccess = async (res) => {
    dispatch(googleLogin(res, history));
  };

  const googleFailure = (error) => {
    alert(error.message);
  };

  return (
    <Card sx={{ minWidth: 275, textAlign: "center" }}>
      <CardHeader title="Welcom to Polytrade" />
      <CardContent>
        <GoogleLogin
          clientId={CONFIG.GOOGLE_CLIENT_ID}
          render={(renderProps) => (
            <Button
              variant="contained"
              size="small"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              startIcon={<Icon />}
            >
              Login with Google
            </Button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy="single_host_origin"
        />
      </CardContent>
    </Card>
  );
};

export default Auth;
