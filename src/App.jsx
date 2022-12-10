// import logo from './logo.svg';
import "./App.css";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Home from "./components/home";
import { Routes, Route } from "react-router-dom";
import About from "./components/about";
import SignUp from "./components/signup";
import SignIn from "./components/signin";
import SignOut from "./components/signout";

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <header>
        <Navbar />
      </header>

      <main className="flex-fill container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-out" element={<SignOut />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
