import React from 'react'
import appwriteService from "../../appwrite/conf"
import {Link} from 'react-router-dom'

const OriginalsCard = ({$id, title, content, featuredImage}) => {

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
  
  const cleanContent = limitWords(stripHtmlTags(content), 15);

  return (
    <Link to={`/post/${$id}`}>
        <div className="card glass h-full shadow-xl">
            <figure className='lg:mx-6 lg:mt-10 mx-4 mt-8'>
                <img
                src={appwriteService.getFilePreview(featuredImage)}
                alt={title}
                className='rounded-lg' />
            </figure>
            <div className="card-body">
                <h2 className="card-title lg:mt-4 mt-2 font-bold text-white lg:text-xl text-lg">{title}</h2>
                <p className='lg:text-lg lg:mt-4 mt-2 text-md line-clamp-2 overflow-hidden'>
                  {cleanContent}
                </p>
            </div>
        </div>
    </Link>
  )
}

export default OriginalsCard