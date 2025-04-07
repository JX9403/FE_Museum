import React from "react";
import "./App.css";

import HomePage from "./layouts/homepage/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutUser from "./layouts/LayoutUser";
import NewsPage from "./layouts/NewsPage/NewsPage";
import AuthorPage from "./layouts/AuthorPage/AuthorPage";
import WorkPage from "./layouts/WorkPage/WorkPage";
import LayoutAdmin from "./layouts/LayoutAdmin";
import NewsManagement from "./layouts/Admin/NewsManagement/NewsManagement";
import AuthorManagement from "./layouts/Admin/AuthorManagement/AuthorManagement";
import WorkManagement from "./layouts/Admin/WorkManagement/WorkManagement";
import StoryPage from "./layouts/StoryPage/StoryPage";
import StoryManagement from "./layouts/Admin/StoryManagement/StoryManagement";
import UserManagement from "./layouts/Admin/UserManagement/UserManagement";
import AccountManagement from "./layouts/Admin/AccountManagement/AccountManagement";
import Dashboard from "./layouts/Admin/Dashboard/Dashboard";
import AuthorCreate from "./layouts/Admin/AuthorManagement/AuthorCreate";
import AuthorTable from "./layouts/Admin/AuthorManagement/AuthorTable";
import AuthorEdit from "./layouts/Admin/AuthorManagement/AuthorEdit";

function App() {
  return (
    <div className="App ">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutUser />}>
            <Route index element={<HomePage />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="authors" element={<AuthorPage />} />
            <Route path="works" element={<WorkPage />} />
            <Route path="stories" element={<StoryPage />} />
          </Route>

          <Route path="/admin" element={<LayoutAdmin />}>
            <Route index element={<Dashboard />} />
            <Route path="news" element={<NewsManagement />} />
            <Route path="authors" element={<AuthorManagement />}>
              <Route index element={<AuthorTable />} />
              <Route path="create" element={<AuthorCreate />} />
              <Route path="edit/:id" element={<AuthorEdit />} />
              {/* Tạo mới tác giả */}
            </Route>
            <Route path="works" element={<WorkManagement />} />
            <Route path="stories" element={<StoryManagement />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="account" element={<AccountManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
