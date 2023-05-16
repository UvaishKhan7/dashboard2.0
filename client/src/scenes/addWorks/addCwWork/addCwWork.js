import React, { useState } from "react";
import { Box, Button, CircularProgress, TextField, useTheme } from "@mui/material";
import Header from "components/Header/Header";
import { useAddCRWorkMutation, useGetCRWorkQuery, useUpdateCRWorkMutation } from "state/api";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { useEffect } from "react";

const AddCwWork = () => {
    const theme = useTheme();

    const navigate = useNavigate();

    const employeeId = localStorage.getItem("id");
    const { id } = useParams();

    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        startDate: dayjs(),
        endDate: dayjs(),
    });

    const { data, isLoading } = useGetCRWorkQuery(id);
    const [addCwWork] = useAddCRWorkMutation(employeeId);
    const [updateWork] = useUpdateCRWorkMutation({ ...formData });

    useEffect(() => {
        if (id) {
            setFormData({ ...data, startDate: dayjs(formData.startDate), endDate: dayjs(formData.endDate) })
        } else {
            setFormData({
                title: "",
                startDate: dayjs(),
                endDate: dayjs(),
            })
        }
        return () => {
            setFormData({
                title: "",
                startDate: dayjs(),
                endDate: dayjs(),
            })
        }// eslint-disable-next-line
    }, [id, data])

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!id) {
            try {
                setUploading(true);
                const res = await addCwWork({ ...formData, employeeId, startDate: dayjs(formData.startDate), endDate: dayjs(formData.endDate) });
                if (res) {
                    setUploading(false);
                    setFormData({
                        title: "",
                        startDate: dayjs(),
                        endDate: dayjs(),
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
                        title: "",
                        startDate: dayjs(),
                        endDate: dayjs(),
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
                                label="Project's Title"
                                name="title"
                                value={formData.title || ""}
                                onChange={handleFormChange}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        label="Start Date"
                                        value={formData.startDate || ""}
                                        onChange={(newstartDate) => setFormData({ ...formData, startDate: newstartDate })}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        label="Finished Date"
                                        value={formData.endDate || ""}
                                        onChange={(newendDate) => setFormData({ ...formData, endDate: newendDate })}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
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

export default AddCwWork;