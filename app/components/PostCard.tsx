// app/components/PostCard.tsx
import React from 'react';
import { Post } from '../types';
import Link from 'next/link';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 mb-4 flex justify-between">
      <div>
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-700 mb-2">{post.body}</p>
        <p className="text-sm text-gray-500">Author's Name in Topics Name · 7 July</p>
        <Link href={`/posts/${post.id}`} legacyBehavior>
          <a className="text-blue-500 hover:underline">Read more</a>
        </Link>
      </div>
      <div className="ml-4">
        <img src="/placeholder-image.png" alt="Post image" className="w-20 h-20 object-cover rounded-lg" />
      </div>
    </div>
  );
};

export default PostCard;

