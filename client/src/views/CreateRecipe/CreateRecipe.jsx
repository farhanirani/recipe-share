import React, { useState, useEffect } from "react";
import CreateForm from "./form";
import NavBar from "../../components/Navbar/Navbar";
import { HeroContainer } from "../../components/Hero/HeroElements";
import { BrowserRouter as Router } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const tokenn = localStorage.getItem("auth-token");

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!tokenn || !tokenn.length) {
      alert("Please login first");
      history.push("/login");
    }
  }, []);

  return (
    <Router>
      <NavBar />
      <HeroContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "100px",
          }}
        >
          <CreateForm />
        </div>
      </HeroContainer>
    </Router>
  );
};

export default Hero;
