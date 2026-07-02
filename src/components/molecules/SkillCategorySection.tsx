import React from 'react';
import { SkillCategory } from '../../types';

interface SkillCategorySectionProps {
  id?: string;
  category: SkillCategory;
}

export const SkillCategorySection: React.FC<SkillCategorySectionProps> = ({ id, category }) => {
  return (
    <div
      id={id}
      className="bg-white border border-[#ebdcb9]/40 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-brand-green/40 transition-[border-color,box-shadow] duration-300"
    >
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#ebdcb9]/30">
        <span className="w-1.5 h-1.5 rounded-xs bg-brand-green inline-block" />
        <h3 className="text-caption font-bold text-brand-brown uppercase tracking-wider font-sans">
          {category.title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1.5 rounded-lg bg-[#ede9e2]/45 text-brand-brown font-sans font-bold text-caption border border-[#ebdcb9]/30 hover:bg-white hover:border-brand-green hover:text-brand-green transition-colors cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

