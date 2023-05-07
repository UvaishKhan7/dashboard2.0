import React, { useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, useTheme } from "@mui/material";
import Header from "components/Header/Header";
import { useAddUserMutation, useGetUsersQuery } from "state/api";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";

const positions = [
    { value: 'Builder', label: 'Builder' },
    { value: 'Employee', label: 'Employee' },
    { value: 'Human Resource', label: 'Human Resource' },
    { value: 'FullStack Developer', label: 'FullStack Developer' },
    { value: 'Frontend Developer', label: 'Frontend Developer' },
    { value: 'Backend Developer', label: 'Backend Developer' },
    { value: 'UI/UX Designer', label: 'UI/UX Designer' },
    { value: 'Business Development Manager', label: 'Business Development Manager' },
    { value: 'Business Development Executive', label: 'Business Development Executive' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Editor', label: 'Editor' },
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

    const [addEmployee] = useAddUserMutation();

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
        doj: dayjs()
    });


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setUploading(true)
        try {
            await addEmployee(formData);
            setUploading(false);
            // reset form data after successful submission
            setFormData({
                fullName: '',
                email: '',
                employeeId: lastEmployeeId,
                password: '',
                position: '',
                phone: '',
                address: '',
                photo: '',
                role: '',
                status: '',
                doj: dayjs()
            });
        } catch (error) {
            console.log(error.message);
            swal('Error adding employee details. Please try again.');
        } finally {
            swal('New employee added successfully!')
                .then(() => {
                    navigate('/employees list');
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
            <Header
                title={uploading ? "Uploading..." : (id ? "UPDATE EMPLOYEE DETAILS" : "ADD NEW EMPLOYEE'S DETAILS")}
                subtitle={uploading ? "Uploading..." : (id ? "Update the below fields to update employee's data" : "Fill the below form to add new employee's data")} />
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
                        padding: '1rem'
                    }}>
                        <Box sx={{
                            m: '1rem auto',
                            display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                            alignItems: 'center', justifyContent: 'left',
                            gap: '1rem', borderRadius: '0.5rem',
                            padding: '1rem'
                        }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        label="Date of Joining"
                                        value={formData.doj}
                                        onChange={(newdoj) => setFormData({ ...formData, doj: newdoj })}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            <TextField
                                required
                                label="Name"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleFormChange}
                            />
                            <TextField
                                disabled
                                label="Employee ID"
                                name="employeeId"
                                value={formData.employeeId}
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
                                label="Password"
                                name="password"
                                type="password"
                                value={formData.password}
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
                                label="Photo URL"
                                name="photo"
                                value={formData.photo}
                                onChange={handleFormChange}
                            />
                            <TextField
                                required
                                label="Address"
                                name="address"
                                value={formData.address}
                                onChange={handleFormChange}
                            />
                            <FormControl sx={{ width: "15rem" }}>
                                <InputLabel id="demo-simple-select-label">Position</InputLabel>
                                <Select
                                    required
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Position"
                                    name="position"
                                    value={formData.position}
                                    onChange={handleFormChange}
                                >
                                    {positions.map((position) => (
                                        <MenuItem key={position.value} value={position.value}>
                                            {position.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {['superadmin'].includes(userRole) && (
                                <FormControl sx={{ width: "15rem" }}>
                                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                    <Select
                                        disabled={userRole !== "superadmin"}
                                        label="Role"
                                        name="role"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={formData.role}
                                        defaultValue="employee"
                                        onChange={handleFormChange}
                                    >
                                        {roles.map((role) => (
                                            <MenuItem key={role.value} value={role.value}>
                                                {role.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                            <FormControl sx={{ width: "15rem" }}>
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    required
                                    label="Status"
                                    name="status"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={formData.status}
                                    onChange={handleFormChange}
                                >
                                    {currentStatus.map((item) => (
                                        <MenuItem key={item.value} value={item.value}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Button type="submit" variant="contained" color="primary">
                            {uploading ? "Uploading..." : (id ? "Update Admin" : "Add New Admin")}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default AddEmployee;