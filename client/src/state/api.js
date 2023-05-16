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
        "ClientsContact",
        "BDMWork",
        "DeveloperWork",
        "Projects",
        "Leaves",
    ],
    endpoints: (build) => ({
        // apis for user routes
        loginUser: build.mutation({
            query: ({ email, password }) => ({
                url: "user/login",
                method: "POST",
                body: { email, password },
            }),
            providesTags: ["Login", "Employee", "Admin", "Password"],
        }),
        addUser: build.mutation({
            query: ({ fullName, email, employeeId, password, phone, role, position, address, photo, doj, status, nomineeName, nomineeContact }) => ({
                url: "user",
                method: "POST",
                body: { fullName, email, employeeId, password, phone, role, position, address, photo, doj, status, nomineeName, nomineeContact },
            }),
            providesTags: ["Register", "User", "Users"],
        }),
        getUser: build.query({
            query: (id) => `user/${id}`,
            providesTags: ["User"],
        }),
        getUsers: build.query({
            query: () => 'user',
            providesTags: ["User"],
        }),
        updateUser: build.mutation({
            query: ({ id, fullName, employeeId, role, position, email, phone, address, status, photo, spreadSheet, doj, nomineeName, nomineeContact }) => ({
                url: `user/${id}`,
                method: "PATCH",
                body: { fullName, employeeId, role, position, email, phone, address, status, photo, spreadSheet, doj, nomineeName, nomineeContact }
            }),
            providesTags: ["User"],
        }),

        // apis for projects routes
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
            query: ({ id, name, role, position, email, phone, address, status, photo, spreadSheet }) => ({
                URL: `updateProject/${id}`,
                method: "PUT",
                body: { name, role, position, email, phone, address, status, photo, spreadSheet }
            }),
            providesTags: ["projects"],
        }),
        deleteProject: build.mutation({
            query: (id) => ({
                url: `deleteProject/${id}`,
                methode: "DELETE"
            }),
            providesTags: ["project"],
        }),

        // apis for bdm works
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
        getAllBDMsWorks: build.query({
            query: () => 'bdmworks/all',
            providesTags: ["BDMWorks"],
        }),
        updateBDMWork: build.mutation({
            query: ({ id, projectTitle, clientName, date, email, phone, employee }) => ({
                URL: `bdmworks/${id}`,
                method: "PATCH",
                body: { projectTitle, clientName, date, email, phone, employee }
            }),
            providesTags: ["BDMWorks"],
        }),
        deleteBDMWork: build.mutation({
            query: (id) => ({
                url: `bdmworks/${id}`,
                method: " DELETE"
            }),
            providesTags: ["BDMWork"],
        }),

        // apis for developer works
        addDeveloperWork: build.mutation({
            query: ({ project, technologies, startAt, finishedAt, issues, feedback, employeeId }) => ({
                url: 'developmentworks',
                method: "POST",
                body: { project, technologies, startAt, finishedAt, issues, feedback, employeeId },
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
        getAllDevelopersWorks: build.query({
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

        // apis for Video Editor works
        addVideoEditorWork: build.mutation({
            query: ({ projectTitle, clientName, date, email, phone, employeeId }) => ({
                url: `videoeditor`,
                method: "POST",
                body: { projectTitle, clientName, date, email, phone, employeeId },
            }),
            providesTags: ["Video Editor", "Employee"],
        }),
        getVideoEditorWork: build.query({
            query: (id) => `videoeditor/${id}`,
            providesTags: ["Video Editor"],
        }),
        getVideoEditorWorks: build.query({
            query: (id) => `videoeditor?userId=${id}`,
            providesTags: ["Video Editor"],
        }),
        getAllVideoEditorsWorks: build.query({
            query: () => 'videoeditor/all',
            providesTags: ["Video Editors"],
        }),
        updateVideoEditorWork: build.mutation({
            query: ({ id, projectTitle, clientName, date, email, phone, employee }) => ({
                URL: `videoeditor/${id}`,
                method: "PATCH",
                body: { projectTitle, clientName, date, email, phone, employee }
            }),
            providesTags: ["Video Editor Works"],
        }),
        deleteVideoEditorWork: build.mutation({
            query: (id) => ({
                url: `videoeditor/${id}`,
                method: " DELETE"
            }),
            providesTags: ["Video Editor Work"],
        }),

        // apis for Social Media Manager works
        addSSMWork: build.mutation({
            query: ({ projectTitle, clientName, date, email, phone, employeeId }) => ({
                url: `socialmediamanager`,
                method: "POST",
                body: { projectTitle, clientName, date, email, phone, employeeId },
            }),
            providesTags: ["Social Media Manager", "Employee"],
        }),
        getSSMWork: build.query({
            query: (id) => `socialmediamanager/${id}`,
            providesTags: ["Social Media Manager"],
        }),
        getSSMWorks: build.query({
            query: (id) => `socialmediamanager?userId=${id}`,
            providesTags: ["Social Media Manager"],
        }),
        getAllSSMsWorks: build.query({
            query: () => 'socialmediamanager/all',
            providesTags: ["Social Media Manager"],
        }),
        updateSSMWork: build.mutation({
            query: ({ id, projectTitle, clientName, date, email, phone, employee }) => ({
                URL: `socialmediamanager/${id}`,
                method: "PATCH",
                body: { projectTitle, clientName, date, email, phone, employee }
            }),
            providesTags: ["Social Media Manager"],
        }),
        deleteSSMWork: build.mutation({
            query: (id) => ({
                url: `socialmediamanager/${id}`,
                method: " DELETE"
            }),
            providesTags: ["Social Media Manager"],
        }),

        // apis for Content Writer works
        addCRWork: build.mutation({
            query: ({ projectTitle, clientName, date, email, phone, employeeId }) => ({
                url: `contentwriter`,
                method: "POST",
                body: { projectTitle, clientName, date, email, phone, employeeId },
            }),
            providesTags: ["Content Writer", "Employee"],
        }),
        getCRWork: build.query({
            query: (id) => `contentwriter/${id}`,
            providesTags: ["Content Writer"],
        }),
        getCRWorks: build.query({
            query: (id) => `contentwriter?userId=${id}`,
            providesTags: ["Content Writer"],
        }),
        getAllCRsWorks: build.query({
            query: () => 'contentwriter/all',
            providesTags: ["Content Writer"],
        }),
        updateCRWork: build.mutation({
            query: ({ id, projectTitle, clientName, date, email, phone, employee }) => ({
                URL: `contentwriter/${id}`,
                method: "PATCH",
                body: { projectTitle, clientName, date, email, phone, employee }
            }),
            providesTags: ["Content Writer"],
        }),
        deleteCRWork: build.mutation({
            query: (id) => ({
                url: `contentwriter/${id}`,
                method: " DELETE"
            }),
            providesTags: ["Content Writer"],
        }),

        // apis for financial details        
        addFinanceDetail: build.mutation({
            query: ({ userId, employeeName, employeeId, aadhaar, pan, bankName, accountNumber, ifscCode }) => ({
                url: 'financeDetails',
                method: "POST",
                body: { userId, employeeName, employeeId, aadhaar, pan, bankName, accountNumber, ifscCode },
            }),
            providesTags: ["FinanceDetails", "Employee"],
        }),
        getFinanceDetail: build.query({
            query: (id) => `financeDetails/${id}`,
            providesTags: ["FinanceDetails"],
        }),
        getFinanceDetails: build.query({
            query: (id) => `financeDetails?userId=${id}`,
            providesTags: ["Finance Details"],
        }),
        getAllFinanceDetails: build.query({
            query: () => 'financeDetails/all',
            providesTags: ["Finance Details"],
        }),
        updateFinanceDetail: build.mutation({
            query: ({ id, userId, employeeName, employeeId, aadhaar, pan, bankName, accountNumber, ifscCode }) => ({
                url: `financeDetails/${id}`,
                method: "PATCH",
                body: { userId, employeeName, employeeId, aadhaar, pan, bankName, accountNumber, ifscCode }
            }),
            providesTags: ["Finance Details", "Update Details"],
        }),
        deleteFinanceDetail: build.query({
            query: (id) => `financeDetails/${id}`,
            providesTags: ["FinanceDetails"],
        }),

        // apis for leave routes
        addLeave: build.mutation({
            query: ({ userId, employeeName, leaveType, leaveFrom, leaveUpto, reason }) => ({
                url: 'leaves',
                method: "POST",
                body: { userId, employeeName, leaveType, leaveFrom, leaveUpto, reason },
            }),
            providesTags: ["Leaves", "Employee"],
        }),
        getLeave: build.query({
            query: (id) => `leaves/${id}`,
            providesTags: ["Leaves"],
        }),
        getUserLeaves: build.query({
            query: (id) => `leaves?userId=${id}`,
            providesTags: ["Leaves"],
        }),
        getAllLeaves: build.query({
            query: () => 'leaves/all',
            providesTags: ["leaves"],
        }),
        updateLeave: build.mutation({
            query: ({ id, userId, employeeName, leaveType, leaveFrom, leaveUpto, reason }) => ({
                url: `leaves/${id}`,
                method: "PATCH",
                body: { userId, employeeName, leaveType, leaveFrom, leaveUpto, reason }
            }),
            providesTags: ["Leaves"],
        }),
        deleteLeave: build.mutation({
            query: (id) => ({
                url: `leaves/${id}`,
                method: "DELETE"
            }),
            providesTags: ["Leaves", "Delete"],
        }),

        // apis for client contact details
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
    useGetAllBDMsWorksQuery,
    useUpdateBDMWorkMutation,
    useDeleteBDMWorkQuery,
    useAddDeveloperWorkMutation,
    useGetDeveloperWorkQuery,
    useGetDeveloperWorksQuery,
    useGetAllDevelopersWorksQuery,
    useUpdateDeveloperWorkMutation,
    useDeleteDeveloperWorkQuery,
    useAddCRWorkMutation,
    useGetCRWorkQuery,
    useGetCRWorksQuery,
    useGetAllCRsWorksQuery,
    useUpdateCRWorkMutation,
    useDeleteCRWorkMutation,
    useAddSSMWorkMutation,
    useGetSSMWorkQuery,
    useGetSSMWorksQuery,
    useGetAllSSMsWorksQuery,
    useUpdateSSMWorkMutation,
    useDeleteSSMWorkMutation,
    useAddVideoEditorWorkMutation,
    useGetVideoEditorWorkQuery,
    useGetVideoEditorWorksQuery,
    useGetAllVideoEditorsWorksQuery,
    useAddFinanceDetailMutation,
    useGetFinanceDetailQuery,
    useGetFinanceDetailsQuery,
    useGetAllFinanceDetailsQuery,
    useUpdateFinanceDetailMutation,
    useDeleteFinanceDetailQuery,
    useAddLeaveMutation,
    useGetLeaveQuery,
    useGetUserLeavesQuery,
    useGetAllLeavesQuery,
    useUpdateLeaveMutation,
    useDeleteLeaveMutation,
    useGetClientsContactQuery,
    useGetFooterContactQuery
} = api;