import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, useTheme } from "@mui/material";
import Header from "components/Header/Header";
import { useAddUserMutation, useGetUserQuery, useGetUsersQuery, useUpdateUserMutation } from "state/api";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";

const positions = [
    { value: 'Builder', label: 'Builder' },
    { value: 'Business Development Manager', label: 'Business Development Manager' },
    { value: 'Business Development Executive', label: 'Business Development Executive' },
    { value: 'UI/UX Designer', label: 'UI/UX Designer' },
    { value: 'FullStack Developer', label: 'FullStack Developer' },
    { value: 'Frontend Developer', label: 'Frontend Developer' },
    { value: 'Backend Developer', label: 'Backend Developer' },
    { value: 'Video Editor', label: 'Video Editor' },
    { value: 'Graphic Designer', label: 'Graphic Designer' },
    { value: 'Social Media Manager', label: 'Social Media Manager' },
    { value: 'Human Resource', label: 'Human Resource' },
    { value: 'Content Writer', label: 'Content Writer' },
    { value: 'Lead Generation', label: 'Lead Generation' },
    { value: 'Finance', label: 'Finance' },
];

const roles = [
    { value: 'employee', label: 'Employee' },
    { value: 'admin', label: 'Admin' },
    { value: 'superadmin', label: 'Super Admin' },
];

const currentStatus = [
    { value: 'Working', label: 'Working' },
    { value: 'Probation Period', label: 'Probation Period' },
    { value: 'Notice Period', label: 'Notice Period' },
    { value: 'Separated', label: 'Separated' },
];

