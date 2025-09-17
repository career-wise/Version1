import React, { useState } from "react";
import {
  Upload,
  FileText,
  Image,
  File,
  Download,
  Eye,
  Trash2,
  Plus,
  Search,
  Filter,
  FolderPlus,
  Folder,
  Star,
  Calendar,
  User,
} from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";
import Input from "../../shared/ui/Input";

const DocumentManager: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  const categories = [
    { id: "all", name: "All Documents", count: 12 },
    { id: "academic", name: "Academic Records", count: 5 },
    { id: "certificates", name: "Certificates", count: 3 },
    { id: "projects", name: "Projects", count: 2 },
    { id: "personal", name: "Personal Documents", count: 2 },
  ];

  const documents = [
    {
      id: 1,
      name: "High School Transcript",
      type: "PDF",
      size: "2.4 MB",
      category: "academic",
      uploadDate: "2024-01-15",
      starred: true,
      thumbnail: "📄",
    },
    {
      id: 2,
      name: "SAT Score Report",
      type: "PDF",
      size: "1.2 MB",
      category: "academic",
      uploadDate: "2024-01-10",
      starred: false,
      thumbnail: "📊",
    },
    {
      id: 3,
      name: "Programming Certificate",
      type: "PDF",
      size: "800 KB",
      category: "certificates",
      uploadDate: "2024-01-08",
      starred: true,
      thumbnail: "🏆",
    },
    {
      id: 4,
      name: "Science Fair Project",
      type: "DOCX",
      size: "5.1 MB",
      category: "projects",
      uploadDate: "2024-01-05",
      starred: false,
      thumbnail: "🔬",
    },
    {
      id: 5,
      name: "Birth Certificate",
      type: "PDF",
      size: "1.8 MB",
      category: "personal",
      uploadDate: "2024-01-03",
      starred: false,
      thumbnail: "📋",
    },
    {
      id: 6,
      name: "Volunteer Hours Certificate",
      type: "PDF",
      size: "900 KB",
      category: "certificates",
      uploadDate: "2024-01-02",
      starred: false,
      thumbnail: "🤝",
    },
  ];

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <FileText className="h-6 w-6 text-red-500" />;
      case "docx":
      case "doc":
        return <FileText className="h-6 w-6 text-blue-500" />;
      case "jpg":
      case "jpeg":
      case "png":
        return <Image className="h-6 w-6 text-green-500" />;
      default:
        return <File className="h-6 w-6 text-gray-500" />;
    }
  };

  const handleUpload = () => {
    // Handle file upload logic
    console.log("Upload file");
  };

  const handleCreateFolder = () => {
    // Handle folder creation logic
    console.log("Create folder");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Manager</h1>
          <p className="text-gray-600">
            Upload, organize, and manage your important documents and certificates
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handleCreateFolder}>
            <FolderPlus className="h-4 w-4 mr-2" />
            New Folder
          </Button>
          <Button onClick={handleUpload}>
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="text-center" padding="lg">
          <div className="text-2xl font-bold text-blue-600 mb-1">12</div>
          <div className="text-sm text-gray-600">Total Documents</div>
        </Card>
        <Card className="text-center" padding="lg">
          <div className="text-2xl font-bold text-green-600 mb-1">24.8 MB</div>
          <div className="text-sm text-gray-600">Storage Used</div>
        </Card>
        <Card className="text-center" padding="lg">
          <div className="text-2xl font-bold text-purple-600 mb-1">3</div>
          <div className="text-sm text-gray-600">Starred Items</div>
        </Card>
        <Card className="text-center" padding="lg">
          <div className="text-2xl font-bold text-orange-600 mb-1">5</div>
          <div className="text-sm text-gray-600">Categories</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                    selectedCategory === category.id
                      ? "bg-primary-50 text-primary-700 border border-primary-200"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Folder className="h-4 w-4" />
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Star className="h-4 w-4 mr-2" />
                  Starred Items
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Recent Uploads
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Shared with Me
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="h-4 w-4 text-gray-400" />}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${
                    viewMode === "grid" ? "bg-primary-50 text-primary-600" : "text-gray-500"
                  }`}
                >
                  <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${
                    viewMode === "list" ? "bg-primary-50 text-primary-600" : "text-gray-500"
                  }`}
                >
                  <div className="w-4 h-4 flex flex-col gap-1">
                    <div className="bg-current h-0.5 rounded"></div>
                    <div className="bg-current h-0.5 rounded"></div>
                    <div className="bg-current h-0.5 rounded"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Documents Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="hover:shadow-lg transition-all duration-200 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{doc.thumbnail}</div>
                    <div className="flex items-center space-x-1">
                      {doc.starred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-2 truncate">{doc.name}</h3>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <span>{doc.type}</span>
                    <span>{doc.size}</span>
                  </div>

                  <div className="text-xs text-gray-500 mb-4">
                    Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <div className="space-y-4">
                {filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center space-x-4">
                      {getFileIcon(doc.type)}
                      <div>
                        <h3 className="font-medium text-gray-900">{doc.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{doc.type}</span>
                          <span>{doc.size}</span>
                          <span>Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {doc.starred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Empty State */}
          {filteredDocuments.length === 0 && (
            <Card className="text-center" padding="lg">
              <div className="text-6xl mb-4">📁</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery
                  ? "Try adjusting your search terms"
                  : "Upload your first document to get started"}
              </p>
              <Button onClick={handleUpload}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentManager;