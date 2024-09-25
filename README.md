<div align="center">

  <img src="./client/src/assets/fetena_logo.png" alt="logo" width="200" height="auto" />
  <h1>Fetena.com | ፈተና.com</h1>
  
  <p>
    Online Exam Creation, Management and Monitoring System 
  </p>
  
  
<!-- Badges -->
<p>
  <a href="https://github.com/johannesteshome/dashtrack-task-management-system/network/members">
    <img src="https://img.shields.io/github/forks/johannesteshome/dashtrack-task-management-system
    " alt="forks" />
  </a>
  <a href="https://github.com/johannesteshome/dashtrack-task-management-system/stargazers">
    <img src="https://img.shields.io/github/stars/johannesteshome/dashtrack-task-management-system
    " alt="stars" />
  </a>
  <a href="https://github.com/johannesteshome/dashtrack-task-management-system/issues/">
    <img src="https://img.shields.io/github/issues/johannesteshome/dashtrack-task-management-system
    " alt="open issues" />
  </a>
</p>
   
<h4>
    <a href="https://dashtrack-task-management-system.vercel.app/">View Demo</a>
  <span> · </span>
    <!-- <a href="https://github.com/Louis3797/awesome-readme-template">Documentation</a>
  <span> · </span> -->
    <a href="https://github.com/Louis3797/awesome-readme-template/issues/">Report Bug</a>
  <span> · </span>
    <a href="https://github.com/Louis3797/awesome-readme-template/issues/">Request Feature</a>
  </h4>
</div>

<br />

<!-- Table of Contents -->

# :notebook_with_decorative_cover: Table of Contents

