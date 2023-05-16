import React, { useState } from "react";
import { Box, Button, TextField, useTheme } from "@mui/material";
import Header from "components/Header/Header";
import { useAddBDMWorkMutation } from "state/api";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";

const AddBdmWork = () => {
    const theme = useTheme();

    const navigate = useNavigate();

    const employeeId = localStorage.getItem("id");
    const [addBDMWork] = useAddBDMWorkMutation(employeeId);

    const [formData, setFormData] = useState({
        date: dayjs(),
        clientName: '',
        phone: '',
        email: '',
        projectTitle: ""
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await addBDMWork({ ...formData, employeeId });
            // reset form data after successful submission
            setFormData({
                date: dayjs(),
                clientName: '',
                phone: '',
                email: '',
                projectTitle: ""
            });
        } catch (error) {
            console.log(error.message);
            swal('Error adding work details. Please try again.');
        } finally {
            swal('work detail added successfully!')
                .then(() => {
                    navigate('/');
                    window.location.reload();
                })
        }
    };

    const handleFormChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="ADD NEW WORK DETAIL" subtitle="Add a new project query of client" />
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
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        label="Select Date"
                                        value={formData.doj}
                                        onChange={(newdoj) => setFormData({ ...formData, doj: newdoj })}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            <TextField
                                required
                                label="Clinet's Name"
                                name="clientName"
                                value={formData.clientName}
                                onChange={handleFormChange}
                            />
                            <TextField
                                required
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleFormChange}
                            />
                            <TextField
                                required
                                label="Phone Number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleFormChange}
                            />
                            <TextField
                                label="Project Title"
                                name="projectTitle"
                                value={formData.projectTitle}
                                onChange={handleFormChange}
                            />
                        </Box>
                        <Button type="submit" variant="contained" color="primary">
                            Add Work Details
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box >
    );
};

export default AddBdmWork;