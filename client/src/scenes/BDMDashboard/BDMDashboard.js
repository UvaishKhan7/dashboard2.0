import React from "react";
import { Box, useTheme, } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import StatBox from "components/StatBox/StatBox";
import { useGetBDMWorksQuery } from "state/api";

const BDMDashboard = () => {

    const theme = useTheme();
    const employee = localStorage.getItem("id");
    const data = useGetBDMWorksQuery(employee);
    console.log("data", data)

    const columnsBDM = [
        {
            field: "projectTitle",
            headerName: "Project Title",
            width: 180
        },
        {
            field: "clientName",
            headerName: "Client's Name",
            width: 220,
        },
        {
            field: "date",
            headerName: "Query Date",
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
            field: "email",
            headerName: "Email",
        },
        {
            field: "phone",
            headerName: "Phone No.",
            flex: 1
        },
        {
            field: "feedback",
            headerName: "Feedback",
            flex: 1
        }
    ];

    return (
        <Box
            mt="20px"
            display="flex"
            flexDirection="column"
            gap="20px"
        >
            {/* ROW 1 */}
            <Box
                display="flex"
                gap="20px"
            >
                <StatBox
                    title="Check In"
                    value={data && data?.data?.length}
                />
                <StatBox
                    title="Sales Today"
                    value={data && data?.data?.length}
                />
            </Box>

            {/* ROW 2 */}
            <Box
                margin="2rem 0"
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
                    "& .MuiDataGrid-row": {
                        cursor: "pointer",
                    },
                    "& .MuiDataGrid-row.Mui-selected:hover": {
                        backgroundColor: "transparent",
                    },
                    "& .MuiDataGrid-row.Mui-selected .MuiDataGrid-cell": {
                        backgroundColor: theme.palette.primary[500],
                        color: theme.palette.common.white,
                    },
                    "& .MuiDataGrid-cellEditable": {
                        "& .MuiDataGrid-cell": {
                            cursor: "pointer",
                        },
                    },
                    overflowX: 'auto',
                }}
            >
                <DataGrid
                    rows={data?.data || []}
                    columns={columnsBDM}
                    getRowId={(row) => row._id}
                    disableSelectionOnClick
                />
            </Box>
        </Box>
    );
};

export default BDMDashboard;