import React, { useState } from "react";
import { Container, Button } from 'react-bootstrap';
import VideoCall from "../VideoCall/VideoCall";
import Navigation from "./Navigation"
import 'bootstrap/dist/css/bootstrap.min.css';


function VideoCallPage() {

    const [inCall, setInCall] = useState(false);

  return (
        <div className="VideoCallPage" style={{  height: "100%", width: "100%" }}>
            <Navigation/>
            <Container style={{  height: "100%" }} fluid>
                        {inCall ? (
                        <VideoCall setInCall={setInCall} />
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            display= 'flex'
                            align-items= 'center'
                            justify-content= 'center'
                            onClick={() => setInCall(true)}
                            
                        >
                            Join Call
                        </Button>
                    )}
            </Container>
        </div>
  );
}

export default VideoCallPage;