import React from "react";
import { Box, Button, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import { useGetAllSSMsWorksQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import { ArrowBackIosOutlined } from "@mui/icons-material";
import Header from "components/Header/Header";
import FlexBetween from "components/FlexBetween";
import { useNavigate } from "react-router-dom";

const SSMWorks = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { data, isLoading } = useGetAllSSMsWorksQuery();
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

    const columns = [
        {
            field: "userId",
            headerName: "Employee ID",
            flex: 1,
        },
        {
            field: "postDate",
            headerName: "Post Date",
            flex: 1,
        },
        {
            field: "link",
            headerName: "Post Link",
            flex: 1,
        },
        {
            field: "plateform",
            headerName: "Plateform",
            flex: 1,
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
                <Header title="ALL SSM WORKS" subtitle="Details of all work entries done by Social Media Managers" />
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

export default SSMWorks;