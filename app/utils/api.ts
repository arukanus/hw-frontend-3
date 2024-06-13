// app/utils/api.ts
import axios from 'axios';
import { Post } from '../types';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use((response) => response, (error) => {
  if (error.response?.status === 401) {
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await api.get<{ posts: Post[] }>('/posts');
  const posts = response.data.posts;
  localStorage.setItem('posts', JSON.stringify(posts));
  return posts;
};

export const addPost = async (newPost: Post): Promise<Post> => {
  const response = await api.post('/posts/add', {
    ...newPost,
    userId: 1,
  });
  const posts = JSON.parse(localStorage.getItem('posts') || '[]');
  posts.push(response.data);
  localStorage.setItem('posts', JSON.stringify(posts));
  return response.data;
};

export const updatePost = async (id: number, updatedPost: Post): Promise<Post> => {
  const response = await api.put(`/posts/${id}`, updatedPost);
  const posts = JSON.parse(localStorage.getItem('posts') || '[]').map((post: Post) =>
    post.id === id ? response.data : post
  );
  localStorage.setItem('posts', JSON.stringify(posts));
  return response.data;
};

export const deletePost = async (id: number): Promise<void> => {
  await api.delete(`/posts/${id}`);
  const posts = JSON.parse(localStorage.getItem('posts') || '[]').filter((post: Post) => post.id !== id);
  localStorage.setItem('posts', JSON.stringify(posts));
};

export default api;
