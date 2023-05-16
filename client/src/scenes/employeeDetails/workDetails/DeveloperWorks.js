import React from "react";
import { Box, Button, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import { useGetAllDevelopersWorksQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import { ArrowBackOutlined } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header/Header";
import { useNavigate } from "react-router-dom";

const DeveloperWorks = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { data, isLoading } = useGetAllDevelopersWorksQuery();
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

    const columns = [
        {
            field: "userId",
            headername: "Employee ID",
            width: 200
        },
        {
            field: "createdAt",
            headerName: "Entry On",
            width: 90,
            renderCell: (params) => {
                const date = new Date(params.value);
                return date.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                });
            },
        },
        {
            field: "project",
            headerName: "Project Title",
            width: 190,
        },
        {
            field: "technologies",
            headerName: "Technologies Used",
            width: 220,
        },
        {
            field: "startAt",
            headerName: "Start Date",
            renderCell: (params) => {
                const date = new Date(params.value);
                return date.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                });
            },
            width: 90
        },
        {
            field: "endAt",
            headerName: "End Date",
            renderCell: (params) => {
                const date = params.value ? new Date(params.value) : null;
                if (!date || isNaN(date.getTime())) {
                    return null;
                }
                return date.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                });
            },
            width: 90
        },
        {
            field: "issues",
            headerName: "Issues",
            width: 240,
            editable: false,
            sortable: false,
            filterable: false,
        },
        {
            field: "feedback",
            headerName: "Feedback",
            width: 240,
            editable: false,
            sortable: false,
            filterable: false,
        },
    ];


    if (isLoading) {
        return (
            <Box display='flex' alignItems='center' justifyContent='center' width='100%' height='100%' m='0 auto'>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Box m={isNonMediumScreens ? "1.5rem 2.5rem" : "1rem"} pb={isNonMediumScreens ? '1rem' : '0.5rem'} maxWidth={isNonMediumScreens ? 1024 : '100%'} >
            <FlexBetween>
                <Header title="ALL DEVELOPERS WORKS" subtitle="Details of all work entries done by developers" />
                <Box mt='1rem' display='flex' gap='1rem' >
                    <Button
                        sx={{
                            backgroundColor: theme.palette.secondary.light,
                            color: theme.palette.background.alt,
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                        onClick={() => navigate('/work details')}
                    >
                        <ArrowBackOutlined sx={{ mr: "10px" }} />
                        Go Back to All Employees Work Details
                    </Button>
                </Box>
            </FlexBetween>
            <Box
                m={isNonMediumScreens ? "2rem 0" : '1rem 0'}
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: theme.palette.primary.light,
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderTop: "none",
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${theme.palette.secondary[200]} !important`,
                    },
                    overflowX: 'auto',
                }}
            >
                <DataGrid
                    loading={isLoading}
                    getRowId={(row) => row._id}
                    rows={data || []}
                    columns={columns}
                />
            </Box>
        </Box>
    );
};

export default DeveloperWorks;