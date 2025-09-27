import { projects } from '@/data/projects';
import Image from 'next/image';

export default function Projects() {
  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">My Projects</h1>
          <p className="mt-4 text-lg text-gray-600">
            Here are some of the projects I've worked on
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 shadow-sm"
            >
              <div className="aspect-video bg-gray-100">
                {/* Project image */}
                <div className="flex h-full items-center justify-center text-gray-400">
                  Project Image
                </div>
              </div>
              
              <div className="flex-grow p-6">
                <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                <p className="mt-2 text-gray-600">{project.description}</p>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between border-t border-gray-200 p-6">
                <a
                  href={project.liveUrl}
                  className="text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  Live Demo
                </a>
                <a
                  href={project.githubUrl}
                  className="text-sm font-medium text-gray-600 hover:text-gray-500"
                >
                  GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}