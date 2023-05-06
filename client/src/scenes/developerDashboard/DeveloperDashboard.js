import React from "react";
import {
    Delete,
    Edit,
    Email,
    PointOfSale,
} from "@mui/icons-material";
import {
    Box,
    useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetDeveloperWorksQuery } from "state/api";
import StatBox from "components/StatBox/StatBox";

const DeveloperDashboard = () => {

    const theme = useTheme();
    const employee = localStorage.getItem("id");
    const developerWorkdata = useGetDeveloperWorksQuery(employee)

    const columnsBDM = [
        {
            field: "createdAt",
            headerName: "Date",
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
            width: 180
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
            }
        },
        {
            field: "issues",
            headerName: "Issues",
            flex: 1
        },
        {
            field: "feedback",
            headerName: "Feedback",
            flex: 1
        },
        {
            field: "",
            headerName: "Edit",
            width: 50,
            renderCell: () => {
                <>
                    <Edit
                        onClick={() => {
                            alert("Are you sure ?")
                        }}
                    />
                </>
            },
        },
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
                    value={developerWorkdata && developerWorkdata.length}
                    //increase="+14%"
                    //description="Since last month"
                    icon={
                        <Email
                            sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                        />
                    }
                />
                <StatBox
                    title="Sales Today"
                    value={developerWorkdata && developerWorkdata.length}
                    increase="+21%"
                    description="Since last month"
                    icon={
                        <PointOfSale
                            sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                        />
                    }
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
                    rows={developerWorkdata.data || []}
                    columns={columnsBDM}
                    getRowId={(row) => row._id}
                    disableSelectionOnClick
                />
            </Box>
        </Box>
    );
};

export default DeveloperDashboard;