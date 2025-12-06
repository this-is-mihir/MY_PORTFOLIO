import { useContext } from "react";
import { DataProvider } from "../context/DataContext";
import { BlogContext } from "../context/BlogContext";
import { ProjectContext } from "../context/ProjectContext";
// Custom hook for easy usage
export function useData() {
  return useContext(DataProvider);
}

export function useBlog() {
  return useContext(BlogContext);
}
export const useProjects = () => useContext(ProjectContext);