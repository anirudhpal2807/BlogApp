import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogAPI } from '../utils/api';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await blogAPI.getById(id);
      setBlog(response.data);
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error('This blog is private and you do not have access');
        navigate('/');
      } else {
        toast.error('Failed to load blog');
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">Loading blog...</div>
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  const isAuthor = user && user.id === blog.author._id;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        {blog.featuredImage && (
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="w-full h-96 object-cover"
          />
        )}
        <div className="p-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <span
                className={`px-3 py-1 text-sm rounded ${
                  blog.visibility === 'public'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {blog.visibility}
              </span>
              <span className="text-gray-500 text-sm">
                By {blog.author?.username || 'Unknown'}
              </span>
            </div>
            <span className="text-gray-500 text-sm">
              {formatDate(blog.createdAt)}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-6">{blog.title}</h1>

          <div
            className="prose max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {isAuthor && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex space-x-4">
                <button
                  onClick={() => navigate(`/editor/${id}`)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Edit Post
                </button>
                <button
                  onClick={() => navigate('/my-blogs')}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Back to My Blogs
                </button>
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;



