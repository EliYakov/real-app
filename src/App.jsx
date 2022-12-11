// import logo from './logo.svg';
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Home from "./components/home";
import { Routes, Route } from "react-router-dom";
import About from "./components/about";
import SignUp from "./components/signup";
import SignIn from "./components/signin";
import SignOut from "./components/signout";
import MyCards from "./components/mycards";
import SignUpBiz from "./components/signupbiz";
import ProtectedRoute from "./components/common/protectedRoute";
import CreateCard from "./components/createCard";

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <ToastContainer />
      <header>
        <Navbar />
      </header>

      <main className="flex-fill container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-up-biz" element={<SignUpBiz />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-out" element={<SignOut />} />
          <Route
            path="my-cards"
            element={
              <ProtectedRoute onlyBiz>
                <MyCards />
              </ProtectedRoute>
            }
          />
          <Route
            path="create-cards"
            element={
              <ProtectedRoute onlyBiz>
                <CreateCard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
