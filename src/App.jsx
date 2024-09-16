import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

function App() {

  const handleTest=(e)=>{
    console.log('e🔵 ', e);

  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          <h1>Hello {user?.signInDetails.loginId}</h1>
          <button onClick={signOut}>Sign out</button>
          <button onClick={handleTest(user)}>test</button>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
