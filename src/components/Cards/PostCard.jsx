import React from 'react'
import appwriteService from "../../appwrite/conf"
import {Link} from 'react-router-dom'

function PostCard({$id, title, content, featuredImage}) { 

  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };
  
  const limitWords = (text, limit) => {
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return text;
  };
  
  const cleanContent = limitWords(stripHtmlTags(content), 20);
  
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full lg:min-h-[80vh] md:min-h-[60vh] min-h-[50vh] overflow-y-hidden p-2 bg-black text-white rounded-xl lg:p-4 flex flex-col relative'>
        <div className='w-full overflow-hidden rounded-xl'>
          <img 
            src={appwriteService.getFilePreview(featuredImage)} 
            alt={title}
            className='w-full lg:min-h-[80vh] md:min-h-[60vh] min-h-[50vh] object-cover'
          />
        </div>
        <div className='absolute bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 max-w-sm bg-black bg-opacity-75 border border-gray-500 rounded-xl p-3 -mt-8'>
          <h2 className='lg:text-xl font-bold text-base truncate text-center'>{title}</h2>
          <p className='lg:text-sm mt-1 text-xs line-clamp-2 overflow-hidden'>
            {cleanContent}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default PostCard