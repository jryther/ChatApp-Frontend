import { useState, useEffect } from "react";
import {
    config,
    useClient,
    useMicrophoneAndCameraTracks,
    channelName,
} from "./settings.js";
import FetchToken from "./FetchToken.js";
import { Container, Row, Col } from 'react-bootstrap';
import Video from "./Video";
import Controls from "./Controls";

export default function VideoCall(props) {
    const { setInCall } = props;
    const [users, setUsers] = useState([]);
    const [start, setStart] = useState(false);
    const client = useClient();
    const { ready, tracks } = useMicrophoneAndCameraTracks();
    const uid = 0;
    const tokenRole = 1;


    useEffect(() => {
        let init = async (name) => {
            client.on("user-published", async (user, mediaType) => {
                await client.subscribe(user, mediaType);
                if (mediaType === "video") {
                    setUsers((prevUsers) => {
                        return [...prevUsers, user];
                    });
                }
                if (mediaType === "audio") {
                    user.audioTrack.play();
                }
            });

            client.on("user-unpublished", (user, mediaType) => {
                if (mediaType === "audio") {
                    if (user.audioTrack) user.audioTrack.stop();
                }
                if (mediaType === "video") {
                    setUsers((prevUsers) => {
                        return prevUsers.filter((User) => User.uid !== user.uid);
                    });
                }
            });

            client.on("user-left", (user) => {
                setUsers((prevUsers) => {
                    return prevUsers.filter((User) => User.uid !== user.uid);
                });
            });

            let token = await FetchToken(uid, channelName, tokenRole);

            try {
                await client.join(config.appId, name, token, null);
            } catch (error) {
                console.log(error)
            }

            if (tracks) await client.publish([tracks[0], tracks[1]]);
            setStart(true);
        };

        if (ready && tracks) {
            try {
                init(channelName);
            } catch (error) {
                console.log(error);
            }
        }

        // When token-privilege-will-expire occurs, fetch a new token from the server and call renewToken to renew the token.
        client.on("token-privilege-will-expire", async function () {
            let token = await FetchToken(uid, channelName, tokenRole);
            await client.renewToken(token);
        });

        // When token-privilege-did-expire occurs, fetch a new token from the server and call join to rejoin the channel.
        client.on("token-privilege-did-expire", async function () {
            console.log("Fetching the new Token")
            let token = await FetchToken(uid, channelName, tokenRole);
            console.log("Rejoining the channel with new Token")
            await client.join(config.appId, channelName, token, uid);
        });

    }, [channelName, client, ready, tracks]);

    return (
        <Container fluid style={{  height: "100%" }}>
            <Row style={{  height: "50%", width: "50%" }}>
                <Col>
                    {start && tracks && <Video tracks={tracks} users={users} />}
                </Col>
            </Row>
            <Row style={{  height: "10%" }}>
                <Col>
                    {ready && tracks && (
                    <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
                )}
                </Col>
            </Row>
        </Container>

    );
}