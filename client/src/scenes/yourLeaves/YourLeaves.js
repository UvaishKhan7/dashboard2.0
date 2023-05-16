import React from "react";
import { Box, Button, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import { useDeleteLeaveMutation, useGetUserLeavesQuery } from "state/api";
import Header from "components/Header/Header";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline, Edit, PersonAdd } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import swal from "sweetalert";

const YourLeaves = () => {
    const theme = useTheme();

    const userId = localStorage.getItem("id");

    const { data, isLoading } = useGetUserLeavesQuery(userId);

    const [pageSize, setPageSize] = useState(10);

    const navigate = useNavigate();
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

    const [deleteLeave] = useDeleteLeaveMutation();

    const handleDelete = async (id) => {
        try {
            await swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this data!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then(async (willDelete) => {
                    if (willDelete) {
                        await deleteLeave(id)
                        await swal("Poof! Your data has been deleted!", {
                            icon: "success",
                        });
                        window.location.reload();
                    } else {
                        swal("Your data is safe!");
                    }
                });
        } catch (error) {
            swal("Something went wrong")
        }
    };

    const columns = [
        {
            field: "employeeName",
            headerName: "Employee's Name",
            width: 150,
        },
        {
            field: "leaveType",
            headerName: "Leave Type",
            width: 100,
        },
        {
            field: "leaveFrom",
            headerName: "Leave From",
            width: 110,
            renderCell: (params) => {
                const date = new Date(params.value);
                return date.toLocaleDateString("en-IN");
            },
        },
        {
            field: "leaveUpto",
            headerName: "Leave Upto",
            width: 110,
            renderCell: (params) => {
                const date = new Date(params.value);
                return date.toLocaleDateString("en-IN");
            },
        },
        {
            field: "reason",
            headerName: "Reaseon",
            flex: 1,
            editablle: true
        },
        {
            field: "edit",
            headerName: "Edit",
            width: 60,
            renderCell: (params) => {
                const id = params.row._id;
                return (
                    <Edit onClick={() => navigate(`/update_leave/${id}`)} />
                );
            },
            editable: false,
            sortable: false,
            filterable: false,
        },
        {
            field: "delete",
            headerName: "Delete",
            width: 60,
            renderCell: (params) => {
                const id = params.row._id;
                return (
                    <DeleteOutline onClick={() => handleDelete(id)} />
                );
            },
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
    };

    return (
        <Box m={isNonMediumScreens ? "1.5rem 2.5rem" : "1rem"} pb='1rem'>
            <Header title="LEAVES DETAILS" subtitle="List of Leave Details of All Employees" />
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
                        navigate('/add_leave');
                    }}
                >
                    <PersonAdd sx={{ mr: "10px" }} />
                    Add Leave Details
                </Button>
            </Box>
            <Box
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

export default YourLeaves;