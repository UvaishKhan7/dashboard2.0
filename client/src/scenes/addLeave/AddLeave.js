import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, useTheme } from "@mui/material";
import Header from "components/Header/Header";
import { useAddLeaveMutation, useGetLeaveQuery, useUpdateLeaveMutation } from "state/api";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

const leaves = [
    { value: 'casual', label: 'Casual Leave' },
    { value: 'sick', label: 'Sick Leave' },
];

const AddLeave = () => {
    const theme = useTheme();

    const { id } = useParams();
    const navigate = useNavigate();

    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        userId: "",
        employeeName: '',
        leaveType: '',
        leaveFrom: dayjs(),
        leaveUpto: dayjs(),
        reason: '',
    });

    const { data, isLoading } = useGetLeaveQuery(id);
    const [addLeave] = useAddLeaveMutation();
    const [updateLeave] = useUpdateLeaveMutation({ ...formData });

    useEffect(() => {
        if (id) {
            setFormData({ ...data, leaveFrom: dayjs(formData.leaveFrom), leaveUpto: dayjs(formData.leaveUpto) })
        } else {
            setFormData({
                userId: "",
                employeeName: '',
                leaveType: '',
                leaveFrom: dayjs(),
                leaveUpto: dayjs(),
                reason: '',
            })
        }
        return () => {
            setFormData({
                userId: "",
                employeeName: '',
                leaveType: '',
                leaveFrom: dayjs(),
                leaveUpto: dayjs(),
                reason: '', 
            })
        }// eslint-disable-next-line
    }, [id, data]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!id) {
            try {
                setUploading(true);
                const res = await addLeave({ ...formData, leaveFrom: dayjs(formData.leaveFrom), leaveUpto: dayjs(formData.leaveUpto) })
                if (res) {
                    setUploading(false);
                    // reset form data after successful submission
                    setFormData({
                        userId: "",
                        employeeName: '',
                        leaveType: '',
                        leaveFrom: dayjs(),
                        leaveUpto: dayjs(),
                        reason: '',
                    });
                    await swal("Added.", 'Leave details added successfully!', 'success', {
                        buttons: false,
                        timer: 2500,
                    });
                    navigate('/leaves details');
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
                swal('Oops!', 'Error adding leave details. Please try again.', 'error', {
                    buttons: false,
                    timer: 3000,
                });
            }
        } else {
            try {
                setUploading(true);
                const res = await updateLeave({ ...formData, id })
                if (res) {
                    setUploading(false);
                    setFormData({
                        userId: "",
                        employeeName: '',
                        leaveType: '',
                        leaveFrom: dayjs(),
                        leaveUpto: dayjs(),
                        reason: '',
                    });
                    await swal("Updated.", 'Leave details updated successfully!', 'success', {
                        buttons: false,
                        timer: 2500,
                    })
                    navigate('/leaves details');
                    window.location.reload();
                } else if (res.error) {
                    setUploading(false);
                    console.error(res.error);
                    swal('Oops!', "Something went wrong!", 'error', {
                        buttons: false,
                        timer: 3000,
                    });
                }
            } catch (error) {
                console.error("error", error)
                setUploading(false);
                swal('Oops!', 'Error updating leave details. Please try again.', 'error', {
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
    };

    return (
        < Box m="1.5rem 2.5rem" >
            <Header title={id ? "UPDATE LEAVE DETAILS" : "ADD LEAVE DETAILS"} subtitle={id ? `Update the leave details of ${data?.employeeName}` : "Add the leave details"} />
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
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem', m: '0 auto' }}>
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
                            <FormControl sx={{ width: "14rem" }}>
                                <InputLabel id="demo-simple-select-label">Leave Type</InputLabel>
                                <Select
                                    required
                                    label="Leave Type"
                                    name="leaveType"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={formData.leaveType || ""}
                                    onChange={handleFormChange}
                                >
                                    {leaves.map((item) => (
                                        <MenuItem key={item.value} value={item.value || ""}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Box sx={{ width: "14rem" }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            required
                                            label="Leave From"
                                            value={formData.leaveFrom}
                                            onChange={(newDate) => setFormData({ ...formData, leaveFrom: newDate })}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Box>
                            <Box sx={{ width: "14rem" }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            required
                                            label="Leave Up to"
                                            value={formData.leaveUpto}
                                            onChange={(newDate) => setFormData({ ...formData, leaveUpto: newDate })}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Box>
                            <TextField
                                sx={{ width: "14rem" }}
                                label="Reason"
                                name="reason"
                                id="reason"
                                value={formData.reason || ""}
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

export default AddLeave;