const AddEmployee = () => {
    const theme = useTheme();

    const navigate = useNavigate();
    const employee = useGetUsersQuery();
    const lastEmployeeId = employee.data?.[employee.data?.length - 1]?.employeeId;
    const newEmployeeId = Number(lastEmployeeId) + 1;
    const userRole = localStorage.getItem("role");

    const [uploading, setUploading] = useState(false);
    const { id } = useParams();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        employeeId: newEmployeeId,
        password: '',
        position: '',
        phone: '',
        address: '',
        photo: '',
        role: userRole === "superadmin" ? '' : 'employee',
        status: '',
        doj: dayjs(),
        nomineeName: "",
        nomineeContact: ""
    });

    const [addEmployee] = useAddUserMutation();
    const { data, isLoading } = useGetUserQuery(id);
    const [updateEmployee] = useUpdateUserMutation({ ...formData });

    useEffect(() => {
        if (id) {
            setFormData({ ...data, doj: dayjs(formData.doj) })
        } else {
            setFormData({
                fullName: '',
                email: '',
                employeeId: newEmployeeId,
                password: '',
                position: '',
                phone: '',
                address: '',
                photo: '',
                role: userRole === "superadmin" ? '' : 'employee',
                status: '',
                doj: dayjs(),
                nomineeName: "",
                nomineeContact: ""
            })
        }// eslint-disable-next-line
    }, [id, data]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!id) {
            try {
                setUploading(true)
                const res = await addEmployee({ ...formData, doj: formData.doj.toISOString() });
                if (res) {
                    setUploading(false);
                    // reset form data after successful submission
                    setFormData({
                        fullName: '',
                        email: '',
                        employeeId: newEmployeeId,
                        password: '',
                        position: '',
                        phone: '',
                        address: '',
                        photo: '',
                        role: userRole === "superadmin" ? '' : 'employee',
                        status: '',
                        doj: dayjs(),
                        nomineeName: "",
                        nomineeContact: ""
                    });
                    await swal("Added.", 'New employee added successfully!', 'success', {
                        buttons: false,
                        timer: 2500,
                    })
                    navigate('/employees list');
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
                swal('Oops!', 'Error adding employee details. Please try again.', 'error', {
                    buttons: false,
                    timer: 3000,
                });
            }
        } else {
            try {
                setUploading(true);
                const res = await updateEmployee({ ...formData, id, doj: formData.doj.toISOString() })
                if (res) {
                    setUploading(false);
                    // reset form data after successful submission
                    setFormData({
                        fullName: '',
                        email: '',
                        employeeId: newEmployeeId,
                        password: '',
                        position: '',
                        phone: '',
                        address: '',
                        photo: '',
                        role: userRole === "superadmin" ? '' : 'employee',
                        status: '',
                        doj: dayjs(),
                        nomineeName: "",
                        nomineeContact: ""
                    });
                    await swal("Updated.", 'Employee details updated successfully!', 'success', {
                        buttons: false,
                        timer: 2500,
                    });
                    navigate('/employees list');
                    window.location.reload();
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
        <Box m="1.5rem 2.5rem">
            <Header
                title={id ? "UPDATE EMPLOYEE DETAILS" : "ADD NEW EMPLOYEE'S DETAILS"}
                subtitle={id ? `Update the below fields to update the details of ${data?.employeeName}` : "Fill the below form to add new employee's data"} />
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
                    <Box sx={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        padding: '1rem', m: '0 auto'
                    }}>
                        <Box sx={{
                            m: '1rem auto',
                            display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                            alignItems: 'center', justifyContent: 'left',
                            gap: '1rem', borderRadius: '0.5rem',
                        }}>
                            <Box sx={{ width: "14rem", display: id ? 'none' : 'flex' }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            required
                                            label="Date of Joining"
                                            value={formData.doj}
                                            onChange={(newdoj) => setFormData({ ...formData, doj: newdoj })}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Box>
                            <TextField
                                sx={{ width: "14rem" }}
                                required
                                label="Name"
                                name="fullName"
                                value={formData.fullName || ""}
                                onChange={handleFormChange}
                            />
                            <TextField
                                sx={{ width: "14rem", display: id ? 'none' : 'flex' }}
                                disabled
                                label="Employee ID"
                                name="employeeId"
                                value={formData.employeeId}
                            />
                            <TextField
                                sx={{ width: "14rem" }}
                                required
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email || ""}
                                onChange={handleFormChange}
                            />
                            <TextField
                                sx={{ width: "14rem", display: id ? 'none' : 'flex' }}
                                required
                                label="Password"
                                name="password"
                                type="password"
                                value={formData.password || ""}
                                onChange={handleFormChange}
                            />
                            <TextField
                                sx={{ width: "14rem" }}
                                required
                                label="Phone Number"
                                name="phone"
                                min={10}
                                max={14}
                                value={formData.phone || ""}
                                onChange={handleFormChange}
                            />
                            <TextField
                                sx={{ width: "14rem" }}
                                label="Photo URL"
                                name="photo"
                                value={formData.photo || ""}
                                onChange={handleFormChange}
                            />
                            <TextField
                                sx={{ width: "14rem" }}
                                required
                                label="Address"
                                name="address"
                                value={formData.address || ""}
                                onChange={handleFormChange}
                            />
                            <TextField
                                sx={{ width: "14rem" }}
                                required
                                label="Nominee's Name"
                                name="nomineeName"
                                value={formData.nomineeName || ""}
                                onChange={handleFormChange}
                            />
                            <TextField
                                sx={{ width: "14rem" }}
                                required
                                label="Nominee's Number"
                                name="nomineeContact"
                                min={10}
                                max={14}
                                value={formData.nomineeContact || ""}
                                onChange={handleFormChange}
                            />
                            <FormControl sx={{ width: "14rem" }}>
                                <InputLabel id="demo-simple-select-label">Position</InputLabel>
                                <Select
                                    required
                                    label="Position"
                                    name="position"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={formData.position || ""}
                                    onChange={handleFormChange}
                                >
                                    {positions.map((item) => (
                                        <MenuItem key={item.value} value={item.value || ""}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {['superadmin'].includes(userRole) && (
                                <FormControl sx={{ width: "14rem" }}>
                                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                    <Select
                                        required
                                        disabled={userRole !== "superadmin"}
                                        label="Role"
                                        name="role"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={formData.role || ""}
                                        defaultValue="employee"
                                        onChange={handleFormChange}
                                    >
                                        {roles.map((item) => (
                                            <MenuItem key={item.value} value={item.value || ""}>
                                                {item.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                            <FormControl sx={{ width: "14rem" }}>
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    required
                                    label="Status"
                                    name="status"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={formData.status || ""}
                                    onChange={handleFormChange}
                                >
                                    {currentStatus.map((item) => (
                                        <MenuItem key={item.value} value={item.value || ""}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Button sx={{ width: "14rem", fontSize: '1rem', height: '2.5rem' }} type="submit" variant="contained" color="primary">
                            {uploading ? "Uploading..." : (id ? "Update Employee" : "Add New Employee")}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default AddEmployee;