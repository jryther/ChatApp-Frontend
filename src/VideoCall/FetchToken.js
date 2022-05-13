import axios from "axios";

// Fetch a token from the Golang server.
export default function FetchToken(uid, channelName, tokenRole) {

    /*
    The user ID of the user to be authenticated. A 32-bit unsigned
    integer with a value range from 1 to (2³² - 1). It must be unique.
    Set uid as 0, if you do not want to authenticate the user ID,
    that is, any uid from the app client can join the channel.

    The channel name. The string length must be less than 64 bytes.
    Supported character scopes are:
        All lowercase English letters: a to z.
        All upper English letters: A to Z.
        All numeric characters: 0 to 9.
        The space character.
        Punctuation characters and other symbols, including: "!", "#",
        "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".",
        ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ",".

    Role_Publisher(1): (Default) The user has the privilege of a 
    publisher, that is, the user can publish streams in the channel.

    Role_Subscriber(2): The user has the privilege of a subscriber,
    that is, the user can only subscribe to streams, not publish them,
    in the channel.

    */
    return new Promise(function (resolve) {
        axios.post('http://localhost:8080/fetch_rtc_token',
         {
            uid: uid,
            channelName: channelName,
            role: tokenRole
        }, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                authorization: localStorage.getItem("authorization")
            }
        })
            .then(function (response) {
                const token = response.data;
                resolve(token);
            })
            .catch(function (error) {
                console.log(error);
            });
    })
}