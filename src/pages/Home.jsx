/* eslint-disable no-unused-vars */

import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([])
    const [loader,setLoader] = useState(true)
    const status = useSelector((state)=> state.auth.status)

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
                setLoader(false)
            }
        })
    }, [])
  

    if (!status ) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Welcome !! <br />
                                Login or SignUp to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {loader && <h1 className='text-4xl text-center'>Posts Loading..</h1>}
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home