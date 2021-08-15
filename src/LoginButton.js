// This came from Auth0 DOCS
// https://manage.auth0.com/dashboard/us/dev-xmbqk6d0/applications/zS3glHvNPyXyURNAPKNnE8aXfJ1U2qqO/quickstart

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;
