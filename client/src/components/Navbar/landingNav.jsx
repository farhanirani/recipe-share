import React from "react";
import Button from "@material-ui/core/Button";
import FastfoodIcon from "@material-ui/icons/Fastfood";

export default function landingNav() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
      }}
    >
      <div
        class="logosection"
        style={{
          alignItems: "center",
          justifyItems: "center",
          textAlign: "center",
          display: "flex",
        }}
      >
        <FastfoodIcon
          style={{ fontSize: "36px", color: "black", padding: "5px 25px" }}
        ></FastfoodIcon>
        <Button
          class="trademark"
          color="inherit"
          style={{
            color: "black",
            fontSize: "30px",
            background: "transparent",
            border: "0",
            padding: "0",
          }}
        >
          RecipeShare
        </Button>
      </div>
      <nav>
        <ul class="nav_links">
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/home">Recipes</a>
          </li>
          <li>
            <a href="/home">Categories</a>
          </li>
          <li>
            <a href="/">Contact Us</a>
          </li>
        </ul>
      </nav>
      <a class="register" href="/">
        <button class="register_btn">
          <a href="/signup" style={{ textDecoration: "none", color: "black" }}>
            Sign Up
          </a>
        </button>
      </a>
    </header>
  );
}
