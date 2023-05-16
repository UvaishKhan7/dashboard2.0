import React, { useState } from "react";
import { Box, Button, CircularProgress, TextField, useTheme } from "@mui/material";
import Header from "components/Header/Header";
import { useAddDeveloperWorkMutation, useGetDeveloperWorkQuery, useUpdateDeveloperWorkMutation } from "state/api";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { useEffect } from "react";

const AddDeveloperWork = () => {
    const theme = useTheme();

    const navigate = useNavigate();

    const employeeId = localStorage.getItem("id");
    const { id } = useParams();

    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        project: "",
        technologies: "",
        startAt: dayjs(),
        finishedAt: "",
        issues: "",
        feedback: '',
    });

    const { data, isLoading } = useGetDeveloperWorkQuery(id);
    const [addDeveloperWork] = useAddDeveloperWorkMutation(employeeId);
    const [updateWork] = useUpdateDeveloperWorkMutation({ ...formData });

    useEffect(() => {
        if (id) {
            setFormData({ ...data, startAt: dayjs(formData.startAt), finishedAt: dayjs(formData.finishedAt) })
        } else {
            setFormData({
                project: "",
                technologies: "",
                startAt: dayjs(),
                finishedAt: "",
                issues: "",
                feedback: '',
            })
        }
        return () => {
            setFormData({
                project: "",
                technologies: "",
                startAt: dayjs(),
                finishedAt: "",
                issues: "",
                feedback: '',
            })
        }// eslint-disable-next-line
    }, [id, data])

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!id) {
            try {
                setUploading(true);
                const res = await addDeveloperWork({ ...formData, employeeId, startAt: dayjs(formData.startAt), finishedAt: dayjs(formData.finishedAt) });
                if (res) {
                    setUploading(false);
                    setFormData({
                        project: "",
                        technologies: "",
                        startAt: dayjs(),
                        finishedAt: dayjs(),
                        issues: "",
                        feedback: '',
                    });
                    await swal("Added", "Word Details has been submitted.", 'success', { buttons: false, timer: 2500 });
                    navigate('/developerWorks');
                    window.location.reload();
                } else {
                    setUploading(false);
                    swal("Oops!", 'Something went wrong!', 'error', { buttons: false, timer: 3000 })
                }
            } catch (error) {
                console.log(error.message);
                setUploading(false);
                swal('Error!', "Error adding work details. Please try again.", 'error');
            }
        } else {
            try {
                setUploading(true);
                const res = await updateWork({ ...formData, employeeId, id });
                if (res) {
                    setUploading(false);
                    setFormData({
                        project: "",
                        technologies: "",
                        startAt: dayjs(),
                        finishedAt: dayjs(),
                        issues: "",
                        feedback: '',
                    });
                    await swal("Updated.", "Word Details has been updated.", 'success', { buttons: false, timer: 2500 });
                    navigate('/developerWorks');
                    window.location.reload();
                } else if (res.error) {
                    setUploading(false);
                    console.error(res.error);
                    swal("Oops!", 'Something went wrong!', 'error', { buttons: false, timer: 3000 })
                }
            } catch (error) {
                console.log(error.message);
                setUploading(false);
                swal('Error!', "Error adding work details. Please try again.", 'error', { buttons: false, timer: 3000 });
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
        <Box m="1.5rem 2.5rem">
            <Header title="WORK DETAILS" subtitle={!id ? "Make a new entry for your daily work" : "Update the work details"} />
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
                                value={formData.project || ""}
                                onChange={handleFormChange}
                            />
                            <TextField
                                required
                                label="Technologies Using"
                                name="technologies"
                                value={formData.technologies || ""}
                                onChange={handleFormChange}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        label="Start Date"
                                        value={formData.startAt || ""}
                                        onChange={(newdoj) => setFormData({ ...formData, doj: newdoj })}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        label="Finished Date"
                                        value={formData.finishedAt || ""}
                                        onChange={(newdoj) => setFormData({ ...formData, doj: newdoj })}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            <TextField
                                required
                                label="Issues Facing"
                                name="issues"
                                value={formData.issues || ""}
                                onChange={handleFormChange}
                            />
                            <TextField
                                label="Feedback"
                                name="feedback"
                                value={formData.feedback || ""}
                                onChange={handleFormChange}
                            />
                        </Box>
                        <Button sx={{ width: "14rem", height: '3rem' }} type="submit" variant="contained" color="primary">
                            {uploading ? "Uploading..." : (id ? "Update Details" : "Add Work Details")}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default AddDeveloperWork;