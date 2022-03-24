import React, { useState } from "react";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CategoryIcon from "@material-ui/icons/Category";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import HomeIcon from "@material-ui/icons/Home";
import Avatar from "@material-ui/core/Avatar";
import "./style.css";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(0);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
          <Paper
            component="form"
            style={{
              padding: "2px 4px",
              display: "flex",
              flex: "2",
              alignItems: "center",
              maxWidth: "400px",
              minWidth: "200px",
              height: "40px",
            }}
          >
            <InputBase
              placeholder="Search Recipes"
              inputProps={{ "aria-label": "Search Recipes" }}
              style={{
                marginLeft: "theme.spacing(1)",
                flex: "1",
                paddingLeft: "15px",
              }}
            />
            <IconButton
              type="submit"
              aria-label="search"
              style={{ padding: "10" }}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
          <Avatar
            alt="Fki Chutiya"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTd8fHNtaWxpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
            style={{
              marginTop: "5px",
              marginLeft: "15px",
              marginRight: "15px",
            }}
          />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </div>
      </header>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {["Home", "Categories", "Bookmarks"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index === 0 ? <HomeIcon /> : null}
                {index === 1 ? <CategoryIcon /> : null}
                {index === 2 ? <BookmarkIcon /> : null}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "40px",
          }}
        >
          <button class="cybr-btn" style={{ paddingLeft: "10px" }}>
            Register<span aria-hidden>_</span>
            <span aria-hidden class="cybr-btn__glitch">
              Register_
            </span>
          </button>
        </div>
      </Drawer>
    </div>
  );
}
