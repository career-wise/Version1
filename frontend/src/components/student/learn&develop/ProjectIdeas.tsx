import React from "react";
import { Lightbulb, Code, Camera, BookOpen } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const ProjectIdeas: React.FC = () => {
  const projects = [
    {
      title: "Build a Personal Website",
      category: "Technology",
      difficulty: "Beginner",
      description:
        "Create your own portfolio website using HTML, CSS, and JavaScript",
      skills: ["Web Development", "Design", "Coding"],
      icon: <Code className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "Start a Photography Blog",
      category: "Creative",
      difficulty: "Beginner",
      description:
        "Document your photography journey and share your work online",
      skills: ["Photography", "Writing", "Blogging"],
      icon: <Camera className="h-8 w-8 text-purple-600" />,
    },
    {
      title: "Write a Research Paper",
      category: "Academic",
      difficulty: "Intermediate",
      description:
        "Conduct original research on a topic you're passionate about",
      skills: ["Research", "Writing", "Analysis"],
      icon: <BookOpen className="h-8 w-8 text-green-600" />,
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Ideas</h1>
        <p className="text-gray-600">
          Creative projects to build your skills and portfolio
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-all duration-200"
          >
            <div className="mb-4">{project.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {project.title}
            </h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex items-center justify-between mb-4">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                {project.category}
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                {project.difficulty}
              </span>
            </div>
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">
                Skills You'll Build:
              </h4>
              <div className="flex flex-wrap gap-1">
                {project.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <Button className="w-full" size="sm">
              Start Project
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectIdeas;
