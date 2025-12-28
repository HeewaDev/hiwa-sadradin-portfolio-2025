import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import TransitionEffect from '../components/TransitionEffect';
import AnimatedText from '../components/AnimatedText';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building Scalable React Applications",
    excerpt: "Learn the essential patterns and practices for creating maintainable React applications that can grow with your team and requirements.",
    content: "In today's fast-paced development environment, building scalable React applications is crucial for long-term success. This comprehensive guide covers everything from component architecture to state management strategies that will help you create applications that not only work today but can evolve with your business needs.\n\n## Component Architecture\n\nOne of the fundamental aspects of scalable React applications is proper component architecture. We'll explore how to structure your components for maximum reusability and maintainability.\n\n## State Management\n\nChoosing the right state management solution can make or break your application's scalability. We'll compare different approaches and help you choose the best one for your project.\n\n## Performance Optimization\n\nPerformance is key to user experience. Learn about React's optimization techniques and how to implement them effectively in your applications.",
    author: "Hiwa Sadraldin",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Development",
    tags: ["React", "JavaScript", "Frontend", "Architecture"],
    image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    featured: true
  },
  {
    id: 2,
    title: "The Future of Web Development",
    excerpt: "Exploring emerging technologies and trends that are shaping the future of web development, from AI integration to new frameworks.",
    content: "The web development landscape is constantly evolving, with new technologies and frameworks emerging regularly. In this article, we'll explore the trends and technologies that are shaping the future of web development.\n\n## AI and Machine Learning Integration\n\nArtificial Intelligence is becoming increasingly integrated into web applications, from chatbots to personalized user experiences.\n\n## Progressive Web Apps\n\nPWAs are bridging the gap between web and native applications, offering better performance and user experience.\n\n## WebAssembly\n\nWebAssembly is opening new possibilities for high-performance web applications, allowing developers to use languages like Rust and C++ in the browser.",
    author: "Hiwa Sadraldin",
    date: "2024-01-10",
    readTime: "6 min read",
    category: "Technology",
    tags: ["Web Development", "AI", "PWA", "WebAssembly"],
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 3,
    title: "Database Design Best Practices",
    excerpt: "Essential principles and patterns for designing efficient, scalable databases that support your application's growth.",
    content: "Database design is a critical aspect of application development that often doesn't receive the attention it deserves. A well-designed database can significantly improve your application's performance and maintainability.\n\n## Normalization vs Denormalization\n\nUnderstanding when to normalize your data and when denormalization might be beneficial for performance.\n\n## Indexing Strategies\n\nProper indexing can dramatically improve query performance. Learn about different types of indexes and when to use them.\n\n## Scalability Considerations\n\nDesign your database with scalability in mind from the beginning to avoid costly refactoring later.",
    author: "Hiwa Sadraldin",
    date: "2024-01-05",
    readTime: "7 min read",
    category: "Backend",
    tags: ["Database", "SQL", "Performance", "Architecture"],
    image: "https://images.pexels.com/photos/1181345/pexels-photo-1181345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 4,
    title: "Modern CSS Techniques",
    excerpt: "Discover advanced CSS techniques and modern features that can enhance your web designs and improve user experience.",
    content: "CSS has evolved significantly over the years, introducing powerful new features that enable more sophisticated designs and better user experiences.\n\n## CSS Grid and Flexbox\n\nMaster the art of layout with CSS Grid and Flexbox, two powerful tools for creating responsive designs.\n\n## CSS Custom Properties\n\nLeverage CSS variables to create more maintainable and dynamic stylesheets.\n\n## Modern CSS Features\n\nExplore newer CSS features like container queries, cascade layers, and more that are changing how we write CSS.",
    author: "Hiwa Sadraldin",
    date: "2024-01-01",
    readTime: "5 min read",
    category: "Design",
    tags: ["CSS", "Frontend", "Design", "Layout"],
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];
  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <>
      <TransitionEffect />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="flex flex-col min-h-screen"
      >
        <section className="pt-section-xs md:pt-section-sm px-page-xs md:px-page-sm lg:px-page-md xl:px-page-lg">
          <div className="max-w-6xl mx-auto">
            <AnimatedText 
              text="Blog & Insights" 
              className="mb-section-xs md:mb-section-sm text-display-sm md:text-display-md lg:text-display-lg xl:text-display-xl font-display font-bold" 
              tag="h1"
            />
            
            <motion.p 
              className="text-body-xl text-light/80 leading-relaxed max-w-2xl mb-section-xs md:mb-section-sm"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              Thoughts on development, technology trends, and insights from my journey as a full-stack developer.
            </motion.p>

            {/* Category Filter */}
            <motion.div 
              className="flex flex-wrap gap-4 mb-section-xs md:mb-section-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                    selectedCategory === category
                      ? 'border-light bg-light text-dark'
                      : 'border-light/20 text-light hover:border-light/40'
                  }`}
                  data-cursor-text="Filter"
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* Featured Post */}
            {featuredPost && selectedCategory === 'All' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                className="mb-section-xs md:mb-section-sm"
              >
                <div className="relative overflow-hidden rounded-lg aspect-[16/9] mb-8">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out-expo hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-light text-dark text-sm font-medium rounded-full">
                        Featured
                      </span>
                      <span className="px-3 py-1 border border-light/20 text-light text-sm rounded-full">
                        {featuredPost.category}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
                      {featuredPost.title}
                    </h2>
                    <p className="text-light/80 mb-4 text-lg">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-light/60">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.8 + (index * 0.1) }}
                  className="group cursor-none"
                  onClick={() => setSelectedPost(post)}
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
              ))}
            </div>
          </div>
        </section>

        {/* Blog Post Modal */}
        <AnimatePresence>
          {selectedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-dark/95 z-50 overflow-y-auto"
            >
              <div className="min-h-screen px-6 md:px-12 lg:px-24 py-24">
                <div className="max-w-4xl mx-auto relative">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="absolute -top-12 right-0 link-hover"
                    data-cursor-text="Close"
                  >
                    <X className="w-8 h-8" />
                  </button>

                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6 md:space-y-8"
                  >
                    {/* Post Header */}
                    <header className="space-y-6">
                      <div className="flex items-center gap-4">
                        <span className="px-4 py-2 bg-light text-dark text-sm font-medium rounded-full">
                          {selectedPost.category}
                        </span>
                        <div className="flex items-center gap-4 text-sm text-light/60">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(selectedPost.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{selectedPost.readTime}</span>
                          </div>
                        </div>
                      </div>

                      <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight">
                        {selectedPost.title}
                      </h1>

                      <p className="text-xl text-light/80 leading-relaxed">
                        {selectedPost.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {selectedPost.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 border border-light/20 text-light/60 text-sm rounded-full flex items-center gap-1"
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </header>

                    {/* Post Image */}
                    <div className="rounded-lg overflow-hidden aspect-video">
                      <img 
                        src={selectedPost.image} 
                        alt={selectedPost.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Post Content */}
                    <div className="prose prose-invert max-w-none">
                      {selectedPost.content.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="text-lg text-light/80 leading-relaxed mb-6">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Author Info */}
                    <div className="border-t border-light/20 pt-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-light/10 rounded-full flex items-center justify-center">
                          <span className="text-lg font-display font-bold">
                            {selectedPost.author.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-lg">{selectedPost.author}</h3>
                          <p className="text-light/60">Full-Stack Developer</p>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
    </>
  );
};

export default Blog;
