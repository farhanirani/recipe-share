import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./view.scss";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";

const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8",
  },
  indicator: {
    backgroundColor: "#1890ff",
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&$selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: "#40a9ff",
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
  },
  demo2: {
    backgroundColor: "#2e1534",
  },
}));

export default function ViewRecipe() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const recipeIDFROMURL = window.location.pathname.substring(6);
  const [posts, setPosts] = useState([]);
  const [asdasd, setasdasd] = useState(false);

  useEffect(() => {
    (async () => {
      const postData = await axios.get("/api/recipe/" + recipeIDFROMURL);
      setPosts(postData.data);
      setasdasd(true);
      console.log(postData.data[0][0].recipe_image);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  if (asdasd) {
    return (
      <div class="recipe-card">
        <div
          style={{
            background: posts[0][0].recipe_image.length
              ? `url(${posts[0][0].recipe_image}) no-repeat 50% 50%`
              : "url(https://d2gk7xgygi98cy.cloudfront.net/6267-3-large.jpg) no-repeat 50% 50%",

            backgroundSize: "cover",
            height: "200px",
          }}
        ></div>
        <div class="recipe-card__body">
          <h1 class="recipe-card__heading">{posts[0][0].recipe_name}</h1>
          <h2 class="recipe-card__subhead">{posts[0][0].recipe_desc}</h2>
          <div className={classes.root}>
            <div className={classes.demo1}>
              <AntTabs
                value={value}
                onChange={handleChange}
                aria-label="ant example"
              >
                <AntTab label="Ingredients" />
                <AntTab label="Methods" />
              </AntTabs>
              <TabPanel value={value} index={0}>
                <Typography className={classes.padding} />
                <ul class="recipe-card__ingredients">
                  {posts[1].map((post) => (
                    <li>{post.instructions}</li>
                  ))}
                </ul>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div
                  id="recipe-card__content--preparations"
                  class="recipe-card__content"
                >
                  <ul class="preparation-steps">
                    {posts[2].map((post) => (
                      <li class="step_info">{post.instructions}</li>
                    ))}
                  </ul>
                </div>
              </TabPanel>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
