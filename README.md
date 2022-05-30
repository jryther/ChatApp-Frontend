**ChatApp-Frontend**

Tools: JavaScript, React, Bootstrap, AWS S3 API, Agora API, Docker, Git

This project was the creation of a frontend for a video call application. The purpose of the application is to provide video conferencing services similar to Zoom, Google Meet, and Microsoft Teams. It utilizes the Agora API to create a chat room and initialize video feeds for all of the current participants. Features such as disabling the video feed and muting the microphone can be performed while on the call. The application incorporates a user login system that is authenticated via the backend server and provides continuous access with a JWT that is stored in the browser. If the user does not have a profile that can create one. Once logged in users can start a video call or access their profile page. The profile page displays their name and profile image which is obtained from an S3 bucket via a presigned URL provided by the backend server. Users can also edit their information and login credentials from this screen. The entire frontends UI is created using Bootstrap with a few elements taken from Material-UI. Future enhancements will include adding multiple chat room instances, and a real time text chat.

![Login](https://github.com/jryther/jryther.github.io/blob/master/images/VideoApp/Login.png)

![VideoCall](https://github.com/jryther/jryther.github.io/blob/master/images/VideoApp/VideoCall.png)

![Profile Screen](https://github.com/jryther/jryther.github.io/blob/master/images/VideoApp/ProfileScreen.png)

![Edit Account](https://github.com/jryther/jryther.github.io/blob/master/images/VideoApp/EditAccount.png)
