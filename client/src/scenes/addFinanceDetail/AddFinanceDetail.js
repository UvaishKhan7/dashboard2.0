import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, TextField, useTheme } from "@mui/material";
import Header from "components/Header/Header";
import { useAddFinanceDetailMutation, useGetFinanceDetailQuery, useUpdateFinanceDetailMutation } from "state/api";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
    userId: "",
    employeeName: '',
    employeeId: '',
    aadhaar: '',
    pan: "",
    bankName: "",
    accountNumber: '',
    ifscCode: "",
}

const AddFinanceDetail = () => {
    const theme = useTheme();

    const navigate = useNavigate();
    const { id } = useParams();

    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const { data, isLoading } = useGetFinanceDetailQuery(id);
    const [addFinanceDetail] = useAddFinanceDetailMutation();
    const [updateFinanceDetail] = useUpdateFinanceDetailMutation({ ...formData, id });

    useEffect(() => {
        if (id) {
            setFormData({ ...data })
        } else {
            setFormData({ ...initialState })
        }
        return () => {
            setFormData({ ...initialState })
        }
    }, [id, data]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!id) {
            try {
                setUploading(true);
                const res = await addFinanceDetail({ ...formData })
                if (res) {
                    setUploading(false);
                    // reset form data after successful submission
                    setFormData({
                        userId: "",
                        employeeName: '',
                        employeeId: '',
                        aadhaar: '',
                        pan: "",
                        bankName: "",
                        accountNumber: '',
                        ifscCode: "",
                    });
                    swal("Added.", 'Financial details added successfully!', 'success', {
                        buttons: false,
                        timer: 2500,
                    })
                    navigate('/finance details');
                    window.location.reload();
                } else {
                    setUploading(false);
                    swal('Oops!', "Something went wrong!", 'error', {
                        buttons: false,
                        timer: 3000,
                    });
                }
            } catch (error) {
                console.error(error.message);
                setUploading(false);
                swal('Oops!', 'Error adding financial details. Please try again.', 'error', {
                    buttons: false,
                    timer: 3000,
                });
            }
        } else {
            try {
                setUploading(true);
                const res = await updateFinanceDetail({ ...formData, id })
                console.log('res', res)
                if (res) {
                    setUploading(false);
                    // reset form data after successful submission
                    setFormData({
                        userId: "",
                        employeeName: '',
                        employeeId: '',
                        aadhaar: '',
                        pan: "",
                        bankName: "",
                        accountNumber: '',
                        ifscCode: "",
                    });
                    swal("Updated.", 'Financial details updated successfully!', 'success', {
                        buttons: false,
                        timer: 2500,
                    }).then(() => {
                        navigate('/finance details');
                        window.location.reload();
                    })
                }
            } catch (error) {
                console.error("error", error)
                setUploading(false);
                swal('Oops!', 'Error updating financial details. Please try again.', 'error', {
                    buttons: false,
                    timer: 3000,
                });
            }
        }
    };

    const handleFormChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    if (isLoading) {
        return (
            <Box display='flex' alignItems='center' justifyContent='center' width='100%' height='100%' m='0 auto'>
                <CircularProgress />
            </Box>
        )
    }

    return (
        < Box m="1.5rem 2.5rem" >
            <Header title={id ? "UPDATE FINANCIAL DETAILS" : "ADD FINANCIAL DETAILS"} subtitle={id ? `Update the financial details of ${data?.employeeName}` : "Add the financial details of an employee"} />
            <Box
                mt="40px"
                p='1rem'
                borderRadius='0.8rem'
                sx={{
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                    borderBottom: "none",
                    "& .MuiInputBase-root": {
                        backgroundColor: theme.palette.primary.light,
                    },
                    "& .MuiInputLabel-root": {
                        color: `${theme.palette.secondary[300]} !important`,
                    },
                }}
            >
                <form onSubmit={handleFormSubmit} >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{
                            m: '1rem auto',
                            display: 'flex', flexWrap: 'wrap',
                            alignItems: 'center', justifyContent: 'center',
                            gap: '1rem', borderRadius: '0.5rem',
                        }}>
                            <TextField
                                sx={{ width: "14rem" }}
                                required
                                label="Database ID"
                                name="userId"
                                id="userId"
                                value={formData.userId || ""}
                                onChange={handleFormChange}
                            />
                            <TextField
                                sx={{ width: "14rem" }}
                                required
                                label="Employee Name"
                                name="employeeName"
                                id="employeeName"
                                value={formData.employeeName || ""}
                                onChange={handleFormChange}
                            />
                            <TextField
                                sx={{ width: "14rem" }}
                                required
                                label="Employee Id"
                                name="employeeId"
                                id="employeeId"
                                value={formData.employeeId || ""}
                                onChange={handleFormChange}
                            />
                            <TextField
                                sx={{ width: "14rem" }}
                                label="AADHAAR No."
                                name="aadhaar"
                                id="aadhaar"
                                value={formData.aadhaar || ""}
                                onChange={handleFormChange}
                            />
                            <TextField
                                sx={{ width: "14rem" }}
                                label="PAN No."
                                name="pan"
                                id="pan"
                                value={formData.pan || ""}
                                onChange={handleFormChange}
                            />
                            <TextField
                                sx={{ width: "14rem" }}
                                label="Bank Details"
                                name="bankName"
                                id="bankName"
                                value={formData.bankName || ""}
                                onChange={handleFormChange}
                            />
                            <TextField
                                sx={{ width: "14rem" }}
                                label="Account Number"
                                name="accountNumber"
                                id="accountNumber"
                                value={formData.accountNumber || ""}
                                onChange={handleFormChange}
                            />
                            <TextField
                                sx={{ width: "14rem" }}
                                label="IFSC Code"
                                name="ifscCode"
                                id="ifscCode"
                                value={formData.ifscCode || ""}
                                onChange={handleFormChange}
                            />
                        </Box>
                        <Button sx={{ width: "14rem", height: '3rem' }} type="submit" variant="contained" color="primary">
                            {uploading ? "Uploading..." : (id ? "Update Details" : "Add Details")}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default AddFinanceDetail;