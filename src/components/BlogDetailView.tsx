import React from 'react';
import { useApp } from '../context/AppContext';
import { BlogPost } from '../types';
import { ArrowLeft, Calendar, Clock, Share2, User, Sparkles } from 'lucide-react';

interface BlogDetailViewProps {
  blog: BlogPost;
}

export const BlogDetailView: React.FC<BlogDetailViewProps> = ({ blog }) => {
  const { navigateTo, openEnquiryModal, showToast } = useApp();

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article link copied to clipboard!');
    }
  };

  return (
    <article className="pt-24 pb-24 bg-[#F8F7F3] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigateTo('blog')}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-slate-600 hover:text-[#07111F] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Chronicles</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#07111F] px-3 py-1.5 rounded bg-white border border-slate-200"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Article</span>
          </button>
        </div>

        {/* Article Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="px-3 py-1 rounded bg-[#07111F] text-xs font-bold uppercase tracking-wider text-[#D4AF37] inline-block mb-4">
            {blog.category}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-editorial text-[#07111F] mb-6 leading-tight tracking-tight">
            {blog.title}
          </h1>

          <div className="flex items-center justify-center gap-4 text-xs font-medium text-slate-500 border-y border-slate-200 py-3">
            <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
              <User className="w-3.5 h-3.5 text-[#D4AF37]" />
              {blog.author}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {blog.date}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {blog.readTime}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="h-[340px] sm:h-[480px] rounded-2xl overflow-hidden shadow-xl mb-12 bg-[#07111F]">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Article Body */}
        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-slate-700 leading-relaxed font-light text-base sm:text-lg">
          {blog.content.map((paragraph, idx) => (
            <p key={idx} className="leading-8">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-12 p-8 rounded-2xl bg-[#07111F] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold font-editorial text-white mb-2">
              Ready to experience this firsthand?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light">
              Speak with our senior travel coordinator to turn this itinerary into reality.
            </p>
          </div>
          <button
            onClick={() => openEnquiryModal()}
            className="px-6 py-3 text-xs uppercase tracking-wider font-bold text-[#07111F] bg-[#D4AF37] hover:bg-[#c29e2c] transition-colors rounded whitespace-nowrap shadow-md"
          >
            Plan My Trip
          </button>
        </div>
      </div>
    </article>
  );
};
