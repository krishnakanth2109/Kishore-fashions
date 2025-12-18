import { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Trash2, Plus, Save, Loader2, Upload, ImageIcon, 
  UserCircle, BookOpen, CheckCircle2 
} from "lucide-react";
import axios from "axios";

// ✅ Get API URL from .env
const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// Interface matches backend model
interface Story {
  _id?: string;
  image: string;
  heading: string;
  paragraph: string;
}

const SuccessStoriesManager = () => {
  // Data State
  const [founderImage, setFounderImage] = useState("");
  const [stories, setStories] = useState<Story[]>([]);
  
  // UI State
  const [activeTab, setActiveTab] = useState<"founder" | "stories">("founder");
  const [fetching, setFetching] = useState(true);
  const [uploadingId, setUploadingId] = useState<string | number | null>(null);
  
  // Separate Loading States
  const [savingFounder, setSavingFounder] = useState(false);
  const [savingStories, setSavingStories] = useState(false);

  // Fetch initial data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/about`);
      setFounderImage(res.data.founderImage || "");
      setStories(res.data.successStories || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setFetching(false);
    }
  };

  // --- IMAGE UPLOAD HANDLER ---
  const handleImageUpload = async (file: File): Promise<string | null> => {
    if (!file) return null;
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(`${API_URL}/api/about/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.url;
    } catch (error) {
      console.error("Upload failed", error);
      alert("Image upload failed. Please try again.");
      return null;
    }
  };

  // Handle Founder Image Change
  const onFounderFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadingId("founder");
      const url = await handleImageUpload(file);
      if (url) setFounderImage(url);
      setUploadingId(null);
    }
  };

  // Handle Story Image Change
  const onStoryFileChange = async (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadingId(index);
      const url = await handleImageUpload(file);
      if (url) {
        updateStory(index, "image", url);
      }
      setUploadingId(null);
    }
  };

  // --- SAVE FOUNDER ONLY ---
  const handleSaveFounder = async () => {
    setSavingFounder(true);
    try {
      await axios.put(`${API_URL}/api/about`, {
        founderImage,     // Update this
        successStories: stories, // Keep this as is
      });
      alert("Founder Profile Updated Successfully!");
    } catch (error) {
      console.error("Error saving founder:", error);
      alert("Failed to save founder profile.");
    } finally {
      setSavingFounder(false);
    }
  };

  // --- SAVE STORIES ONLY ---
  const handleSaveStories = async () => {
    setSavingStories(true);
    try {
      await axios.put(`${API_URL}/api/about`, {
        founderImage,     // Keep this as is
        successStories: stories, // Update this
      });
      alert("Success Stories Saved Successfully!");
    } catch (error) {
      console.error("Error saving stories:", error);
      alert("Failed to save stories.");
    } finally {
      setSavingStories(false);
    }
  };

  // --- STORY HELPERS ---
  const addStory = () => {
    setStories([...stories, { image: "", heading: "", paragraph: "" }]);
  };

  const removeStory = (index: number) => {
    const newStories = stories.filter((_, i) => i !== index);
    setStories(newStories);
  };

  const updateStory = (index: number, field: keyof Story, value: string) => {
    const newStories = [...stories];
    newStories[index] = { ...newStories[index], [field]: value };
    setStories(newStories);
  };

  if (fetching) return (
    <div className="h-[50vh] flex flex-col items-center justify-center text-gray-500 gap-3">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" /> 
      <p>Loading About Data...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">About Page Management</h1>
        <p className="text-gray-500 mt-2">Manage the founder profile and success stories displayed on the About page.</p>
      </div>

      {/* CUSTOM TABS */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab("founder")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === "founder" 
              ? "bg-white text-blue-600 shadow-sm ring-1 ring-black/5" 
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
          }`}
        >
          <UserCircle className="w-4 h-4" />
          Founder Profile
        </button>
        <button
          onClick={() => setActiveTab("stories")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === "stories" 
              ? "bg-white text-blue-600 shadow-sm ring-1 ring-black/5" 
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Success Stories
          <span className="bg-gray-200 text-gray-600 text-[10px] px-1.5 py-0.5 rounded-full ml-1">
            {stories.length}
          </span>
        </button>
      </div>

      {/* --- TAB CONTENT: FOUNDER --- */}
      {activeTab === "founder" && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Card className="border-none shadow-lg bg-white overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500" />
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                
                {/* Image Preview */}
                <div className="flex-shrink-0 relative group">
                  <div className="w-72 h-72 rounded-full border-8 border-gray-50 shadow-2xl overflow-hidden bg-gray-100 flex items-center justify-center relative">
                    {uploadingId === "founder" ? (
                      <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
                    ) : founderImage ? (
                      <img src={founderImage} alt="Founder" className="w-full h-full object-cover" />
                    ) : (
                      <UserCircle className="w-24 h-24 text-gray-300" />
                    )}
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                         onClick={() => document.getElementById('founder-upload')?.click()}>
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Hidden Input */}
                  <Input 
                    id="founder-upload"
                    type="file" 
                    accept="image/*"
                    className="hidden"
                    onChange={onFounderFileChange}
                    disabled={uploadingId !== null}
                  />
                  
                  <div className="text-center mt-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => document.getElementById('founder-upload')?.click()}
                      disabled={uploadingId !== null}
                    >
                      <Upload className="w-3 h-3 mr-2" />
                      Upload New Photo
                    </Button>
                  </div>
                </div>

                {/* Info Text */}
                <div className="flex-1 space-y-6 text-center md:text-left">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800">Founder Image</h3>
                    <p className="text-gray-500 mt-2 leading-relaxed">
                      This image appears prominently on the About Us page. 
                      Please upload a high-quality, professional photo (preferably square aspect ratio).
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-800">
                      Changes made here are local until you click the save button below.
                      Ensure the image is optimized for web to ensure fast loading times.
                    </p>
                  </div>

                  <div className="pt-4">
                    <Button 
                      onClick={handleSaveFounder} 
                      disabled={savingFounder || uploadingId !== null}
                      className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 h-auto shadow-lg shadow-blue-200"
                    >
                      {savingFounder ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
                      Save Founder Profile
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* --- TAB CONTENT: STORIES --- */}
      {activeTab === "stories" && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6">
          
          <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border">
            <div>
              <h3 className="font-semibold text-gray-800">Stories List</h3>
              <p className="text-sm text-gray-500">Add, edit, or remove student success stories.</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={addStory} variant="outline" className="border-dashed border-gray-300 hover:bg-gray-50">
                <Plus className="w-4 h-4 mr-2" /> Add Story
              </Button>
              <Button 
                onClick={handleSaveStories} 
                disabled={savingStories || uploadingId !== null}
                className="bg-green-600 hover:bg-green-700 shadow-md shadow-green-100"
              >
                {savingStories ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save All Stories
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
            {stories.map((story, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-gray-200 overflow-hidden">
                <div className="relative h-56 bg-gray-100 border-b">
                  {/* Remove Button */}
                  <Button 
                    onClick={() => removeStory(index)} 
                    variant="destructive" 
                    size="icon" 
                    className="absolute top-3 right-3 h-8 w-8 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>

                  {/* Image Area */}
                  {uploadingId === index ? (
                    <div className="w-full h-full flex items-center justify-center">
                       <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                    </div>
                  ) : story.image ? (
                    <img src={story.image} alt="Story" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                      <ImageIcon className="w-10 h-10 mb-2" />
                      <span className="text-sm">No Image Uploaded</span>
                    </div>
                  )}

                  {/* Upload Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <Input 
                        id={`story-upload-${index}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => onStoryFileChange(index, e)}
                        disabled={uploadingId !== null}
                      />
                      <Button 
                        variant="secondary" 
                        onClick={() => document.getElementById(`story-upload-${index}`)?.click()}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {story.image ? "Change Image" : "Upload Image"}
                      </Button>
                  </div>
                </div>

                <CardContent className="p-5 space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Heading</label>
                    <Input 
                      value={story.heading} 
                      onChange={(e) => updateStory(index, 'heading', e.target.value)} 
                      placeholder="e.g. Boutique Collection" 
                      className="font-semibold text-lg border-transparent hover:border-gray-200 focus:border-blue-500 px-0 rounded-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Description</label>
                    <Textarea 
                      value={story.paragraph} 
                      onChange={(e) => updateStory(index, 'paragraph', e.target.value)} 
                      placeholder="Write a brief description..." 
                      rows={3}
                      className="resize-none border-gray-100 bg-gray-50 focus:bg-white transition-colors"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}

            {stories.length === 0 && (
              <div className="col-span-full py-16 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                <BookOpen className="w-12 h-12 mb-4 text-gray-300" />
                <p className="text-lg font-medium text-gray-600">No Stories Added Yet</p>
                <p className="text-sm mb-6">Start by adding a new success story to display.</p>
                <Button onClick={addStory} variant="default" className="bg-blue-600">
                  <Plus className="w-4 h-4 mr-2" /> Create First Story
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessStoriesManager;