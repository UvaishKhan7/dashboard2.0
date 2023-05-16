import React from "react";
import { Box, Button, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import { useGetAllBDMsWorksQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import { ArrowBackIosOutlined } from "@mui/icons-material";
import Header from "components/Header/Header";
import FlexBetween from "components/FlexBetween";
import { useNavigate } from "react-router-dom";

const BDMWorks = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { data, isLoading } = useGetAllBDMsWorksQuery();
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

    const columns = [
        {
            field: "userId",
            headername: "Employee ID",
            width: 200
        },
        {
            field: "projectTitle",
            headerName: "Project Title",
            flex: 1,
        },
        {
            field: "clientName",
            headerName: "Client Name",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "phone",
            headerName: "Phone Number",
            flex: 1,
            renderCell: (params) => {
                return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
            },
        },
        {
            field: "date",
            headerName: "Date",
            flex: 1,
            renderCell: (params) => {
                const date = new Date(params.value);
                return date.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                });
            },
        }
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
                <Header title="ALL BDM WORKS" subtitle="Details of all work entries done by BDMs or BDEs" />
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
                        <ArrowBackIosOutlined sx={{ mr: "10px" }} />
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

export default BDMWorks;