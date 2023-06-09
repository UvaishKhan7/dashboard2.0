import React from "react";
import { Box, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import { useGetClientsContactQuery } from "state/api";
import Header from "components/Header/Header";
import { DataGrid } from "@mui/x-data-grid";

const Clients = () => {
    const theme = useTheme();
    const { data, isLoading } = useGetClientsContactQuery();
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

    const columns = [
        {
            field: "fullName",
            headerName: "Client's Name",
        },
        {
            field: "email",
            headerName: "Email",
        },
        {
            field: "phone",
            headerName: "Phone Number",
            renderCell: (params) => {
                return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
            },
        },
        {
            field: "services",
            headerName: "Service",
        },
        {
            field: "requirement",
            headerName: "Requirement",
        },
        {
            field: "message",
            headerName: "Brief",
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
        <Box m={isNonMediumScreens ? "1.5rem 2.5rem" : "1rem"} pb={isNonMediumScreens ? '1rem' : '0.5rem'}>
            <Header title="Clients Contacted" subtitle="List of Clients contacted till now" />
            <Box
                mt={isNonMediumScreens ? "2rem" : "1rem"}
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
                    loading={isLoading || !data}
                    getRowId={(row) => row._id}
                    rows={data || []}
                    columns={columns}
                />
            </Box>
        </Box>
    );
};

export default Clients;