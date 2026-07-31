import React, { useState } from 'react';
import { ARTICLES_DATA } from '../../data/articlesData';
import { Article } from '../../types';
import { FileText, Clock, User, ArrowLeft, Tag } from 'lucide-react';

export const ArticlesView: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  if (selectedArticle) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 py-4">
        <button
          onClick={() => setSelectedArticle(null)}
          className="px-3 py-2 text-xs font-semibold rounded-xl bg-[#FFFDF8] border border-[#E8DCCB] text-[#6D655D] hover:text-[#2F2A26] flex items-center space-x-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </button>

        <article className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-6 sm:p-10 space-y-6 shadow-sm">
          <div className="space-y-3">
            <span className="px-3 py-1 bg-[#E3CAA5]/30 text-[#AD8B73] font-bold text-xs rounded-full inline-block">
              {selectedArticle.category}
            </span>
            <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#2F2A26] leading-tight">
              {selectedArticle.title}
            </h1>
            <div className="flex items-center space-x-4 text-xs text-[#6D655D] border-b border-[#E8DCCB] pb-4">
              <span className="flex items-center space-x-1">
                <User className="w-3.5 h-3.5 text-[#AD8B73]" />
                <span>{selectedArticle.author}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-[#AD8B73]" />
                <span>{selectedArticle.readTime}</span>
              </span>
              <span>•</span>
              <span>{selectedArticle.date}</span>
            </div>
          </div>

          <img
            src={selectedArticle.image}
            alt={selectedArticle.title}
            className="w-full h-64 object-cover rounded-xl"
          />

          <div className="prose max-w-none text-sm leading-relaxed text-[#2F2A26] whitespace-pre-line space-y-4">
            {selectedArticle.content}
          </div>

          <div className="flex flex-wrap gap-2 pt-6 border-t border-[#E8DCCB]">
            {selectedArticle.tags.map(t => (
              <span key={t} className="px-2.5 py-1 text-xs font-mono bg-[#FFFBE9] border border-[#E8DCCB] text-[#6D655D] rounded-lg">
                #{t}
              </span>
            ))}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      
      {/* Header */}
      <div className="border-b border-[#E8DCCB] pb-6">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#2F2A26]">Articles & Educational Guides</h1>
        <p className="text-sm text-[#6D655D] mt-1">In-depth guides on gain staging, Indian Ragas, acoustic guitar setups, and studio audio engineering.</p>
      </div>

      {/* Article Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ARTICLES_DATA.map(art => (
          <div
            key={art.id}
            onClick={() => setSelectedArticle(art)}
            className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl overflow-hidden shadow-xs hover:border-[#AD8B73] transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <img src={art.image} alt={art.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="p-5 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#AD8B73]">{art.category}</span>
                <h3 className="font-heading font-bold text-base text-[#2F2A26] line-clamp-2 group-hover:text-[#AD8B73] transition-colors">{art.title}</h3>
                <p className="text-xs text-[#6D655D] line-clamp-3 leading-relaxed">{art.summary}</p>
              </div>
            </div>

            <div className="p-5 pt-0 text-[11px] font-medium text-[#6D655D] flex justify-between items-center">
              <span>{art.readTime}</span>
              <span className="text-[#AD8B73] font-bold group-hover:underline">Read Article →</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
