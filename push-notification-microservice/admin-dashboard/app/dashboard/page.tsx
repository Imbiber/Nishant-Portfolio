'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { apiClient } from '@/lib/api';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    loadProjects();
  }, [isAuthenticated]);

  const loadProjects = async () => {
    try {
      const data = await apiClient.getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.createProject({ name: newProjectName });
      setNewProjectName('');
      setShowNewProject(false);
      loadProjects();
    } catch (error: any) {
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Push Notification Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">{user?.email}</span>
              <button
                onClick={() => logout()}
                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Projects</h2>
            <button
              onClick={() => setShowNewProject(!showNewProject)}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              New Project
            </button>
          </div>

          {showNewProject && (
            <div className="mb-6 p-4 bg-white rounded-lg shadow">
              <form onSubmit={handleCreateProject} className="flex gap-4">
                <input
                  type="text"
                  placeholder="Project name"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewProject(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">API Key:</span>{' '}
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                      {project.apiKey}
                    </code>
                  </p>
                  <p>
                    <span className="font-medium">Subscriptions:</span>{' '}
                    {project._count?.subscriptions || 0}
                  </p>
                  <p>
                    <span className="font-medium">Notifications:</span>{' '}
                    {project._count?.notifications || 0}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <button className="text-sm text-primary hover:underline">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {projects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No projects yet. Create your first project to get started!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
