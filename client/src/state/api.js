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
                url: "user/login",
                method: "POST",
                body: { email, password },
            }),
            providesTags: ["Login", "Employee", "Admin", "Password"],
        }),
        addUser: build.mutation({
            query: ({ fullName, email, employeeId, password, phone, role, position, address, photo, doj, status }) => ({
                url: "user",
                method: "POST",
                body: { fullName, email, employeeId, password, phone, role, position, address, photo, doj, status },
            }),
            providesTags: ["Register", "User", "Users"],
        }),
        getUser: build.query({
            query: (id) => `user/${id}`,
            providesTags: ["User"],
        }),
        getUsers: build.query({
            query: () => `user`,
            providesTags: ["User"],
        }),
        updateUser: build.mutation({
            query: ({ id, fullName, employeeId, role, position, email, phone, address, status, photo, spreadSheet, doj }) => ({
                url: `user/${id}`,
                method: "PATCH",
                body: { fullName, employeeId, role, position, email, phone, address, status, photo, spreadSheet, doj }
            }),
            providesTags: ["User"],
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
            method: "DELETE",
            providesTags: ["project"],
        }),
        addBDMWork: build.mutation({
            query: ({ projectTitle, clientName, date, email, phone, employeeId }) => ({
                url: `bdmworks`,
                method: "POST",
                body: { projectTitle, clientName, date, email, phone, employeeId },
            }),
            providesTags: ["BDMWork", "Employee"],
        }),
        getBDMWork: build.query({
            query: (id) => `bdmworks/${id}`,
            providesTags: ["BDMWork"],
        }),
        getBDMWorks: build.query({
            query: (id) => `bdmworks?userId=${id}`,
            providesTags: ["BDMWork"],
        }),
        getBDMsWorks: build.query({
            query: () => `bdmworks/all`,
            providesTags: ["BDMWorks"],
        }),
        updateBDMWork: build.mutation({
            query: (id) => ({ projectTitle, clientName, date, email, phone, employee }) => ({
                URL: `bdmworks/${id}`,
                method: "PATCH",
                body: { projectTitle, clientName, date, email, phone, employee }
            }),
            providesTags: ["BDMWorks"],
        }),
        deleteBDMWork: build.query({
            query: (id) => `bdmworks/${id}`,
            providesTags: ["BDMWork"],
        }),
        addDeveloperWork: build.mutation({
            query: ({ project, technologies, startAt, finishedAt, issues, feedback, employeeId }) => ({
                url: `developmentworks`,
                method: "POST",
                body: { project, technologies, startAt, finishedAt, issues, feedback },
            }),
            providesTags: ["Developmentworks", "Employee"],
        }),
        getDeveloperWork: build.query({
            query: (id) => `developmentworks/${id}`,
            providesTags: ["Developmentworks"],
        }),
        getDeveloperWorks: build.query({
            query: (id) => `developmentworks?userId=${id}`,
            providesTags: ["Developmentworks"],
        }),
        getDevelopersWorks: build.query({
            query: () => `developmentworks/all`,
            providesTags: ["Developmentworks"],
        }),
        updateDeveloperWork: build.mutation({
            query: (id) => ({ project, technologies, startAt, finishedAt, issues, feedback, employee, }) => ({
                url: `developmentworks/${id}`,
                method: "PATCH",
                body: { project, technologies, startAt, finishedAt, issues, feedback, employee, }
            }),
            providesTags: ["Developmentworks"],
        }),
        deleteDeveloperWork: build.query({
            query: (id) => `developmentworks/${id}`,
            providesTags: ["Developmentworks"],
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
    useGetUserQuery,
    useGetUsersQuery,
    useAddUserMutation,
    useUpdateUserMutation,
    useAddProjectMutation,
    useGetProjectQuery,
    useGetProjectsQuery,
    useUpdateProjectMutation,
    useDeleteProjectQuery,
    useAddBDMWorkMutation,
    useGetBDMWorkQuery,
    useGetBDMWorksQuery,
    useGetBDMsWorksQuery,
    useUpdateBDMWorkMutation,
    useDeleteBDMWorkQuery,
    useAddDeveloperWorkMutation,
    useGetDeveloperWorkQuery,
    useGetDeveloperWorksQuery,
    useGetDevelopersWorksQuery,
    useUpdateDeveloperWorkMutation,
    useDeleteDeveloperWorkQuery,
    useGetClientsContactQuery,
    useGetFooterContactQuery
} = api;