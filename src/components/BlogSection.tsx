import React from 'react';
import { useApp } from '../context/AppContext';
import { Clock, Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { BlogPost } from '../types';
import { OptimizedImage } from './OptimizedImage';

export const BlogSection: React.FC = () => {
  const { blogPosts, navigateTo } = useApp();

  return (
    <section id="blog-section" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#D4AF37] uppercase mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Travel Chronicles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-editorial text-[#07111F] tracking-tight">
            TRAVEL STORIES & GUIDES
          </h2>
          <p className="text-slate-600 mt-2 text-base font-light">
            Insider route guides, packing essentials, and seasonal timing advice penned by our seasoned travel coordinators.
          </p>
        </div>

        <button
          onClick={() => navigateTo('blog')}
          className="mt-6 md:mt-0 text-xs uppercase tracking-wider font-bold text-[#07111F] hover:text-[#D4AF37] transition-colors border-b border-[#07111F] pb-1 self-start"
        >
          View All Chronicles
        </button>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            onClick={() => navigateTo('blog', post.slug)}
            className="bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden bg-[#07111F]">
              <OptimizedImage
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded bg-[#07111F]/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] border border-[#D4AF37]/30">
                  {post.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#D4AF37]" />
                    {post.date}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#D4AF37]" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-base font-bold font-editorial text-[#07111F] mb-2 group-hover:text-[#2563EB] transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 font-light line-clamp-3 leading-relaxed mb-4">
                  {post.shortDescription}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-1 text-xs font-bold text-[#07111F] group-hover:text-[#D4AF37] transition-colors">
                <span>Read Story</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
