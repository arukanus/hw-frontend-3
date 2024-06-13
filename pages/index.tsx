// pages/index.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchPosts, addPost } from '../app/utils/api';
import { Post } from '../app/types';
import PostCard from '../app/components/PostCard';
import ThemeToggle from '../app/components/ThemeToggle';

const Page: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState({ id: 0, title: '', body: '', userId: 1 }); // Include userId

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsData = await fetchPosts();
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchData();
  }, []);

  const handleAddPost = async () => {
    try {
      const createdPost = await addPost(newPost);
      setPosts([...posts, createdPost]);
      setNewPost({ id: 0, title: '', body: '', userId: 1 });
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Welcome to Media App!</h1>
        <ThemeToggle />
      </div>
      <div className="mb-4">
        <input
          id="post-title"
          name="title"
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          className="block w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          id="post-body"
          name="body"
          type="text"
          placeholder="Body"
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          className="block w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleAddPost}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Post
        </button>
      </div>
      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link href={`/${post.id}`} key={post.id} className="block">
              <PostCard post={post} />
            </Link>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
};

export default Page;
