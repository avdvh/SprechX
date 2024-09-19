import React, { useState } from 'react';
import { FaSmile, FaImage, FaFileAudio } from 'react-icons/fa';
import './CentralFeed.css';
import LeftSidebar from '../components/LeftSidebar'; // Import LeftSidebar component
import RightSidebar from '../components/RightSidebar'; // Import RightSidebar component

const CentralFeed: React.FC = () => {
  const [postContent, setPostContent] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);

  const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setMediaFile(selectedFile);
    }
  };

  const handlePostSubmit = async () => {
    console.log('Post submitted:', postContent, mediaFile);
    setPostContent('');
    setMediaFile(null);
  };

  return (
    <div className="central-feed">
      <main className="central-feed-main">
        <div className="central-feed-columns">
          <LeftSidebar /> {/* LeftSidebar component */}
          <section className="central-feed-posts">
            <div className="post-creator">
              <textarea
                className="post-input"
                placeholder="Express yourself..."
                value={postContent}
                onChange={handlePostChange}
              />
              <div className="post-actions">
                <button className="emoji-button" title="Add Emoji">
                  <FaSmile />
                </button>
                <label className="media-upload-button" htmlFor="media-input-image">
                  <FaImage />
                  <input
                    type="file"
                    id="media-input-image"
                    accept="image/*"
                    onChange={handleMediaUpload}
                    style={{ display: 'none' }}
                  />
                </label>
                <label className="media-upload-button" htmlFor="media-input-audio">
                  <FaFileAudio />
                  <input
                    type="file"
                    id="media-input-audio"
                    accept="audio/*"
                    onChange={handleMediaUpload}
                    style={{ display: 'none' }}
                  />
                </label>
                <button className="button" onClick={handlePostSubmit}>
                  Post
                </button>
              </div>
              {mediaFile && (
                <div className="media-preview">
                  {mediaFile.type.startsWith('audio/') && (
                    <audio controls>
                      <source src={URL.createObjectURL(mediaFile)} type={mediaFile.type} />
                    </audio>
                  )}
                  {mediaFile.type.startsWith('video/') && (
                    <video controls>
                      <source src={URL.createObjectURL(mediaFile)} type={mediaFile.type} />
                    </video>
                  )}
                </div>
              )}
            </div>
            <div className="post">
              <h2>Post Title</h2>
              <p>Post content goes here...</p>
            </div>
            {/* Add more posts as needed */}
          </section>
          <RightSidebar /> {/* RightSidebar component */}
        </div>
      </main>
    </div>
  );
};

export default CentralFeed;
