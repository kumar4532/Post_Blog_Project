import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/conf"
import { Container, PostCard, NewsCard, ReviewCard, OriginalsCard } from '../components'

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);
    const [activeFilter, setActiveFilter] = useState(null);
    const tags = ["Latest", "Playstation", "PC", "Xbox", "Entertainment", "Review"]

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
                setLoading(false)
            }
        })
    }, [])
    
    const newsPosts = posts.filter(post => post.category === "news").map((post) => (
        <NewsCard key={post.$id} {...post}/>
    ))

    useEffect(() => {
        setArticles(posts.filter((post) => post.category === "article"));
      }, [posts]);

      const filterArticles = (filterTag) => {
        if (activeFilter === filterTag || filterTag.toLowerCase() === "latest") {
          setActiveFilter(null);
        } else {
          setActiveFilter(filterTag);
        }
      };
    
      const filteredArticles = activeFilter ? articles.filter((article) => article.tags.includes(activeFilter.toLowerCase())) : articles;

    if (loading) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center text-white py-8 mt-4 text-center">
                <Container>
                    <button disabled type="button" className="py-2.5 px-5 me-2 text-sm font-medium rounded-lg border hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:hover:text-white inline-flex items-center">
                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                        </svg>
                        Loading...
                    </button>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='min-h-screen'>
                    <div className='flex flex-col w-full h-full p-4 border border-zinc-600 rounded-xl shadow-lg mb-8'>
                        <div className='text-red-400 text-left text-2xl'>Featured Articles</div>
                        <div className='flex flex-wrap w-full'>
                            {
                                filteredArticles.map((post) => (
                                    (post.tags.includes("featured")) && (
                                        <div key={post.$id} className='p-2 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4'>
                                            <PostCard {...post} />
                                        </div>
                                    )
                                ))
                            }
                        </div>
                    </div>
                    <div className='flex flex-col w-full h-full p-4 border border-zinc-600 rounded-xl shadow-lg mb-8'>
                        <span className='text-red-400 text-left text-2xl mb-4'>News</span>
                        <div className="flex carousel flex-nowrap overflow-x-auto p-2 space-x-4 rounded-box">
                            {newsPosts.map((post, index) => (
                                <div key={index} className="flex-none carousel-item w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                                    {post}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col h-full p-4 border border-zinc-600 rounded-xl shadow-lg mb-8'>
                        <div className='text-red-400 text-left text-2xl mb-2'>Guides</div>
                        <div className='flex carousel flex-nowrap overflow-x-auto w-full space-x-6 p-4'>
                            {
                                posts.filter((post) => post.category === "game-guide").map((post) => (
                                    <div key={post.$id} className='flex-none carousel-item lg:min-h-[90vh] min-h-[50vh] w-full sm:w-1/2 md:w-[40%] lg:w-[30%]'>
                                        <ReviewCard {...post}/>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='flex flex-col h-full p-4 border border-zinc-600 rounded-xl shadow-lg mb-8'>
                        <div className='text-red-400 text-left text-2xl mb-2'>GamersZone Originals</div>
                        <div className='flex flex-wrap gap-2 p-2'>
                            {
                                tags.map((tag) => (
                                    <button key={tag} className="btn btn-outline btn-accent" onClick={() => filterArticles(tag)}>{tag}</button>
                                ))
                            }
                        </div>
                        <div className='flex flex-nowrap carousel overflow-x-auto w-full lg:h-[80vh] md:h-[50vh] space-x-4 p-4'>
                            {
                                filteredArticles.map((post) => (
                                    (!post.tags.includes("featured")) && (<div key={post.$id} className='flex-none carousel-item w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                                        <OriginalsCard {...post}/>
                                    </div>)
                                ))
                            }
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Home