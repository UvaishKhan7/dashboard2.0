import React from "react";
import {
    Avatar,
    Box,
    CircularProgress,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";
import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    PieChartOutlined,
    EqualizerOutlined,
    GroupsOutlined,
    LaptopMacOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const navItems1 = [
    {
        text: "Dashboard",
        icon: <HomeOutlined />,
    }
]

const navItems2 = [
    {
        text: "Employees Details",
        icon: null,
    },
    {
        text: "Employees List",
        icon: <GroupsOutlined />,
    },
    {
        text: "Employees Attendance",
        icon: <LaptopMacOutlined />,
    },

    {
        text: "Employees Work",
        icon: <LaptopMacOutlined />,
    },
];

const navItems3 = [
    {
        text: "Reports",
        icon: null,
    },
    {
        text: "Overview",
        icon: <PointOfSaleOutlined />,
    },
    {
        text: "Daily",
        icon: <TodayOutlined />,
    },
    {
        text: "Monthly",
        icon: <CalendarMonthOutlined />,
    },
    {
        text: "Breakdown",
        icon: <PieChartOutlined />,
    }
];

const navItems4 = [
    {
        text: "Super Admin",
        icon: null,
    },
    {
        text: "Clients",
        icon: <GroupsOutlined />,
    },
    {
        text: "Projects",
        icon: <LaptopMacOutlined />,
    },
    {
        text: "Revenue",
        icon: <EqualizerOutlined />,
    },
];

const Sidebar = ({
    user,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,
}) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    return (
        <Box component="nav">
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant="persistent"
                    anchor="left"
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                            color: theme.palette.secondary[200],
                            backgroundColor: theme.palette.background.alt,
                            boxSixing: "border-box",
                            borderWidth: isNonMobile ? 0 : "2px",
                            width: drawerWidth,
                        },
                    }}
                >
                    <Box sx={{ position: 'sticky', top: '0', backgroundColor: theme.palette.background.alt, zIndex: '999' }}>
                        <Box m="1rem auto" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                            <FlexBetween display='flex' color={theme.palette.secondary.main}>
                                <Box display="flex" alignItems="center" gap="0.5rem">
                                    <Typography variant="h5" fontWeight="bold">
                                        THE TROUBLESHOOTER
                                    </Typography>
                                </Box>
                                {!isNonMobile && (
                                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                        <ChevronLeft sx={{ color: theme.palette.secondary.main }} />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <Divider />
                        <Box>
                            <FlexBetween display='flex' flexDirection='column' width='100%' gap="1rem" m="1.5rem auto">
                                {user.photo ? (
                                    <Box
                                        component="img"
                                        alt="profile"
                                        src={user.photo}
                                        height="8rem"
                                        width="8rem"
                                        borderRadius="50%"
                                        sx={{ objectFit: "cover" }}
                                    />
                                ) : (
                                    <Avatar sx={{ width: '8rem', height: '8rem' }} />
                                )}
                                <Box display='flex' alignItems='center' textAlign="center" justifyContent='space-between' width='100%' p='0 1rem'>
                                    <Box display='flex' flexDirection='column' alignItems='center' textAlign="center" justifyContent='center' gap='0.25rem'>
                                        {[user.fullName, user.position] ? (
                                            <>
                                                <Typography
                                                    fontWeight="bold"
                                                    fontSize="0.9rem"
                                                    sx={{ color: theme.palette.secondary[100] }}
                                                >
                                                    {user.fullName}
                                                </Typography>
                                                <Typography
                                                    fontSize="0.8rem"
                                                    sx={{ color: theme.palette.primary[100] }}
                                                >
                                                    {user.position}
                                                </Typography>
                                            </>
                                        ) : (
                                            <CircularProgress />
                                        )}
                                    </Box>
                                    <IconButton>
                                        <SettingsOutlined
                                            sx={{
                                                color: theme.palette.secondary[300],
                                                fontSize: "25px ",
                                            }}
                                        />
                                    </IconButton>
                                </Box>
                            </FlexBetween>
                            <Divider />
                        </Box>
                    </Box>
                    <Box m='0.5rem 0' sx={{ backgroundColor: theme.palette.background.alt }}>
                        {['admin', 'superadmin', 'employee'].includes(user.role) && (
                            <List>
                                {navItems1.map(({ text, icon }) => {
                                    if (!icon) {
                                        return (
                                            <Typography key={text} variant='h6' sx={{ m: "1rem 0 0.5rem 1rem" }}>
                                                {text}
                                            </Typography>
                                        );
                                    }
                                    const lcText = text.toLowerCase();

                                    return (
                                        <ListItem key={text} disablePadding>
                                            <ListItemButton
                                                onClick={() => {
                                                    navigate(`/${lcText}`);
                                                    setActive(lcText);
                                                }}
                                                sx={{
                                                    backgroundColor:
                                                        active === lcText
                                                            ? theme.palette.secondary[300]
                                                            : "transparent",
                                                    color:
                                                        active === lcText
                                                            ? theme.palette.primary[600]
                                                            : theme.palette.secondary[100],
                                                }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        color:
                                                            active === lcText
                                                                ? theme.palette.primary[600]
                                                                : theme.palette.secondary[200],
                                                    }}
                                                >
                                                    {icon}
                                                </ListItemIcon>
                                                <ListItemText primary={text} />
                                                {active === lcText && (
                                                    <ChevronRightOutlined sx={{ ml: "auto" }} />
                                                )}
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        )}
                        {['admin', 'superadmin'].includes(user.role) && (
                            <List>
                                {navItems2.map(({ text, icon }) => {
                                    if (!icon) {
                                        return (
                                            <Typography key={text} variant='h6' sx={{ m: "1rem 0 0.5rem 1rem" }}>
                                                {text}
                                            </Typography>
                                        );
                                    }
                                    const lcText = text.toLowerCase();

                                    return (
                                        <ListItem key={text} disablePadding>
                                            <ListItemButton
                                                onClick={() => {
                                                    navigate(`/${lcText}`);
                                                    setActive(lcText);
                                                }}
                                                sx={{
                                                    backgroundColor:
                                                        active === lcText
                                                            ? theme.palette.secondary[300]
                                                            : "transparent",
                                                    color:
                                                        active === lcText
                                                            ? theme.palette.primary[600]
                                                            : theme.palette.secondary[100],
                                                }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        color:
                                                            active === lcText
                                                                ? theme.palette.primary[600]
                                                                : theme.palette.secondary[200],
                                                    }}
                                                >
                                                    {icon}
                                                </ListItemIcon>
                                                <ListItemText primary={text} />
                                                {active === lcText && (
                                                    <ChevronRightOutlined sx={{ ml: "auto" }} />
                                                )}
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        )}
                        {['admin', 'superadmin'].includes(user.role) && (
                            <List>
                                {navItems3.map(({ text, icon }) => {
                                    if (!icon) {
                                        return (
                                            <Typography key={text} variant='h6' sx={{ m: "1rem 0 0.5rem 1rem" }}>
                                                {text}
                                            </Typography>
                                        );
                                    }
                                    const lcText = text.toLowerCase();

                                    return (
                                        <ListItem key={text} disablePadding>
                                            <ListItemButton
                                                onClick={() => {
                                                    navigate(`/${lcText}`);
                                                    setActive(lcText);
                                                }}
                                                sx={{
                                                    backgroundColor:
                                                        active === lcText
                                                            ? theme.palette.secondary[300]
                                                            : "transparent",
                                                    color:
                                                        active === lcText
                                                            ? theme.palette.primary[600]
                                                            : theme.palette.secondary[100],
                                                }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        color:
                                                            active === lcText
                                                                ? theme.palette.primary[600]
                                                                : theme.palette.secondary[200],
                                                    }}
                                                >
                                                    {icon}
                                                </ListItemIcon>
                                                <ListItemText primary={text} />
                                                {active === lcText && (
                                                    <ChevronRightOutlined sx={{ ml: "auto" }} />
                                                )}
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        )}
                        {['superadmin'].includes(user.role) && (
                            <List>
                                {navItems4.map(({ text, icon }) => {
                                    if (!icon) {
                                        return (
                                            <Typography key={text} variant='h6' sx={{ m: "1rem 0 0.5rem 1rem" }}>
                                                {text}
                                            </Typography>
                                        );
                                    }
                                    const lcText = text.toLowerCase();

                                    return (
                                        <ListItem key={text} disablePadding>
                                            <ListItemButton
                                                onClick={() => {
                                                    navigate(`/${lcText}`);
                                                    setActive(lcText);
                                                }}
                                                sx={{
                                                    backgroundColor:
                                                        active === lcText
                                                            ? theme.palette.secondary[300]
                                                            : "transparent",
                                                    color:
                                                        active === lcText
                                                            ? theme.palette.primary[600]
                                                            : theme.palette.secondary[100],
                                                }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        color:
                                                            active === lcText
                                                                ? theme.palette.primary[600]
                                                                : theme.palette.secondary[200],
                                                    }}
                                                >
                                                    {icon}
                                                </ListItemIcon>
                                                <ListItemText primary={text} />
                                                {active === lcText && (
                                                    <ChevronRightOutlined sx={{ ml: "auto" }} />
                                                )}
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        )}
                    </Box>
                </Drawer>
            )
            }
        </Box >
    );
};

export default Sidebar;