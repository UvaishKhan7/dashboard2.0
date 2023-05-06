import React, { useState } from "react";
import { Box, Button, TextField, useTheme } from "@mui/material";
import Header from "components/Header/Header";
import { useAddDeveloperWorkMutation } from "state/api";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";

const AddDeveloperWork = () => {
    const theme = useTheme();

    const navigate = useNavigate();

    const employeeId = localStorage.getItem("id");
    const [addDeveloperWork] = useAddDeveloperWorkMutation(employeeId);

    const [formData, setFormData] = useState({
        project: "",
        technologies: "",
        startAt: dayjs(),
        finishedAt: "",
        issues: "",
        feedback: '',
    });


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await addDeveloperWork({ ...formData, employeeId });
            // reset form data after successful submission
            setFormData({
                project: "",
                technologies: "",
                startAt: dayjs(),
                finishedAt: dayjs(),
                issues: "",
                feedback: '',
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
                <form onSubmit={handleFormSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{
                            m: '1rem auto',
                            display: 'flex', flexWrap: 'wrap',
                            alignItems: 'center', justifyContent: 'center',
                            gap: '1rem', borderRadius: '0.5rem',
                            padding: '2rem 4rem'
                        }}>
                            <TextField
                                required
                                label="Project's Name"
                                name="project"
                                value={formData.project}
                                onChange={handleFormChange}
                            />
                            <TextField
                                required
                                label="Technologies Using"
                                name="technologies"
                                value={formData.technologies}
                                onChange={handleFormChange}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        label="Start Date"
                                        value={formData.startAt}
                                        onChange={(newdoj) => setFormData({ ...formData, doj: newdoj })}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        label="Finished Date"
                                        value={formData.finishedAt}
                                        onChange={(newdoj) => setFormData({ ...formData, doj: newdoj })}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            <TextField
                                required
                                label="Issues Facing"
                                name="issues"
                                value={formData.issues}
                                onChange={handleFormChange}
                            />
                            <TextField
                                label="Feedback"
                                name="feedback"
                                value={formData.feedback}
                                onChange={handleFormChange}
                            />
                        </Box>
                        <Button type="submit" variant="contained" color="primary">
                            Add Work Details
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default AddDeveloperWork;