import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

interface BlogPostCardProps {
  post: {
    id: number;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readTime: string;
    category: string;
    tags: string[];
    image: string;
    featured?: boolean;
  };
  index: number;
  onClick: () => void;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, index, onClick }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.8 + (index * 0.1) }}
      className="group cursor-none"
      onClick={onClick}
      data-cursor-text="Read"
    >
      <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-6">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-dark/80 text-light text-sm rounded-full">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-xl font-display font-bold group-hover:text-light/80 transition-colors">
          {post.title}
        </h3>
        <p className="text-light/60 text-sm leading-relaxed">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-xs text-light/40">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{post.readTime}</span>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags.slice(0, 3).map((tag, tagIndex) => (
            <span 
              key={tagIndex}
              className="px-2 py-1 bg-light/10 text-light/60 text-xs rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

export default BlogPostCard;
