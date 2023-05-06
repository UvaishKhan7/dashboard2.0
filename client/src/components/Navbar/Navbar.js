import React, { useState } from 'react';
import FlexBetween from 'components/FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from 'state';
import {
    AppBar,
    Button,
    Box,
    Typography,
    IconButton,
    InputBase,
    Toolbar,
    Menu,
    MenuItem,
    useTheme,
    MenuList,
    CircularProgress,
    Avatar,
} from "@mui/material";
import {
    LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    Search,
    SettingsOutlined,
    ArrowDropDownOutlined,
} from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';

export default function Navbar({ user, isSidebarOpen, setIsSidebarOpen }) {

    const dispatch = useDispatch();
    const theme = useTheme();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    }

    return (
        <AppBar
            sx={{
                position: "sticky",
                top: '0',
                background: theme.palette.primary[700],
                boxShadow: "none"
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                {/* LEFT SIDE */}
                <FlexBetween sx={{ display: 'flex', gap: '1rem' }}>
                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)} >
                        <MenuIcon />
                    </IconButton>
                    {['admin', 'superadmin'].includes(user.role) && (
                        <FlexBetween
                            backgroundColor={theme.palette.background.alt}
                            borderRadius="0.5rem"
                            justifyContent='space-between'
                            p='0.2rem 0.5rem 0.2rem 1rem'
                        >
                            <InputBase placeholder='Search...' />
                            <IconButton>
                                <Search />
                            </IconButton>
                        </FlexBetween>
                    )}
                </FlexBetween>

                {/* RIGHT SIDE */}
                <FlexBetween display='flex' gap='0.25rem'>
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === 'dark' ? (
                            <DarkModeOutlined sx={{ fontSize: '25px' }} />
                        ) : (
                            <LightModeOutlined sx={{ fontSize: '25px' }} />
                        )}
                    </IconButton>
                    <FlexBetween>
                        <Button
                            onClick={handleClick}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                textTransform: "none",
                                gap: "0.8rem",
                            }}
                        >
                            {user.photo ? (
                                <Box
                                    component="img"
                                    alt="profile"
                                    src={user.photo}
                                    height="32px"
                                    width="32px"
                                    borderRadius="50%"
                                    sx={{ objectFit: "cover" }}
                                />
                            ) : (
                                <Avatar sx={{ width: '32px', height: '32px' }} />
                            )}
                            <Box textAlign="left" sx={{
                                ml: 0,
                                mr: 0,
                            }}
                            >
                                {[user.fullName, user.position] ? (
                                    <>
                                        <Typography
                                            fontWeight="bold"
                                            fontSize="0.85rem"
                                            sx={{ color: theme.palette.secondary[100] }}
                                        >
                                            {user.fullName}
                                        </Typography>
                                        <Typography
                                            fontSize="0.75rem"
                                            sx={{ color: theme.palette.secondary[200] }}
                                        >
                                            {user.position}
                                        </Typography>
                                    </>
                                ) : (
                                    <CircularProgress />
                                )}
                            </Box>
                            <ArrowDropDownOutlined
                                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
                            />
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={isOpen}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                        >
                            <MenuList disablePadding>
                                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                            </MenuList>
                        </Menu>
                    </FlexBetween>
                </FlexBetween>
            </Toolbar>
        </AppBar>
    )
}
