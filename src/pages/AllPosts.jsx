import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from '../appwrite/conf';
import { useSelector } from 'react-redux';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (userData) {
            appwriteService.getUserPosts(userData.$id).then((response) => {
                if (response) {
                    setPosts(response.documents);
                }
            }).catch((error) => {
                console.error('Error fetching posts:', error);
            });
        }
    }, [userData]);

    return (
        <div className='w-full py-8'>
            <Container>
                {posts.length === 0 ? (
                    <h1 className='font-bold text-xl'>There aren't any posts available</h1>
                ) : (
                    <div className='flex flex-wrap'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                )
            }
            </Container>
        </div>
    );
}

export default AllPosts;
