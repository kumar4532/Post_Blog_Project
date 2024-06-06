import React from 'react'
import appwriteService from "../appwrite/conf"
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
  
    const cleanContent = limitWords(stripHtmlTags(content), 8);
  

  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full p-3 bg-blue-100 rounded-xl lg:p-4'>
            <div className='w-full lg:m-auto lg:mb-2'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl' />
            </div>
            <h2
            className='lg:text-xl mt-2 font-bold text-base'
            >{title}</h2>
            <p className='lg:text-sm mt-2 text-xs'>
              {cleanContent}
            </p>
        </div>
    </Link>
  )
}

export default PostCard