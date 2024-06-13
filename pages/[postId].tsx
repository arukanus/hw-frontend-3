// pages/[postId].tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api, { updatePost, deletePost } from '../app/utils/api';
import { Post } from '../app/types';

const PostPage: React.FC = () => {
  const router = useRouter();
  const { postId } = router.query;
  const [post, setPost] = useState<Post | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedPost, setUpdatedPost] = useState<Post>({ id: 0, title: '', body: '' });

  useEffect(() => {
    if (postId) {
      const fetchPost = async () => {
        try {
          const response = await api.get<Post>(`/posts/${postId}`);
          setPost(response.data);
          setUpdatedPost(response.data);
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      };
      fetchPost();
    }
  }, [postId]);

  const handleUpdatePost = async () => {
    try {
      const updated = await updatePost(Number(postId), updatedPost);
      setPost(updated);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDeletePost = async () => {
    try {
      await deletePost(Number(postId));
      router.push('/');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      {editMode ? (
        <div>
          <input
            id="edit-title"
            name="title"
            type="text"
            value={updatedPost.title}
            onChange={(e) => setUpdatedPost({ ...updatedPost, title: e.target.value })}
            className="block w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <input
            id="edit-body"
            name="body"
            type="text"
            value={updatedPost.body}
            onChange={(e) => setUpdatedPost({ ...updatedPost, body: e.target.value })}
            className="block w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleUpdatePost}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update Post
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-700 mb-4">{post.body}</p>
          <button
            onClick={() => setEditMode(true)}
            className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
          >
            Edit
          </button>
          <button
            onClick={handleDeletePost}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PostPage;
