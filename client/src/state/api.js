import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers = headers ?? new Headers();
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    reducerPath: "adminApi",
    tagTypes: [
        "Employee",
        "Admins",
        "Dashboard",
        "Register",
        "LoginUser",
        "ClientsContact"
    ],
    endpoints: (build) => ({
        loginUser: build.mutation({
            query: ({ email, password }) => ({
                url: "general/login",
                method: "POST",
                body: { email, password },
            }),
            providesTags: ["Login", "Employee", "Admin", "Password"],
        }),
        addEmployee: build.mutation({
            query: ({ fullName, email, employeeId, password, phone, role, position, address, photo, doj, status }) => ({
                url: "employees/",
                method: "POST",
                body: { fullName, email, employeeId, password, phone, role, position, address, photo, doj, status },
            }),
            providesTags: ["Register", "User", "Users"],
        }),
        getEmployee: build.query({
            query: (id) => `employees/${id}`,
            providesTags: ["Employee"],
        }),
        getEmployees: build.query({
            query: () => `employees`,
            providesTags: ["Employees"],
        }),
        updateEmployee: build.mutation({
            query: ({ id, fullName, employeeId, role, position, email, phone, address, status, photo, spreadSheet, doj }) => ({
                URL: `employees/${id}`,
                method: "PATCH",
                body: { fullName, employeeId, role, position, email, phone, address, status, photo, spreadSheet, doj }
            }),
            providesTags: ["Employees"],
        }),
        addProject: build.mutation({
            query: ({ name, email, password, phone, role, position, address, photo, spreadSheet }) => ({
                url: "project/register",
                method: "POST",
                body: { name, email, password, phone, role, position, address, photo, spreadSheet },
            }),
            providesTags: ["Register", "User", "Users"],
        }),
        getProject: build.query({
            query: (id) => `project/${id}`,
            providesTags: ["project"],
        }),
        getProjects: build.query({
            query: () => `project/projects`,
            providesTags: ["projects"],
        }),
        updateProject: build.mutation({
            query: (id) => ({ name, role, position, email, phone, address, status, photo, spreadSheet }) => ({
                URL: `updateProject/${id}`,
                method: "PUT",
                body: { name, role, position, email, phone, address, status, photo, spreadSheet }
            }),
            providesTags: ["projects"],
        }),
        deleteProject: build.mutation({
            query: (id) => `deleteProject/${id}`,
            providesTags: ["project"],
        }),
        addBDMWork: build.mutation({
            query: ({ projectTitle, clientName, date, email, phone, employeeId }) => ({
                url: `employees/${employeeId}/bdmWorks`,
                method: "POST",
                body: { projectTitle, clientName, date, email, phone, employeeId },
            }),
            providesTags: ["BDMWork", "Employee"],
        }),
        getBDMWork: build.query({
            query: (employeeId, id) => `employees/${employeeId}/bdmWorks/:id`,
            providesTags: ["BDMWork"],
        }),
        getBDMWorks: build.query({
            query: (employeeId) => `employees/${employeeId}/bdmWorks`,
            providesTags: ["BDMWorks"],
        }),
        updateBDMWork: build.mutation({
            query: (employeeId) => ({ projectTitle, clientName, date, email, phone, employee }) => ({
                URL: `employees/${employeeId}/bdmWorks/:id`,
                method: "PUT",
                body: { projectTitle, clientName, date, email, phone, employee }
            }),
            providesTags: ["BDMWorks"],
        }),
        deleteBDMWork: build.query({
            query: (employeeId, id) => `employees/${employeeId}/bdmWorks/${id}`,
            providesTags: ["BDMWork"],
        }),
        addDeveloperWork: build.mutation({
            query: ({ project, technologies, startAt, finishedAt, issues, feedback, employeeId }) => ({
                url: `employees/${employeeId}/developerWorks`,
                method: "POST",
                body: { project, technologies, startAt, finishedAt, issues, feedback },
            }),
            providesTags: ["DeveloperWork", "Employee"],
        }),
        getDeveloperWork: build.query({
            query: (employeeId, id) => `employees/${employeeId}/developerWorks/${id}`,
            providesTags: ["DeveloperWork"],
        }),
        getDeveloperWorks: build.query({
            query: (employeeId) => `employees/${employeeId}/developerWorks`,
            providesTags: ["DeveloperWork"],
        }),
        updateDeveloperWork: build.mutation({
            query: (employeeId, id) => ({ project, technologies, startAt, finishedAt, issues, feedback, employee, }) => ({
                URL: `employees/${employeeId}/developerWorks/${id}`,
                method: "PUT",
                body: { project, technologies, startAt, finishedAt, issues, feedback, employee, }
            }),
            providesTags: ["DeveloperWork"],
        }),
        deleteDeveloperWork: build.query({
            query: (employeeId, id) => `employees/${employeeId}/developerWorks/${id}`,
            providesTags: ["DeveloperWork"],
        }),
        getClientsContact: build.query({
            query: () => "client/clientsContact",
            providesTags: ["Client", "ClientsContact"],
        }),
        getFooterContact: build.query({
            query: () => "client/footerContact",
            providesTags: ["Client", "FooterContact"],
        }),
    }),
});

export const {
    useLoginUserMutation,
    useAddEmployeeMutation,
    useGetEmployeeQuery,
    useGetEmployeesQuery,
    useUpdateEmployeeMutation,
    useDeleteEmployeeQuery,
    useAddProjectMutation,
    useGetProjectQuery,
    useGetProjectsQuery,
    useUpdateProjectMutation,
    useDeleteProjectQuery,
    useAddBDMWorkMutation,
    useGetBDMWorkQuery,
    useGetBDMWorksQuery,
    useUpdateBDMWorkMutation,
    useDeleteBDMWorkQuery,
    useAddDeveloperWorkMutation,
    useGetDeveloperWorkQuery,
    useGetDeveloperWorksQuery,
    useUpdateDeveloperWorkMutation,
    useDeleteDeveloperWorkQuery,
    useGetClientsContactQuery,
    useGetFooterContactQuery
} = api;