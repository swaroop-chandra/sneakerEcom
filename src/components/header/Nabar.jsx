import * as React from "react";
import { styled, alpha, createTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { SiTaichilang } from "react-icons/si";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { NavLink, useNavigate } from "react-router-dom";
import { useData } from "../../contexts/DataProvider";
import { useUserData } from "../../contexts/UserDataProvider";
import "./Navbar.css";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

export default function Navbar() {
  const { dispatch } = useData();
  const navigate = useNavigate();
  let email = localStorage.getItem("user_email");
  console.log(email);

  const notifications = [
    {
      id: 1,
      title: "New Arrivals 🔥",
      message: "Check out the latest shoe arrivals in our store!",
    },
    {
      id: 2,
      title: "Limited Stock 🔥",
      message: " Hurry up! Limited stock available for your favorite shoes.",
    },
    {
      id: 3,
      title: "Flash Sale ⚡",
      message:
        "Get amazing discounts on selected shoe models for a limited time.",
    },
  ];

  // const { userDataState } = useUserData();
  // const totalProductsInCart = userDataState.cartProducts?.reduce(
  //   (acc, curr) => {
  //     return acc + curr.qty;
  //   },
  //   0
  // );
  // const isProductInCart = () => (Number(totalProductsInCart) ? true : false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    if (email != null) {
      localStorage.removeItem("user_email");
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_name");
    }
    setAnchorEl(null);
    handleMobileMenuClose();
    navigate("/login");
    window.location.reload();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const [anchor, setAnchor] = React.useState(null);

  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [isDropdownOpen, setDropdownOpen] = React.useState(false);

  const [wish, setWish] = React.useState(0);
  const [cart, setCart] = React.useState(0);

  React.useEffect(() => {
    const local = JSON.parse(localStorage.getItem("cart_data"))?.length ?? 0;
    const localWish = JSON.parse(localStorage.getItem("wishlist"))?.length ?? 0;
    setWish(localWish);
    setCart(local);
  }, []);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <NavLink to="/login" style={{ textDecoration: "none", color: "#202020" }}>
        <MenuItem onClick={handleMenuClose} sx={{}}>
          {email !== null ? "Logout" : "Login"}
        </MenuItem>
      </NavLink>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <button
        data-text="Awesome"
        className="button"
        onClick={() => {
          scrollTo(0, 0);
          navigate("product-listing");
        }}
        style={{
          marginLeft: 5,
          borderBottom: "1px solid black",
          padding: 3,
        }}
      >
        <span className="actual-text">&nbsp;SNEAKERS&nbsp;</span>
        <span className="hover-text" aria-hidden="true" style={{}}>
          &nbsp;Explore&nbsp;
        </span>
      </button>
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={wish} color="error">
            <FavoriteBorderIcon />
          </Badge>
        </IconButton>
        <p>Liked Items</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          navigate(`/cart/list`);
        }}
      >
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={cart} color="error">
            <ShoppingCartCheckoutIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem>
        <div style={{ display: "flex" }}>
          <IconButton
            size="large"
            aria-label="show notifications"
            color="inherit"
            onClick={() => setModalOpen(true)}
          >
            <Badge badgeContent={notifications.length} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notificaton</p>

          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={() => setModalOpen(false)}>
                  &times;
                </span>
                <div className="notification-list">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={handleClose}
                      className="notification-item"
                    >
                      <h4>{notification.title}</h4>
                      <p>{notification.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <>
        <AppBar position="static" sx={{ backgroundColor: "#000000" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <NavLink
                to="/"
                style={{ textDecoration: "none", color: "#FDFDFD" }}
              >
                {/* <MenuIcon /> */}
                <SiTaichilang sx={{ mr: 2 }} />
              </NavLink>
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              DripSneak
            </Typography>

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) =>
                  dispatch({ type: "SEARCH", payload: e.target.value })
                }
                onKeyDown={(e) => {
                  e.key === "Enter" && navigate("/product-listing");
                }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {/* <Typography
                className="button-54"
                sx={{ padding: "12px", cursor: "pointer" }}
                
              >
                Explore
              </Typography> */}
              <button
                data-text="Awesome"
                className="button"
                onClick={() => {
                  scrollTo(0, 0);
                  navigate("product-listing");
                }}
              >
                <span className="actual-text">&nbsp;SNEAKERS&nbsp;</span>
                <span className="hover-text" aria-hidden="true">
                  &nbsp;Explore&nbsp;
                </span>
              </button>

              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={wish} color="error">
                  <FavoriteBorderIcon
                    onClick={() => navigate("/wishlist-details")}
                  />
                </Badge>
              </IconButton>

              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={cart} color="error">
                  <ShoppingCartCheckoutIcon
                    onClick={() => navigate("/cart/list")}
                  />
                </Badge>
              </IconButton>
              <div>
                <IconButton
                  size="large"
                  aria-label="show notifications"
                  color="inherit"
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                >
                  <Badge badgeContent={notifications.length} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <div className="dropdown-container">
                  {/* <button className="notification-button">
                    <span className="notification-badge">
                      {notifications.length}
                    </span>
                    <NotificationsIcon className="notification-icon" />
                  </button> */}
                  {isDropdownOpen && (
                    <div className="dropdown-menu">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          onClick={handleClose}
                          className="dropdown-item"
                        >
                          <h4>{notification.title}</h4>
                          <p>{notification.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </>
    </Box>
  );
}
