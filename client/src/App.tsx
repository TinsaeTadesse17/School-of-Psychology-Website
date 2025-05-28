import { Switch, Route } from "wouter";
import MainLayout from "./layout/MainLayout";
import DashboardLayout from "./layout/DashboardLayout";
import AdminLayout from "./layout/AdminLayout";
import HomePage from "./pages/HomePage";
import FacultyPage from "./pages/FacultyPage";
import ResearchPage from "./pages/ResearchPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import DashboardPage from "./pages/DashboardPage";
import CoursesPage from "./pages/CoursesPage";
import ResourcesPage from "./pages/ResourcesPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminContentPage from "./pages/AdminContentPage";
import NotFound from "./pages/not-found";
import { useAuth } from "./hooks/useAuth";
import { UserRole } from "@shared/schema";
import NewsPage from "./pages/NewsPage";

function App() {
  const { user } = useAuth();
  
  const isStudent = user && (user.role === UserRole.STUDENT || user.role === UserRole.ADMIN);
  const isAdmin = user && user.role === UserRole.ADMIN;

  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/">
        <MainLayout>
          <HomePage />
        </MainLayout>
      </Route>
      <Route path="/faculty">
        <MainLayout>
          <FacultyPage />
        </MainLayout>
      </Route>
      <Route path="/research">
        <MainLayout>
          <ResearchPage />
        </MainLayout>
      </Route>
      <Route path="/about">
        <MainLayout>
          <AboutPage />
        </MainLayout>
      </Route>
      <Route path="/contact">
        <MainLayout>
          <ContactPage />
        </MainLayout>
      </Route>
      <Route path="/academics">
        <MainLayout>
          <CoursesPage />
        </MainLayout>
      </Route>
      <Route path="/news">
        <MainLayout>
          <NewsPage />
        </MainLayout>
      </Route>
      <Route path="/admissions">
        <MainLayout>
          <AboutPage />
        </MainLayout>
      </Route>
      <Route path="/calendar">
        <MainLayout>
          <ResourcesPage />
        </MainLayout>
      </Route>
      <Route path="/services">
        <MainLayout>
          <ResourcesPage />
        </MainLayout>
      </Route>
      <Route path="/career">
        <MainLayout>
          <ResourcesPage />
        </MainLayout>
      </Route>
      <Route path="/ethics">
        <MainLayout>
          <ResearchPage />
        </MainLayout>
      </Route>
      <Route path="/students">
        <MainLayout>
          <ResourcesPage />
        </MainLayout>
      </Route>

      {/* Student Routes */}
      <Route path="/dashboard">
        {isStudent ? (
          <DashboardLayout>
            <DashboardPage />
          </DashboardLayout>
        ) : (
          <MainLayout>
            <HomePage />
          </MainLayout>
        )}
      </Route>
      <Route path="/courses">
        {isStudent ? (
          <DashboardLayout>
            <CoursesPage />
          </DashboardLayout>
        ) : (
          <MainLayout>
            <HomePage />
          </MainLayout>
        )}
      </Route>
      <Route path="/resources">
        {isStudent ? (
          <DashboardLayout>
            <ResourcesPage />
          </DashboardLayout>
        ) : (
          <MainLayout>
            <HomePage />
          </MainLayout>
        )}
      </Route>

      {/* Admin Routes */}
      <Route path="/admin">
        {isAdmin ? (
          <AdminLayout>
            <AdminDashboardPage />
          </AdminLayout>
        ) : (
          <MainLayout>
            <HomePage />
          </MainLayout>
        )}
      </Route>
      <Route path="/admin/users">
        {isAdmin ? (
          <AdminLayout>
            <AdminUsersPage />
          </AdminLayout>
        ) : (
          <MainLayout>
            <HomePage />
          </MainLayout>
        )}
      </Route>
      <Route path="/admin/content">
        {isAdmin ? (
          <AdminLayout>
            <AdminContentPage />
          </AdminLayout>
        ) : (
          <MainLayout>
            <HomePage />
          </MainLayout>
        )}
      </Route>

      {/* 404 Route */}
      <Route>
        <MainLayout>
          <NotFound />
        </MainLayout>
      </Route>
    </Switch>
  );
}

export default App;
