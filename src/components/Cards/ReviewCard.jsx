import React from 'react'
import appwriteService from "../../appwrite/conf"
import {Link} from 'react-router-dom'

const ReviewCard = ({$id, title, featuredImage}) => {
  return (
    <Link to={`/post/${$id}`}>
        <div className="card image-full h-full shadow-xl">
            <figure>
                <img
                src={appwriteService.getFilePreview(featuredImage)}
                alt={title}
                className='w-full h-full' />
            </figure>
            <div className="card-body">
                <h2 className="card-title font-bold text-white">{title}</h2>
            </div>
        </div>
    </Link>
  )
}

export default ReviewCard