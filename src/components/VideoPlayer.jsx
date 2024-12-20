import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { categories } from '../data/categories';

function VideoPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);

  // Find the video across all categories
  let currentVideo;
  let currentCategory;

  categories.forEach((category) => {
    const video = category.videos.find((v) => v.id === id);
    if (video) {
      currentVideo = video;
      currentCategory = category;
    }
  });

  if (!currentVideo) return <div>Video not found</div>;

  const handleCompletion = () => {
    setIsCompleted(true);
    currentVideo.completed = true;

    // Update category progress
    const completedVideos = currentCategory.videos.filter((v) => v.completed).length;
    currentCategory.progress = Math.round((completedVideos / currentCategory.videos.length) * 100);

    // Show completion message and redirect after delay
    setTimeout(() => {
      navigate(`/category/${currentCategory.id}`);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="aspect-w-16 aspect-h-9 bg-gray-800">
          <video controls className="w-full h-full" src={currentVideo.src} />
        </div>

        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900">{currentVideo.title}</h1>
          <p className="mt-2 text-gray-600">Duration: {currentVideo.duration}</p>

          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={handleCompletion}
              disabled={isCompleted}
              className={`px-4 py-2 rounded-md ${
                isCompleted ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isCompleted ? 'Completed!' : 'Mark as Complete'}
            </button>

            <div className="text-sm text-gray-500">Part of: {currentCategory.title}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
