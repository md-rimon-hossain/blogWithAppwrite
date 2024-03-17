/* eslint-disable no-unused-vars */

import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import "./allposts.css"

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loader,setLoader] = useState(true)

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
                setLoader(false)
            }
        })
    }, [])
    
  return (
    <div className='w-full py-8'>
            <h1>All Blog Posts</h1>
        <Container>
            <div className='flex flex-wrap smallSize'>
            {loader && <h1 className='text-4xl text-center'>Posts Loading..</h1>}
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4 '>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts