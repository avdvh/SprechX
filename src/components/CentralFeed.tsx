import React, { useState } from 'react';
import { FaSmile, FaHeart, FaComment, FaShare, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import './CentralFeed.css';
import LeftSidebar from '../components/LeftSidebar'; // Import LeftSidebar component
import RightSidebar from '../components/RightSidebar'; // Import RightSidebar component
import * as Deso from 'deso-protocol';

const CentralFeed: React.FC = () => {
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState<any[]>([]);
  const [commentInput, setCommentInput] = useState<string>(''); // For capturing comment input
  const [commentBoxVisible, setCommentBoxVisible] = useState<any>({}); // To manage visibility of comment input per post
  const userWalletAddress = '0x1234567890abcdef'; // Replace with the actual user wallet address

  const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };

  const handlePostSubmit = async () => {
    const newPost = {
      id: Date.now(),
      content: postContent,
      author: {
        walletAddress: userWalletAddress,
        profilePicture: 'https://via.placeholder.com/10',
      },
      likes: 0,
      dislikes: 0,
      likedBy: [] as string[],
      dislikedBy: [] as string[],
      comments: 0,
      commentList: [],
    };
    setPosts([newPost, ...posts]);
    setPostContent('');
  };

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        if (post.likedBy.includes(userWalletAddress)) {
          console.log('You have already liked this post.');
          return post;
        }

        return {
          ...post,
          likes: post.likes + 1,
          likedBy: [...post.likedBy, userWalletAddress],
        };
      }
      return post;
    }));
  };

  const handleDislike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        if (post.dislikedBy.includes(userWalletAddress)) {
          console.log('You have already disliked this post.');
          return post;
        }

        return {
          ...post,
          dislikes: post.dislikes + 1,
          dislikedBy: [...post.dislikedBy, userWalletAddress],
        };
      }
      return post;
    }));
  };

  const handleComment = (postId: number, commentContent: string) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? {
            ...post,
            comments: post.comments + 1,
            commentList: [...post.commentList, {
              id: Date.now(),
              content: commentContent,
              author: userWalletAddress,
              replies: [], // Initialize replies as an empty array
              likes: 0,
              dislikes: 0,
              likedBy: [],
              dislikedBy: [],
            }]
          }
        : post
    ));
    setCommentInput('');
    setCommentBoxVisible((prevState: any) => ({ ...prevState, [postId]: false }));
  };

  const handleCommentLike = (postId: number, commentId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          commentList: post.commentList.map((comment: { id: number; likedBy: string | string[]; likes: number; }) => {
            if (comment.id === commentId) {
              if (comment.likedBy.includes(userWalletAddress)) {
                return comment;
              }
              return {
                ...comment,
                likes: comment.likes + 1,
                likedBy: Array.isArray(comment.likedBy) ? [...comment.likedBy, userWalletAddress] : [userWalletAddress],
              };
            }
            return comment;
          })
        };
      }
      return post;
    }));
  };

  const handleCommentDislike = (postId: number, commentId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          commentList: post.commentList.map((comment: { id: number; dislikedBy: string | string[]; dislikes: number; }) => {
            if (comment.id === commentId) {
              if (comment.dislikedBy.includes(userWalletAddress)) {
                return comment;
              }
              return {
                ...comment,
                dislikes: comment.dislikes + 1,
                dislikedBy: Array.isArray(comment.dislikedBy) ? [...comment.dislikedBy, userWalletAddress] : [userWalletAddress],
              };
            }
            return comment;
          })
        };
      }
      return post;
    }));
  };

  const handleReply = (postId: number, commentId: number, replyContent: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          commentList: post.commentList.map((comment: { id: number; replies: any; }) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                replies: [...comment.replies, {
                  id: Date.now(),
                  content: replyContent,
                  author: userWalletAddress,
                }]
              };
            }
            return comment;
          })
        };
      }
      return post;
    }));
  };

  const toggleCommentBox = (postId: number) => {
    setCommentBoxVisible((prevState: any[]) => ({ ...prevState, [postId]: !prevState[postId] }));
  };

  function handleShare(id: any): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="central-feed">
      <main className="central-feed-main">
        <div className="central-feed-columns">
          <LeftSidebar />
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
                <button className="button" onClick={handlePostSubmit}>
                  Post
                </button>
              </div>
            </div>

            {posts.map((post) => (
              <div className="post" key={post.id}>
                <div className="post-header">
                  <img
                    src={post.author.profilePicture}
                    alt={post.author.walletAddress}
                    className="profile-picture"
                  />
                  <span className="wallet-address">{post.author.walletAddress}</span>
                </div>
                <p className="post-content">{post.content}</p>
                <div className="post-actions">
                  <button className="like-button" onClick={() => handleLike(post.id)}>
                    <FaHeart /> {post.likes}
                  </button>
                  <button className="dislike-button" onClick={() => handleDislike(post.id)}>
                    <FaThumbsDown /> {post.dislikes}
                  </button>
                  <button
                    className="comment-button"
                    onClick={() => toggleCommentBox(post.id)}
                  >
                    <FaComment /> {post.comments}
                  </button>
                  <button className="share-button" onClick={() => handleShare(post.id)}>
                    <FaShare />
                  </button>
                </div>

                {/* Comment Input Section */}
                {commentBoxVisible[post.id] && (
                  <div className="comments-section">
                    <textarea
                      className="comment-input"
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      placeholder="Write a comment..."
                    />
                    <button
                      className="comment-submit-button"
                      onClick={() => handleComment(post.id, commentInput)}
                    >
                      Add Comment
                    </button>
                    {post.commentList.map((comment: any) => (
                      <div key={comment.id} className="comment">
                        <div className="comment-header">
                          <span className="comment-author">{comment.author}</span>
                          <div className="comment-actions">
                            <button onClick={() => handleCommentLike(post.id, comment.id)}>
                              <FaThumbsUp /> {comment.likes}
                            </button>
                            <button onClick={() => handleCommentDislike(post.id, comment.id)}>
                              <FaThumbsDown /> {comment.dislikes}
                            </button>
                          </div>
                        </div>
                        <p className="comment-content">{comment.content}</p>

                        {/* Nested replies */}
                        {comment.replies?.map((reply: any) => (
                          <div key={reply.id} className="reply">
                            <span className="reply-author">{reply.author}</span>
                            <p className="reply-content">{reply.content}</p>
                          </div>
                        ))}

                        {/* Reply to comment */}
                        <textarea
                          className="reply-input"
                          placeholder="Reply..."
                          onChange={(e) => setCommentInput(e.target.value)}
                        />
                        <button
                          className="reply-submit-button"
                          onClick={() => handleReply(post.id, comment.id, commentInput)}
                        >
                          Reply
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
          <RightSidebar />
        </div>
      </main>
    </div>
  );
};

export default CentralFeed;
