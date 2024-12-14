import "../src/dist/styles.css";
import About from "./Pages/About";
import Home from "./Pages/Home";
import Navbar from "../src/components/Navbar";
import { Route, Routes } from "react-router-dom";
import Models from "./Pages/Models";
import TestimonialsPage from "./Pages/TestimonialsPage";
import Team from "./Pages/Team";
import Contact from "./Pages/Contact";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import ModelsDetail from "./Pages/ModelsDetail";
import AddModels from "./Pages/AddModels";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import EditCar from "./Pages/EditCar";
import ProfilePage from "./Pages/ProfilePage";
import PaymentForm from "./Pages/PaymentForm";
import Manager from "./Pages/Manager";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="models" element={<Models />} />
        <Route path="testimonials" element={<TestimonialsPage />} />
        <Route path="team" element={<Team />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/car/:carId" element={<ModelsDetail />} />
        <Route path="admin" element={<AddModels />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route path="/edit-car/:id" element={<EditCar />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cart" element={<PaymentForm />} />
        <Route path="/manager" element={<Manager />} />
      </Routes>
    </>
  );
}

export default App;
