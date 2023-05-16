import React from "react";
import { Box, Button, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import { useGetAllFinanceDetailsQuery } from "state/api";
import Header from "components/Header/Header";
import { DataGrid } from "@mui/x-data-grid";
import { Edit, PersonAdd } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const FinanceDetails = () => {
    const theme = useTheme();

    const { data, isLoading } = useGetAllFinanceDetailsQuery();

    const [pageSize, setPageSize] = useState(10);

    const navigate = useNavigate();
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

    const columns = [
        {
            field: "employeeName",
            headerName: "Employee's Name",
            width: 150,
        },
        {
            field: "employeeId",
            headerName: "ID No.",
            width: 100,
        },
        {
            field: "aadhaar",
            headerName: "AADHAAR Number",
            width: 130,
            sortable: false,
            filterable: false,
        },
        {
            field: "pan",
            headerName: "PAN Number",
            width: 110,
            renderCell: (params) => {
                return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
            },
            sortable: false,
            filterable: false,
        },
        {
            field: "bankName",
            headerName: "Bank Details",
            width: 180,
            editable: true
        },
        {
            field: "accountNumber",
            headerName: "Bank A/C No.",
            minWidth: 160,
        },
        {
            field: "ifscCode",
            headerName: "IFSC Code",
            minWidth: 130,
            editable: true,
        },
        {
            field: "",
            headerName: "Edit",
            width: 50,
            renderCell: (params) => {
                const id = params.row._id;
                return (
                    <Edit onClick={() => navigate(`/update_finance_details/${id}`)} />
                );
            },
            editable: false,
            sortable: false,
            filterable: false,
        }
    ]

    if (isLoading) {
        return (
            <Box display='flex' alignItems='center' justifyContent='center' width='100%' height='100%' m='0 auto'>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Box m={isNonMediumScreens ? "1.5rem 2.5rem" : "1rem"} pb='1rem'>
            <Header title="FINANCE DETAILS" subtitle="List of Finance Details of All Employees" />
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
                    onClick={() => {
                        navigate('/add_finance_details');
                    }}
                >
                    <PersonAdd sx={{ mr: "10px" }} />
                    Add New Details
                </Button>
            </Box>
            <Box
                maxWidth={1024}
                m={isNonMediumScreens ? "2rem 0" : "1rem 0"}
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
                    getRowId={(row) => row._id}
                    rowsPerPageOptions={[5, 10, 20]}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    getRowSpacing={(params) => ({
                        top: params.isFirstVisible ? 0 : 5,
                        bottom: params.isLastVisible ? 0 : 5,
                    })}
                    disableRowSelectionOnClick
                />
            </Box>
        </Box >
    );
};

export default FinanceDetails;