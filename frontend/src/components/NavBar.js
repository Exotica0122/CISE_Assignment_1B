import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import * as React from "react";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
const pages = [
    { title: "Home", link: "/", type: 'all' },
    { title: "View Articles", link: "/SEPractice", type: 'all' },
    { title: "Submit Article", link: "/SubmitArticle", type: 'all' },
    { title: "Moderator Page", link: "/admin", type: 'moderator', qty: 0 },
    { title: "Analyst Page", link: "/analyst", type: 'analyst', qty: 0 },
    { title: "Login Page", link: "/LoginForm", type: 'all' },
];



const NavBar = ({ currentUser, qtyPendingItems }) => {
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };


    const renderButton = (page) => {
        return (<Button
            key={page.title}
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: "white", display: "block" }}
            component={Link}
            to={page.link}
        >
            {page.title}

            {page.qty > 0 &&
                <Badge color="primary" badgeContent={page.qty} sx={{ marginTop: "-26px" }} />
            }
        </Button>);
    }

    const renderMenuItem = (page) => {
        return (<MenuItem
            key={page.title}
            onClick={handleCloseNavMenu}
            sx={{
                my: 2,
                mx: 2,
                color: "black",
                display: "block",
            }}
            component={Link}
            to={page.link}
        >
            {page.title}

            {page.qty > 0 &&
                <Badge color="primary" badgeContent={page.qty} sx={{ marginTop: "-26px" }} />
            }
        </MenuItem>)
    }

    pages.filter(h => h.type !== 'all').forEach(n => {
        n.qty = qtyPendingItems;
    })

    return (
        <AppBar position="static" style={{ background: "#2E3B55" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <LibraryBooksIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "sans-serif",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none"
                        }}
                    >
                        SPEED
                    </Typography>

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
                                horizontal: "left"
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left"
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" }
                            }}
                        >
                            {pages.map((page) => {
                                if (page.type !== 'all') {
                                    if (page.type !== currentUser.type) {
                                        return null;
                                    }
                                }

                                return renderMenuItem(page);
                            })}
                        </Menu>
                    </Box>
                    <LibraryBooksIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "sans-serif",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none"
                        }}
                    >
                        SPEED
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {pages.map((page) => {
                            if (page.type !== 'all') {
                                if (page.type !== currentUser.type) {
                                    return null;
                                }
                            }

                            return renderButton(page);
                        })}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavBar;
