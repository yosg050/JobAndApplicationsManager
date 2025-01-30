import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import logo from "./../assets/logo-new.png";
import defaultAvatar from "./../assets/defualtAvatar.png";
import { Link, Outlet } from "react-router-dom";
import { signOut } from "aws-amplify/auth";

interface Page {
  name: string;
  path: string;
}

interface Navbar {
  userType: "admin" | "employer" | "candidate";
}

const ResponsiveAppBar: React.FC<Navbar> = ({ userType }) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [photoURL, _] = React.useState<string>(defaultAvatar);

  async function handleSignOut() {
    await signOut();
  }

  let pages: Page[] = [];
  let greeting = "";

  if (userType === "admin") {
    pages = [
      { name: "משרות", path: "/admin/jobs" },
      { name: "מועמדים", path: "/admin/candidates_info" },
      { name: "מעסיקים", path: "/admin/employers_info" },
    ];
    greeting = " שלום, מנהל";
  } else if (userType === "employer") {
    pages = [
      { name: "המשרות שלי", path: "/employer/my_jobs" },
      { name: "פרטי מעסיק", path: "/employer/my_details" },
    ];
    greeting = "Hello";
  } else if (userType === "candidate") {
    pages = [
      // Add relevant pages for candidates
      { name: "פרטים אישיים", path: "/Candidate-info" },
    ];
    greeting = "..שלום"; // Customize greeting for candidates
  }

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img src={logo} height={100} alt="logo" />

            {/* Navigation menu */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <Button key={page.name} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link
                        to={page.path}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {page.name}
                      </Link>
                    </Typography>
                  </Button>
                ))}
              </Menu>
            </Box>

            {/* Desktop navigation menu */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Link
                    to={page.path}
                    style={{
                      fontSize: "larger",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    {page.name}
                  </Link>
                </Button>
              ))}
            </Box>

            {/* User menu */}
            <Box sx={{ display: "flex", flexGrow: 0 }}>
              <Button
                color="inherit"
                style={{ marginLeft: "10px" }}
                onClick={handleSignOut}
              >
                התנתק
              </Button>
              <h2 style={{ margin: 5 }}>{greeting}</h2>

              <Avatar alt="User Avatar" src={photoURL} />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
      <Box sx={{ mt: 8 }}></Box>
    </>
  );
};

export default ResponsiveAppBar;
