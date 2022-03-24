import "./App.css";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Navigation from "../components/Navbar/landingNav";
import { useHistory } from "react-router-dom";

function App() {
  const history = useHistory();

  return (
    <div className="App" style={{ maxWidth: "100vw", height: "100%" }}>
      <Navigation />

      <Container maxWidth="sm">
        <div class="content">
          <h1>For Foodies by Foodies</h1>
          <h4>
            Inspired by our great love for food and cooking, we created this
            portal for recipe developers, food bloggers, everyday chefs and
            everything in between.
          </h4>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              color="primary"
              style={{ borderRadius: "50px" }}
              onClick={() => {
                history.push("/login");
              }}
            >
              Already have an account?
            </Button>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#4BB543",
                marginLeft: "10px",
                borderRadius: "50px",
              }}
              onClick={() => {
                history.push("/signup");
              }}
            >
              Sign Up for Free
            </Button>
          </div>
        </div>
      </Container>

      <div class="ocean">
        <div class="wave"></div>
        <div class="wave"></div>
      </div>
    </div>
  );
}

export default App;
