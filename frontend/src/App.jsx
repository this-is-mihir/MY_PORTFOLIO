// src/App.jsx
import React from "react";
import { BrowserRouter, HashRouter, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/index.jsx";
import AppRouter from "./router";
import Footer from "./components/footer/index.jsx";
import { DataProvider } from "./context/DataContext";
import { AdminAuthProvider } from "./context/AdminAuthContext.jsx";
import { SkillProvider } from "./context/SkillContext.jsx";
import { BlogProvider } from "./context/BlogContext.jsx";
import { Toaster } from "react-hot-toast";
import { ProjectProvider } from "./context/ProjectContext.jsx";

/**
 * Use BrowserRouter for localhost (developer), HashRouter for deployed domains.
 * This keeps local dev routes working exactly as before (no #), and avoids 404 on deploy.
 */
const isLocal = typeof window !== "undefined" && window.location.hostname.includes("localhost");

function Layout() {
  const location = useLocation();
  const hideLayout = location.pathname.startsWith("/admin");
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Toaster position="top-right" reverseOrder={false} />
      {!hideLayout && <Navbar />}
      <main className="flex-1">
        <AppRouter />
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
}

export default function App() {
  const Router = isLocal ? BrowserRouter : HashRouter;
  return (
    <AdminAuthProvider>
      <DataProvider>
        <SkillProvider>
          <BlogProvider>
            <ProjectProvider>
              <Router>
                <Layout />
              </Router>
            </ProjectProvider>
          </BlogProvider>
        </SkillProvider>
      </DataProvider>
    </AdminAuthProvider>
  );
}
