import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header/Header";
import {
  DownloadOutlined,
  PointOfSale,
  PersonAdd,
  Traffic,
  EqualizerOutlined,
  StorageOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  useTheme,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetClientsContactQuery, useGetEmployeesQuery } from "state/api";
import StatBox from "components/StatBox/StatBox";
import { useNavigate } from "react-router-dom";
import BDMDashboard from "scenes/BDMDashboard/BDMDashboard";
import DeveloperDashboard from "scenes/developerDashboard/DeveloperDashboard";

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const userRole = localStorage.getItem("role");
  const userPosition = localStorage.getItem("position");

  const client = useGetClientsContactQuery();
  const { data, isLoading } = useGetEmployeesQuery();

  const handleAddWork = () => {
    if (userPosition === "FullStack Developer" || userPosition === "FrontEnd Developer" || userPosition === "Backend Developer") {
      navigate('/developerWorks')
    } else if (userPosition === "Business Development Manager" || userPosition === "Business Development Executive") {
      navigate('/bdmWorks')
    }
  }

  const columnsClients = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "fullName",
      headerName: "Client's Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
      },
    },
    {
      field: "services",
      headerName: "Service",
      flex: 1,
    },
    {
      field: "requirement",
      headerName: "Requirement",
      flex: 1,
    },
    {
      field: "message",
      headerName: "Brief",
      flex: 1,
    },
  ];

  const columnsEmployees = [
    {
      field: "photo",
      headerName: "Photo",
      width: 60,
      renderCell: (params) => <Avatar src={params.row.photo || ""} />,
    },
    {
      field: "fullName",
      headerName: "Employee's Name",
      width: 150,
    },
    {
      field: "employeeId",
      headerName: "Employee ID",
      width: 100,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      width: 130,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
      },
    },
    {
      field: "doj",
      headerName: "Joining Date",
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        });
      },
    },
    {
      field: "position",
      headerName: "Position",
      width: 180
    },
    {
      field: "status",
      headerName: "Status",
    },
    {
      field: "address",
      headerName: "Address",
      minWidth: 160
    },
  ];

  if (isLoading) {
    return (
      <Box display='flex' alignItems='center' justifyContent='center' width='100%' height='100%' m='0 auto'>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box m="1.5rem 2.5rem" pb='1rem'>
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        {['employee'].includes(userRole) && (
          <Box>
            <Button
              sx={{
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.background.alt,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              onClick={handleAddWork}
            >
              <StorageOutlined sx={{ mr: "10px" }} />
              Add Your Work
            </Button>
          </Box>
        )}
        {['superadmin'].includes(userRole) && (
          <Box>
            <Button
              sx={{
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.background.alt,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              <DownloadOutlined sx={{ mr: "10px" }} />
              Download Reports
            </Button>
          </Box>
        )}
      </FlexBetween>

      {['Business Development Manager', 'Business Development Executive'].includes(userPosition) && (
        <BDMDashboard />
      )}
      {['FullStack Developer', 'FrontEnd Developer', 'BackEnd Developer'].includes(userPosition) && (
        <DeveloperDashboard />
      )}

      {['admin'].includes(userRole) && (
        <Box
          m="20px auto"
          sx={{
            display: "flex",
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {/* ROW 1 */}
          <Box sx={{ display: "flex", gap: '1rem' }}
          >
            <StatBox
              title="Total Employees"
              value={(data && data?.length) || []}
              //increase="+14%"
              //description="Since last month"
              icon={
                <PersonAdd
                  sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                />
              }
            />
            <StatBox
              title="Total Projects Done"
              value={(data && data?.length) || []}
              //increase="+21%"
              //description="Since last month"
              icon={
                <PointOfSale
                  sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                />
              }
            />
          </Box>

          {/* ROW 2 */}
          <Box
            m="2rem auto"
            height="75vh"
            width={1024}
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
                color: `${theme.palette.secondary[200]}!important`,
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
                overflowX: "auto",
              },
            }}
          >
            <DataGrid
              loading={isLoading}
              getRowId={(row) => row._id}
              rows={data || []}
              columns={columnsEmployees}
              disableSelectionOnClick
            />
          </Box>
        </Box>
      )}

      {['superadmin'].includes(userRole) && (
        <Box
          m="20px auto"
        >
          {/* ROW 1 */}
          <Box sx={{ display: "flex", gap: '1rem' }}
          >
            <StatBox
              title="Total Employees"
              value={(data && data?.length) || []}
              //increase="+14%"
              //description="Since last month"
              icon={
                <PersonAdd
                  sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                />
              }
            />
            <StatBox
              title="Total Clients"
              value={(client && client?.data?.length) || []}
              //increase="+21%"
              //description="Since last month"
              icon={
                <PointOfSale
                  sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                />
              }
            />
            <StatBox
              title="Total Projects Done"
              value={(client && client?.length) || []}
              increase="+5%"
              description="Since last month"
              icon={
                <EqualizerOutlined
                  sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                />
              }
            />
            <StatBox
              title="Yearly Sales"
              value={(client && client?.length) || []}
              increase="+43%"
              description="Since last month"
              icon={
                <Traffic
                  sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                />
              }
            />
          </Box>

          {/* ROW 2 */}
          <Box
            margin="2rem 0"
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
                color: `${theme.palette.secondary[200]}!important`,
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
              overflowX: 'auto',
            }}
          >
            <DataGrid
              rows={client.data || []}
              columns={columnsClients}
              loading={isLoading}
              getRowId={(row) => row._id}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;