import { useState, useEffect } from "react";
import "./App.css";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import { PubSub } from "@aws-amplify/pubsub";

// Apply plugin with configuration v6
const pubsub = new PubSub({
  region: "<ap-northeast-1>",
  endpoint: "wss://ac2p1tgiw3p89-ats.iot.ap-northeast-1.amazonaws.com/mqtt",
});

function App() {
  const [pubMessage, setPubMessage] = useState("");
  const [subMessage, setSubMessage] = useState("");

  useEffect(() => {
    console.log("useEffect🔵 ", pubsub.connectionState);
    pubsub.subscribe("myTopic").subscribe({
      next: (data) => {
        console.log("Message received", data);
        setSubMessage(data.value.msg);
      },
      error: (error) => console.error(error),
      complete: () => console.log("Done"),
    });
  }, []);

  function publish() {
    pubsub.publish("myTopic", { msg: pubMessage }).then((e) => {
      console.log("pubsub🔵 ", pubsub.connectionState);
      console.log("e🔵 ", e);
      console.log("pubMessage🔵 ", pubMessage);
    });
  }

  
  const handleTest = (e) => {
    console.log("user🔵 ", e);
  };

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user?.signInDetails.loginId}</h1>
          <p>
            Publish Message
            <br />
            <input
              type="text"
              value={pubMessage}
              onChange={(event) => setPubMessage(event.target.value)}
            ></input>
            <button onClick={publish}>Publish</button>
          </p>
          <p>
            Subscribe Message
            <br />
            <textarea value={subMessage} readOnly></textarea>
          </p>
          <button onClick={signOut}>Sign out</button>
          <button onClick={(e)=>handleTest(user)}>test</button>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
