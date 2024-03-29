// Routes could be optimized for clarity

import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login.jsx";
import Screen1 from "./Components/ForgotPass/Screen1.jsx";
import Screen2 from "./Components/ForgotPass/Screen2.jsx";
import Screen3 from "./Components/ForgotPass/Screen3.jsx";
import Screen4 from "./Components/ForgotPass/Screen4.jsx";
import Timesheet from "./Components/Timesheet/Timesheet.jsx";
import Profile from "./Components/Profile/Profile.jsx";
import ChangePass from "./Components/Profile/ChangePassword.jsx";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import ManagerDashboard from "./Components/ManagerDash/ManagerDash.jsx";
import AddAccount from "./Components/ManagerDash/AddAccount.jsx";
import EditAccount from "./Components/ManagerDash/EditAccount.jsx";

// Manager pages
import ManagerViewAccount from "./Components/ManagerDash/ViewAccount.jsx";
import ManagerAddProject from "./Components/ManagerDash/AddProject.jsx";
import ManagerViewProject from "./Components/ManagerDash/ViewProject.jsx";
import ManagerEditProject from "./Components/ManagerDash/EditProject.jsx";
    // Manage Talents
    import ManagerManageTalents from "./Components/ManagerDash/ManageTalents/ManageTalent.jsx";
    import ManagerAssignTalents from "./Components/ManagerDash/ManageTalents/AssignTalent.jsx";
    import ManagerViewTalents from "./Components/ManagerDash/ManageTalents/ViewTalent.jsx";
    import ManagerEditTalents from "./Components/ManagerDash/ManageTalents/EditTalent.jsx";
import Reports from "./Components/ManagerDash/Reports.jsx";
import ManagerProfile from "./Components/ManagerDash/Profile.jsx";
import ManagerChangePass from "./Components/ManagerDash/ChangePassword.jsx";

// Admin pages
    // Manage accounts
        import AdminManageAccounts from "./Components/Admin/ManageAccounts/ManageAccounts.jsx";
        import AdminAddAccount from "./Components/Admin/ManageAccounts/AddAccount.jsx";
        import AdminViewAccount from "./Components/Admin/ManageAccounts/ViewAccount.jsx";
        import AdminEditAccount from "./Components/Admin/ManageAccounts/EditAccount.jsx";
        import AdminAddProject from "./Components/Admin/ManageAccounts/AddProject.jsx";
        import AdminViewProject from "./Components/Admin/ManageAccounts/ViewProject.jsx";
        import AdminEditProject from "./Components/Admin/ManageAccounts/EditProject.jsx";
        import AdminAddTalent from "./Components/Admin/ManageAccounts/AddTalent.jsx";
    // Manage users
        import AdminManageUsers from "./Components/Admin/ManageUsers.jsx";
        import AdminAddUsers from "./Components/Admin/AddUser.jsx";
        import AdminViewUser from "./Components/Admin/ViewUser.jsx";
        import AdminEditUser from"./Components/Admin/EditUser.jsx";
    // Manage Talents
        import AdminManageTalents from "./Components/Admin/ManageTalents/ManageTalents.jsx";
        import AdminAssignTalents from "./Components/Admin/ManageTalents/AssignTalent.jsx";
        import AdminViewTalents from "./Components/Admin/ManageTalents/ViewTalent.jsx";
        import AdminEditTalents from "./Components/Admin/ManageTalents/EditTalent.jsx";
    // Profile
        import AdminProfile from "./Components/Admin/Profile.jsx";
        import AdminChangePass from "./Components/Admin/ChangePassword.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login related pages */}
            <Route path="/" element={<Login />} />
            <Route path="/resetsuccess" element={<Screen4 />} />
            <Route path="/reset-password/:token" element={<Screen3 />} />
            <Route path="/sentemail" element={<Screen2 />} />
            <Route path="/forgotpass" element={<Screen1 />} />
        { /* Talent pages */ }
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/timesheet" element={<Timesheet />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/changepass" element={<ChangePass />} />
        {/* Manager pages */}
            {/* Manage Accounts */}
                <Route path="/manager/manage-accounts" element={<ManagerDashboard />} />
                <Route path="/manager/manage-accounts/add-account" element={<AddAccount />} />
                <Route path="/manager/manage-accounts/edit-account/:accountid" element={<EditAccount />} />
                <Route path="/manager/manage-accounts/view-account/:accountid" element={<ManagerViewAccount />} />
                <Route path="/manager/manage-accounts/edit-account/:accountid/add-project" element={<ManagerAddProject />} />
                <Route path="/manager/manage-accounts/view-account/:accountid/view-project/:projectid" element={<ManagerViewProject />} />
                <Route path="/manager/manage-accounts/view-account/:accountid/edit-project/:projectid" element={<ManagerEditProject />} />
            {/* Manage Talents */}
                <Route path="/manager/manage-talents" element={<ManagerManageTalents />} />
                <Route path="/manager/manage-talents/assign-talent" element={<ManagerAssignTalents />} />
                <Route path="/manager/manage-talents/view-talent/:talent_id" element={<ManagerViewTalents />} />
                <Route path="/manager/manage-talents/edit-talent/:talent_id" element={<ManagerEditTalents />} />
            {/* Reports */}
                <Route path="/manager/reports" element={<Reports />} />
            {/* Profile */}
                <Route path="/manager/profile" element={<ManagerProfile />} />
                <Route path="/manager/profile/changepass" element={<ManagerChangePass />} />
        {/* Admin pages */}
            {/* Manage Accounts */}
                <Route path="/admin/manage-accounts" element={<AdminManageAccounts />} />
                <Route path="/admin/manage-accounts/add-account" element={<AdminAddAccount />} />
                <Route path="/admin/manage-accounts/:manager_id/view-account/:account_id" element={<AdminViewAccount />} />
                <Route path="/admin/manage-accounts/:manager_id/edit-account/:account_id" element={<AdminEditAccount />} />
                <Route path="/admin/manage-accounts/:manager_id/edit-account/:account_id/add-project" element={<AdminAddProject />} />
                <Route path="/admin/manage-accounts/:manager_id/view-account/:account_id/view-project/:projectid" element={<AdminViewProject />} />
                <Route path="/admin/manage-accounts/:manager_id/view-account/:account_id/edit-project/:projectid" element={<AdminEditProject />} />
                <Route path="/admin/manage-accounts/:manager_id/view-account/:account_id/edit-project/:projectid" element={<AdminEditProject />} />
                <Route path="/admin/manage-accounts/:manager_id/account/:account_id/project/:projectid/talents/add" element={<AdminAddTalent />} />
            {/* Manage Users */}
                <Route path="/admin/manage-users" element={<AdminManageUsers />} />
                <Route path="/admin/manage-users/add-user" element={<AdminAddUsers />} />
                <Route path="/admin/manage-users/view-user/:employee_id" element={<AdminViewUser />} />
                <Route path="/admin/manage-users/edit-user/:employee_id" element={<AdminEditUser />} />
            {/* Manage Talents */}
                <Route path="/admin/manage-talents" element={<AdminManageTalents />} />
                <Route path="/admin/manage-talents/assign-talent" element={<AdminAssignTalents />} />
                <Route path="/admin/manage-talents/view-talent/:talent_id" element={<AdminViewTalents />} />
                <Route path="/admin/manage-talents/edit-talent/:talent_id" element={<AdminEditTalents />} />
            {/* Profile */}
                <Route path="/admin/profile" element={<AdminProfile />} />
                <Route path="/admin/profile/changepass" element={<AdminChangePass />} />
      </Routes>
    </Router>
  );
}
export default App;
