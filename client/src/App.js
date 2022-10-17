import Home from "./components/Home";
import List from "./components/List";
import Footer from "./components/footer";
import Info from "./components/Info";
import Login from "./components/login";
import Register from "./components/Register";
import axios from "axios";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Modal from "./components/modal/Modal";
import Bookings from "./components/Bookings";
function App() {
  axios.defaults.withCredentials = true;
  return (
    <Router>
      <Routes>
        <Route exact path="/modal" element={<Modal />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/hotel" element={<List />}></Route>
        <Route exact path="/hotel/:id" element={<Info />}></Route>
        <Route exact path="/bookings" element={<Bookings />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
