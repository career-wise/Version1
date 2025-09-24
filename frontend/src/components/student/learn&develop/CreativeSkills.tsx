// CreativeSkills.tsx
import React from "react";
import { Palette, Camera, Music, Edit } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const CreativeSkills: React.FC = () => {
  const creativeAreas = [
    {
      name: "Visual Arts",
      description: "Explore drawing, painting, and digital art",
      icon: <Palette className="h-8 w-8 text-pink-600" />,
      tools: ["Photoshop", "Illustrator", "Procreate", "Traditional Media"],
      projects: ["Digital illustration", "Logo design", "Portrait drawing"],
    },
    {
      name: "Photography",
      description: "Learn composition, lighting, and photo editing",
      icon: <Camera className="h-8 w-8 text-blue-600" />,
      tools: [
        "DSLR cameras",
        "Lightroom",
        "Mobile photography",
        "Studio lighting",
      ],
      projects: [
        "Portrait photography",
        "Landscape shots",
        "Product photography",
      ],
    },
    {
      name: "Music & Audio",
      description: "Create and produce music and audio content",
      icon: <Music className="h-8 w-8 text-green-600" />,
      tools: ["GarageBand", "Logic Pro", "Audacity", "Instruments"],
      projects: ["Song composition", "Podcast production", "Sound effects"],
    },
    {
      name: "Video & Film",
      description: "Video production, editing, and storytelling",
      icon: <Edit className="h-8 w-8 text-purple-600" />,
      tools: [
        "Final Cut Pro",
        "Adobe Premiere",
        "DaVinci Resolve",
        "Mobile apps",
      ],
      projects: ["Short films", "YouTube videos", "Event documentation"],
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Creative Skills
        </h1>
        <p className="text-gray-600">
          Develop your artistic abilities and creative expression
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {creativeAreas.map((area, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-start space-x-4 mb-4">
              {area.icon}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {area.name}
                </h3>
                <p className="text-gray-600 mb-4">{area.description}</p>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">
                Tools & Software:
              </h4>
              <div className="flex flex-wrap gap-1">
                {area.tools.map((tool, toolIndex) => (
                  <span
                    key={toolIndex}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-2">Project Ideas:</h4>
              <ul className="space-y-1">
                {area.projects.map((project, projectIndex) => (
                  <li
                    key={projectIndex}
                    className="text-sm text-gray-600 flex items-center"
                  >
                    <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                    {project}
                  </li>
                ))}
              </ul>
            </div>

            <Button className="w-full" size="sm">
              Start Creating
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CreativeSkills;
