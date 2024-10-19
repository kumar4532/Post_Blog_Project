import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const Tags = React.forwardRef(({ label, className, onChange }, ref) => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        const newTags = [...tags, inputValue.trim()];
        setTags(newTags);
        setInputValue('');
        onChange(newTags);
      }
    }
  };

  const removeTag = (tagToRemove) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    setTags(updatedTags);
    onChange(updatedTags);
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label className="block mb-1 font-bold">{label}</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 p-2 mb-2 rounded-full text-sm flex items-center">
            {tag}
            <button type="button" onClick={() => removeTag(tag)} className="ml-1 text-blue-600 hover:text-blue-800">
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        className="w-full p-1 rounded-lg border border-gray-300"
        placeholder="Type a tag and press Enter"
        ref={ref}
      />
    </div>
  );
});

export default Tags;