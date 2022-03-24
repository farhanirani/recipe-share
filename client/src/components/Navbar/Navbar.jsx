import FastfoodIcon from "@material-ui/icons/Fastfood";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import "./style.css";
import { useHistory } from "react-router-dom";

export default function Navbar() {
  const history = useHistory();
  return (
    <div>
      <header
        style={{
          width: "100%",
          height: "60px",
          boxShadow: "0 1px 3px rgba(15, 15, 15, 0.13)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          class="logosection"
          style={{
            alignItems: "center",
            justifyItems: "center",
            display: "flex",
            paddingLeft: "1.5em",
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
            onClick={() => {
              window.location.href = "/home";
            }}
          >
            RecipeShare
          </Button>
        </div>
        <div
          className="right-section"
          style={{
            display: "flex",
            flex: "2",
            justifyContent: "flex-end",
            paddingRight: "40px",
          }}
        >
          <Avatar
            alt="Fki Chutiya"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTd8fHNtaWxpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
            style={{
              marginTop: "5px",
              marginLeft: "15px",
              marginRight: "15px",
            }}
          />
        </div>
      </header>
    </div>
  );
}
