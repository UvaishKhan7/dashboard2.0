import React from "react";
import { Box, CircularProgress, useTheme } from "@mui/material";
import { useGetBDMWorksQuery } from "state/api";
import Header from "components/Header/Header";
import { DataGrid } from "@mui/x-data-grid";
import StatBox from "components/StatBox/StatBox";

const EmployeesWork = () => {
    const theme = useTheme();
    const { data, isLoading } = useGetBDMWorksQuery();

    const columns = [
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
        <Box m="1.5rem 2.5rem">
            <Header title="Work Entries" subtitle="List of work entries done by employees." />
            {/* ROW 1 */}
            <Box sx={{ display: "flex", gap: '1rem' }}
            >
                <StatBox
                    title="BDM Work Entries"
                    value={(data && data?.length) || []}
                />
                <StatBox
                    title="Developer Work Entries"
                    value={(data && data?.length) || []}
                />
                <StatBox
                    title="Designer Work Entries"
                    value={(data && data?.length) || []}
                />
                <StatBox
                    title="Total Work Entries"
                    value={(data && data?.length) || []}
                />
            </Box>
            <Box
                mt="40px"
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

export default EmployeesWork;