- [:blue_book: Table of Contents]()
  - [:star2: About the Project](#star2-about-the-project)
    - [:camera: Screenshots](#camera-screenshots)
    - [:space_invader: Tech Stack](#space_invader-tech-stack)
    - [:dart: Features](#dart-features)
    - [:art: Color Reference](#art-color-reference)
    <!-- - [:key: Environment Variables](#key-environment-variables) -->
  - [:toolbox: Getting Started](#toolbox-getting-started)
    - [:bangbang: Prerequisites](#bangbang-prerequisites)
    - [:gear: Installation](#gear-installation)
    <!-- - [:test_tube: Running Tests](#test_tube-running-tests) -->
    - [:running: Run Locally](#running-run-locally)
        <!-- - [:triangular_flag_on_post: Deployment](#triangular_flag_on_post-deployment) -->
      <!-- - [:eyes: Usage](#eyes-usage) -->
  - [:compass: Roadmap](#compass-roadmap)
  - [:wave: Contributing](#wave-contributing)
      <!-- - [:scroll: Code of Conduct](#scroll-code-of-conduct) -->
    <!-- - [:grey\_question: FAQ](#grey_question-faq) -->
    <!-- - [:warning: License](#warning-license) -->
  - [:handshake: Contact](#handshake-contact)
  - [:gem: Acknowledgements](#gem-acknowledgements)

<!-- About the Project -->

## :star2: About the Project

Fetena.com is a robust and secure online platform designed to facilitate the management and monitoring of exams for organizations, institutions, and schools. It streamlines the process of exam creation, scheduling, and real-time supervision using deep learning technologies to ensure exam integrity and prevent cheating. The system empowers organizations to efficiently manage large-scale exams while maintaining a high standard of academic honesty.

<!-- Screenshots -->

### :camera: Screenshots

<div align="center"> 
  <img src="./frontend/src/img/screenshots/signin.jpg" alt="screenshot" />
  <p>Login Page</p>
</div>
<div align="center"> 
  <img src="./frontend/src/img/screenshots/dashboard.jpg" alt="screenshot" />
  <p>Dashboard Page</p>
</div>
<div align="center"> 
  <img src="./frontend/src/img/screenshots/createProject.jpg" alt="screenshot" />
  <p>Creating a Project</p>
</div>
<div align="center">
  <img src="./frontend/src/img/screenshots/inviteMember.jpg" alt="screenshot" />
  <p>Inviting a Team Member via Email</p>
</div>
<div align="center">
  <img src="./frontend/src/img/screenshots/createTeam.jpg" alt="screenshot" />
  <p>Creating a Team</p>
</div>
<div align="center"> 
  <img src="./frontend/src/img/screenshots/projectPage.jpg" alt="screenshot" />
  <p>Project Members and Teams List</p>
</div>
<div align="center"> 
  <img src="./frontend/src/img/screenshots/creatingTasks.jpg" alt="screenshot" />
  <p>Creating a Task</p>
</div>
<div align="center"> 
  <img src="./frontend/src/img/screenshots/kanbanBoardView.jpg" alt="screenshot" />
  <p>Kanban Board View of Tasks</p>
</div>
<div align="center"> 
  <img src="./frontend/src/img/screenshots/TaskListView.jpg" alt="screenshot" />
  <p>Table List View of Tasks</p>
</div>
<div align="center"> 
  <img src="./frontend/src/img/screenshots/calendarView.jpg" alt="screenshot" />
  <p>Calendar View of Tasks</p>
</div>
<div align="center"> 
  <img src="./frontend/src/img/screenshots/chatView.jpg" alt="screenshot" />
  <p>Team Chat</p>
</div>
<div align="center"> 
  <img src="./frontend/src/img/screenshots/notificationsPage.jpg" alt="screenshot" />
  <p>Notifications Page View</p>
</div>
<div align="center"> 
  <img src="./frontend/src/img/screenshots/profileDetails.jpg" alt="screenshot" />
  <p>Profile Page</p>
</div>

<!-- TechStack -->

### :space_invader: Tech Stack

These are the technologies and frameworks used to build this project.

- [![React][React.js]][React-url]
- [![Redux][Redux]][Redux-url]
- [![Node][Node]][Node-url]
- [![MongoDB][MongoDB]][MongoDB-url]
- [![Expressjs][Expressjs]][Expressjs-url]
- [![Socket.IO][Socket.IO]][Socket.IO-url]
- [![Postman][Postman]][Postman-url]
- [![AntD][AntD]][AntD-url]

<!-- Features -->

### :dart: Features

- **Real-Time Exam Monitoring**: Using the faceApi module and socketIO, Fetena.com provides real-time monitoring of exam sessions, ensuring the authenticity of the exam process.

- **Cheating Prevention**: The platform includes mechanisms for detecting and preventing cheating during exams through live proctoring - face tracking, automated alerts, and monitoring.

- **Easy Exam Creation and Management**: Organizations can create exams with customizable question formats (multiple-choice, short answers, essays) and schedule them for a wide range of participants.

- **User Management**: Admins can add, manage, and assign roles to users (e.g., examiners, students) for a streamlined workflow.

- **Real-Time Feedback and Reports**: After an exam, the system generates detailed reports and analytics to provide insights into student performance, cheating attempts, and other metrics.

- **Multi-Language and Device Support**: The platform is accessible from various devices and supports multiple languages to accommodate global users.

- **Live Video Surveillance**: The platform allows exam proctors to remotely access the examinee's camera and screen in real-time during the exam. It also periodically captures snapshots to document any suspicious behavior or potential cheating incidents for review.

- **Real-Time Messaging**: The integrated real-time chat feature facilitates smooth communication between examiners and examinees. Examiners can broadcast announcements or initiate private conversations, while examinees can privately reach out to proctors for clarifications or other exam-related inquiries.

- **Notifications**: The system keeps users informed about important updates and activities through real-time notifications.
<!-- Color Reference -->

### :art: Color Reference

| Color           | Hex                                                              |
| --------------- | ---------------------------------------------------------------- |
| Primary Color   | ![#21BFD4](https://via.placeholder.com/10/21BFD4?text=+) #222831 |
| Secondary Color | ![#3B82F6](https://via.placeholder.com/10/3B82F6?text=+) #393E46 |
| Accent Color    | ![#F5F5F5](https://via.placeholder.com/10/F5F5F5?text=+) #00ADB5 |
| Text Color      | ![#000000](https://via.placeholder.com/10/000000?text=+) #EEEEEE |

<!-- Env Variables -->
<!-- ### :key: Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`

`ANOTHER_API_KEY` -->

<!-- Getting Started -->

## :toolbox: Getting Started

<!-- Prerequisites -->

### :bangbang: Prerequisites

This project uses npm as package manager

```bash
 npm -v
```

<!-- Installation -->
<!-- ### :gear: Installation

Install my-project with npm

```bash
  npm install
  cd my-project
``` -->

<!-- Running Tests -->
<!-- ### :test_tube: Running Tests

To run tests, run the following command

```bash
  yarn test test
``` -->

<!-- Run Locally -->

### :running: Run Locally

Clone the project

```bash
  git clone https://github.com/Alpha-Techologies/Fetena.com.git
```

Go to the project directory

```bash
  cd Fetena.com
```

Install dependencies for each front-end and back-end

```bash
  cd client
  npm install
```

Start the server

```bash
  cd server
  npm install
  npm run dev
```

<!-- Deployment
### :triangular_flag_on_post: Deployment

To deploy this project run

```bash
  yarn deploy
``` -->

<!-- Usage -->
<!-- ## :eyes: Usage

Use this space to tell a little more about your project and how it can be used. Show additional screenshots, code samples, demos or link to other resources.


```javascript
import Component from 'my-project'

function App() {
  return <Component />
}
``` -->

<!-- Roadmap -->

## :compass: Roadmap

- [x] Team Chat
- [x] Kanban View of Tasks
- [ ] Mobile Responsiveness
- [ ] Google Calendar Integration

<!-- Contributing -->

## :wave: Contributors

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<a href="https://github.com/Alpha-Techologies/Fetena.com/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Alpha-Techologies/Fetena.com" />
</a>

Contributions are always welcome!

<!-- See `contributing.md` for ways to get started. -->

<!-- Code of Conduct -->
<!-- ### :scroll: Code of Conduct

Please read the [Code of Conduct](https://github.com/Louis3797/awesome-readme-template/blob/master/CODE_OF_CONDUCT.md)

<!-- FAQ -->
<!-- ## :grey_question: FAQ

- Question 1

  + Answer 1

- Question 2

  + Answer 2 -->

<!-- License -->
<!-- ## :warning: License -->

<!-- Distributed under the no License. See LICENSE.txt for more information. -->

<!-- Contact -->

## :handshake: Contact

[Yohannes Teshome](https://github.com/johannesteshome) - [@linkedin](https://linkedin.com/yohannes-teshome) - yohannesteshome632@gmail.com

Project Link: [Here](https://github.com/Alpha-Techologies/Fetena.com)

<!-- Acknowledgments -->

## :gem: Acknowledgements

We would like to thank the following resources and websites that helped us in building this project

- [Shields.io](https://shields.io/)
- [Awesome README](https://github.com/matiassingers/awesome-readme)
- [Emoji Cheat Sheet](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md#travel--places)
- [Readme Template](https://github.com/othneildrew/Best-README-Template)

[React.js]: https://img.shields.io/badge/React-js-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Redux]: https://img.shields.io/badge/redux-toolkit-7248B6?style=for-the-badge&logo=redux&logoColor=red
[Redux-url]: https://redux-toolkit.js.org/
[Node]: https://img.shields.io/badge/node-js-7EC729?style=for-the-badge&logo=nodedotjs&logoColor=blue
[Node-url]: https://nodejs.org/en
[MongoDB]: https://img.shields.io/badge/mongo-db-0FA54D?style=for-the-badge&logo=mongodb&logoColor=blue
[MongoDB-url]: https://www.mongodb.com/
[Socket.IO]: https://img.shields.io/badge/socket-io-010101?style=for-the-badge&logo=socketdotio&logoColor=green
[Socket.IO-url]: https://socket.io/
[ExpressJS]: https://img.shields.io/badge/express-js-7E7E7E?style=for-the-badge&logo=express&logoColor=blue
[ExpressJS-url]: https://expressjs.com/
[AntD]: https://img.shields.io/badge/ant-design-EE3D4E?style=for-the-badge&logo=antdesign&logoColor=blue
[AntD-url]: https://ant.design/
[Postman]: https://img.shields.io/badge/post-man-F76A33?style=for-the-badge&logo=postman&logoColor=blue
[Postman-url]: https://www.postman.com/
