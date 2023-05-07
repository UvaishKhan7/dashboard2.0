import React, { useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from 'components/Navbar/Navbar';
import Sidebar from 'components/Sidebar/Sidebar';
import { useGetUserQuery } from 'state/api';

export default function Layout() {

    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const userId = localStorage.getItem("id");

    const { data, isLoading } = useGetUserQuery(userId);

    return (
        <Box display={isNonMobile ? 'flex' : 'block'} maxWidth="100%" height="100%" >
            <Sidebar
                user={data || {}}
                isNonMobile={isNonMobile}
                drawerWidth="250px"
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                isLoading={isLoading}
            />
            <Box flexGrow={1}>
                <Navbar
                    user={data || {}}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                    sx={{ position: 'sticky', top: '0' }}
                    isLoading={isLoading}
                />
                <Outlet />
            </Box>
        </Box>
    )
}
