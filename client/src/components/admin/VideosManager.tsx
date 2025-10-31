// src/components/admin/VideosManager.tsx

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, Video, ExternalLink, Play, X } from "lucide-react";
import { AdminForm } from "./AdminForm";
import { PortfolioVideo, CurrentFormState, FormDataType } from "@/types";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

// Define the base URL for your API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

interface VideosManagerProps {
  // Props are no longer needed as state is managed internally
}

export const VideosManager = (props: VideosManagerProps) => {
  const [videos, setVideos] = useState<PortfolioVideo[]>([]);
  const [currentForm, setCurrentForm] = useState<CurrentFormState>({ type: null, data: {}, isEditing: false });

  // Fetch videos from the API when the component mounts
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Use the API_BASE_URL for fetching data
        const response = await fetch(`${API_BASE_URL}/api/portfolio/videos`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      }
    };
    fetchVideos();
  }, []);

  const openForm = (type: string, data: FormDataType = {}, isEditing = false) => {
    setCurrentForm({ type, data, isEditing });
  };

  const handleCancelForm = () => {
    setCurrentForm({ type: null, data: {}, isEditing: false });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Your file handling logic here
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { data, isEditing } = currentForm;

    // Determine the correct URL for creating or updating
    const url = isEditing
      ? `${API_BASE_URL}/api/portfolio/videos/${data._id}`
      : `${API_BASE_URL}/api/portfolio/videos`;

    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        if (isEditing) {
          // Update the specific video in the list
          setVideos(videos.map(v => v._id === result._id ? result : v));
        } else {
          // Add the new video to the list
          setVideos([...videos, result]);
        }
        handleCancelForm();
      } else {
        console.error("Failed to submit form:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred during form submission:", error);
    }
  };

  const handleDelete = async (type: string, id: string) => {
    if (confirm('Are you sure you want to delete this video?')) {
      try {
        // Use the API_BASE_URL for the delete request
        const response = await fetch(`${API_BASE_URL}/api/portfolio/videos/${id}`, { method: 'DELETE' });
        if (response.ok) {
          // Filter out the deleted video from the state
          setVideos(videos.filter(v => v._id !== id));
        } else {
          console.error("Failed to delete video:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred while deleting the video:", error);
      }
    }
  };

  const videoFields = [
    { name: 'title', label: 'Video Title', placeholder: 'Enter video title' },
    { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Enter video description' },
    { name: 'embedUrl', label: 'YouTube Embed URL', placeholder: 'https://www.youtube.com/watch?v=...' },
  ];

  const getYouTubeId = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const getYouTubeWatchUrl = (url: string) => {
    const videoId = getYouTubeId(url);
    return videoId ? `https://www.youtube.com/watch?v=${videoId}` : url;
  };

  const getYouTubeThumbnail = (url: string) => {
    const videoId = getYouTubeId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
  };

  const isModalOpen = currentForm.type === 'portfolio/videos';

  return (
    <>
      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-white">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Video className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  {currentForm.isEditing ? 'Edit Video' : 'Add New Video'}
                </h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancelForm}
                className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <AdminForm
                fields={videoFields}
                formData={currentForm.data}
                setFormData={(d) => setCurrentForm({ ...currentForm, data: d })}
                onFileChange={handleFileChange}
                onSubmit={handleFormSubmit}
                onCancel={handleCancelForm}
                isEditing={currentForm.isEditing}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-50 to-white">
        <CardHeader className="bg-gradient-to-r from-red-50 to-white border-b border-red-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Video className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">Manage Videos</CardTitle>
            </div>
            <Button
              onClick={() => openForm('portfolio/videos')}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white mt-4 sm:mt-0 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add New Video
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mt-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Your Videos ({videos.length})</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Video className="w-4 h-4" />
                <span>YouTube Portfolio</span>
              </div>
            </div>

            {videos.length === 0 ? (
              <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-dashed border-gray-200">
                <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-600 mb-2">No videos yet</h4>
                <p className="text-gray-500 mb-4">Add your first YouTube video to showcase your work</p>
                <Button
                  onClick={() => openForm('portfolio/videos')}
                  className="bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Your First Video
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {videos.map(video => {
                  const youtubeUrl = video.embedUrl ? getYouTubeWatchUrl(video.embedUrl) : '#';
                  const thumbnailUrl = video.embedUrl ? getYouTubeThumbnail(video.embedUrl) : null;

                  return (
                    <div
                      key={video._id}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group"
                    >
                      {/* Video Thumbnail */}
                      <div className="relative aspect-video bg-gray-900 overflow-hidden">
                        {thumbnailUrl ? (
                          <>
                            <img
                              src={thumbnailUrl}
                              alt={video.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                          </>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                            <Video className="w-12 h-12 text-gray-400" />
                          </div>
                        )}

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <a
                            href={youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-2xl transform group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                          >
                            <Play className="w-6 h-6 fill-current" />
                          </a>
                        </div>

                        {/* YouTube Badge */}
                        <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1">
                          <Video className="w-3 h-3" />
                          <span>YouTube</span>
                        </div>
                      </div>

                      {/* Video Content */}
                      <div className="p-5">
                        <div className="mb-3">
                          <h4 className="font-bold text-gray-900 text-lg line-clamp-2 mb-2 group-hover:text-red-600 transition-colors duration-200">
                            {video.title}
                          </h4>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {video.description}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                          >
                            <a
                              href={youtubeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1"
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span>Watch</span>
                            </a>
                          </Button>

                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openForm('portfolio/videos', video, true)}
                              className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete('portfolio/videos', video._id!)}
                              className="bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};