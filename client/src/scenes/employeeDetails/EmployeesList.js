import React from "react";
import { Avatar, Box, Button, CircularProgress, useTheme } from "@mui/material";
import { useUpdateUserMutation, useGetUsersQuery } from "state/api";
import Header from "components/Header/Header";
import { DataGrid } from "@mui/x-data-grid";
import { Edit, PersonAdd } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const EmployeesList = () => {
    const theme = useTheme();

    const { data, isLoading } = useGetUsersQuery();
    const [updateEmployee] = useUpdateUserMutation();

    const navigate = useNavigate();

    const columns = [
        {
            field: "photo",
            headerName: "Photo",
            width: 60,
            renderCell: (params) => <Avatar src={params.row.photo || ""} />,
        },
        {
            field: "fullName",
            headerName: "Employee's Name",
            width: 150,
        },
        {
            field: "employeeId",
            headerName: "Employee ID",
            width: 100,
        },
        {
            field: "email",
            headerName: "Email",
            width: 200,
        },
        {
            field: "phone",
            headerName: "Phone Number",
            width: 130,
            renderCell: (params) => {
                return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
            },
        },
        {
            field: "doj",
            headerName: "Joining Date",
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
            field: "position",
            headerName: "Position",
            width: 180
        },
        {
            field: "status",
            headerName: "Status",
        },
        {
            field: "address",
            headerName: "Address",
            minWidth: 160,
            editable: true,
        },
        {
            field: "_id",
            headerName: "Edit",
            width: 50,
            renderCell: (params) => {
                <Edit
                    onClick={() => {
                        console.log(params.row._id);
                    }}
                />
            },
        },
    ]

    if (isLoading) {
        return (
            <Box display='flex' alignItems='center' justifyContent='center' width='100%' height='100%' m='0 auto'>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Box m="1.5rem 2.5rem" pb='1rem'>
            <Header title="EMPLOYEES DETAILS" subtitle="List of Total Employees" />
            <Box>
                <Button
                    sx={{
                        backgroundColor: theme.palette.secondary.light,
                        color: theme.palette.background.alt,
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 20px",
                        mt: '1rem'
                    }}
                    onClick={() => navigate('/add_employee')}
                >
                    <PersonAdd sx={{ mr: "10px" }} />
                    Add New Employee
                </Button>
            </Box>
            <Box
                maxWidth={1024}
                m="2rem 0"
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
                    overflowX: "auto",
                }}
            >
                <DataGrid
                    rows={data || []}
                    columns={columns}
                    loading={isLoading}
                    getRowId={(row) => row._id} />
            </Box>
        </Box >
    );
};

export default EmployeesList;