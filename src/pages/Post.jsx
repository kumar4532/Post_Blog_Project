import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/conf";
import userService from "../appwrite/user";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [creator, setCreator] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                    fetchCreatorDetails(post.userId);
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const fetchCreatorDetails = async (userId) => {
        try {
            const user = await userService.getUserById(userId);
            setCreator(user);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 m-auto max-w-6xl">
            <Container>
                <div className="flex justify-end mb-6">
                    {isAuthor && (
                        <div>
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                <div className="w-full max-w-4xl flex justify-center m-auto mb-8 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />
                </div>
                <div className="relative right-1/3 mb-2 text-white">
                    {creator && (
                        <p className="font-sans underline text-blue-500">Created By: {creator.name}</p>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl text-white font-bold">{post.title}</h1>
                </div>
                <div className="browser-css text-white">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}