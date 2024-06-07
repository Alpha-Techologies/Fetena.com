import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { getMe } from "../Redux/features/authActions";

// Screens
import Home from "../Screens/LandingPageScreens/Home";
import RegistrationScreen from "../Screens/AuthScreens/RegistrationScreen";
import LoginScreen from "../Screens/AuthScreens/LoginScreen";
import ForgotPasswordScreen from "../Screens/AuthScreens/ForgotPasswordScreen";
import OTPScreen from "../Screens/AuthScreens/OTPScreen";
import ResetPasswordScreen from "../Screens/AuthScreens/ResetPasswordScreen";
import DashboardScreen from "../Screens/DashboardScreens/DashboardScreen";
import ProtectedRoutes from "../Screens/ProtectedRoutes";
import VerifyEmail from "../Screens/AuthScreens/VerifyEmail";
import TakeExamScreen from "../Screens/TakeExamScreens/TakeExamScreen";

//Pages
import DashboardPage from "../Pages/DashboardPage";
import ProfilePage from "../Pages/ProfilePage";
import NotFoundPage from "../Pages/NotFoundPage";
import ExamsPage from "../Pages/ExamsPage";
import CreateExam from "../Pages/CreateExamPages/CreateExam";
import OrganizationsPage from "../Pages/OrganizationsPage";
import ResultsPage from "../Pages/ResultsPage";
import CreateOrganization from "../Pages/CreateOrganization";
import OrganizationsDetails from "../Pages/OrganizationsDetails";
import ExamDetailPage from "../Pages/ExamDetailPage";
import CertificationsPage from "../Pages/CertificationsPage";
import TrainingVideosPage from "../Pages/TrainingVideosPage";
import SupportPage from "../Pages/SupportPage";
import ActivityLogPage from "../Pages/ActivityLogPage";
import OrganizationStaffPage from "../Pages/OrganizationStaffPage";
import OrganizationSettingsPage from "../Pages/OrganizationSettingsPage";
import NotificationPage from "../Pages/NotificationsPage";
import TakeExamRoute from "../Screens/TakeExamRoute";
import Preview from "../Pages/Preview";
import QuestionBank from "../Pages/QuestionBank";
import UserExamsPage from "../Pages/UserExamsPage";
import EditExam from './../Pages/EditExamPages/EditExam';
import Certification from "../Pages/Certification";
import MonitoringPage from './../Pages/MonitoringPage/MonitoringPage';

const AllRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe()).then((res) => {
      console.log(res);
    });
  }, [dispatch]);

  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="sign-in" element={<LoginScreen />} />
        <Route path="forgot-password" element={<ForgotPasswordScreen />} />
        <Route path="verify-otp" element={<OTPScreen />} />
        <Route path="reset-password/*" element={<ResetPasswordScreen />} />
        <Route path="register" element={<RegistrationScreen />} />
        <Route path="activate" element={<VerifyEmail />} />
        <Route
          path="/take-exam/:id"
          element={
            <TakeExamRoute isAuthenticated={isAuthenticated}>
              <TakeExamScreen />
            </TakeExamRoute>
          }
        ></Route>{" "}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes isAuthenticated={isAuthenticated}>
              <DashboardScreen />
            </ProtectedRoutes>
          }
        >
          <Route path="" element={<DashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="notifications" element={<NotificationPage />} />
          <Route path="exams" element={<ExamsPage />} />

          <Route path="exams/userexams" element={<UserExamsPage />} />

          <Route path="questionbank" element={<QuestionBank />} />

          <Route path="exams/:id" element={<ExamDetailPage />} />

          <Route path="exams/editexam/:id" element={<EditExam />} />

          <Route path="exams/preview/:id" element={<Preview />} />
          <Route path="create-exam" element={<CreateExam />} />
          <Route path="organizations" element={<OrganizationsPage />} />

          <Route
            path='organizations/*'
            element={<OrganizationsDetails />}
          />
          <Route
            path='create-organization'
            element={<CreateOrganization />}
          />
          <Route
            path='results'
            element={<ResultsPage />}
          />
          <Route
            path='exam-monitor'
            element={<MonitoringPage/>}
          />
          <Route
            path='certifications'
            element={<CertificationsPage />}
          />

<Route
            path='certifications/:id'
            element={<Certification />}
          />
          <Route
            path='activities'
            element={<ActivityLogPage />}
          />
          <Route
            path='staffs'
            element={<OrganizationStaffPage />}
          />
          <Route
            path='settings'
            element={<OrganizationSettingsPage />}
          />
          <Route
            path='trainingVideos'
            element={<TrainingVideosPage />}
          />



          <Route path="support" element={<SupportPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <ToastContainer position="top-right" />
    </>
  );
};

export default AllRoutes;
