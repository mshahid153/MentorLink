import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "@/pages/Home";
import Header from "@/components/Header";
import MentorBooking from "@/pages/MentorBooking";
import MentorDetails from "@/pages/MentorDetails";
import Billing from "@/pages/Billing";
import Confirmation from "@/pages/Confirmation";
import About from "@/pages/About";
import Contact from "@/pages/Contact";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<MentorBooking />} />
          <Route path="/mentor/:id" element={<MentorDetails />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/confirmation" element={<Confirmation />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
