import React from 'react'
import appwriteService from "../appwrite/conf"
import {Link} from 'react-router-dom'

function NewsCard({$id, title, content, featuredImage}) { 

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
      <div className="card md:h-[75vh] h-[60vh] shadow-xl">
        <figure className='w-full h-[50%]'>
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt="Shoes"
            className='h-full object-cover' />
        </figure>
        <div className="card-body p-6 bg-neutral-900 text-white">
          <h2 className="card-title mb-2 md:text-xl text-lg">{title}</h2>
          <p className='md:text-lg text-md'>{cleanContent}</p>
        </div>
      </div>
    </Link>
  )
}

export default NewsCard;