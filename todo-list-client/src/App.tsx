import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthPage } from "@/features/auth/pages/auth-page.tsx";
import { ThemeProvider } from "@/providers/theme-provider.tsx";
import { AuthProvider } from "@/features/auth/providers/auth-provider.tsx";
import { MyProjectsPage } from "@/features/project/pages/my-projects-page.tsx";
import { Toaster } from "react-hot-toast";
import { ProjectPage } from "@/features/project/pages/project-page.tsx";
import { ProjectCollaboratorsPage } from "@/features/project/pages/project-collaborators-page.tsx";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path={"/auth"} element={<AuthPage />} />
            <Route path={"/"} element={<MyProjectsPage />} />
            <Route path={"/projects"} element={<MyProjectsPage />} />
            <Route path={"/projects/:id"} element={<ProjectPage />} />
            <Route
              path={"/projects/:id/collaborators"}
              element={<ProjectCollaboratorsPage />}
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
