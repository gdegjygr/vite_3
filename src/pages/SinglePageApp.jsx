import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

const SinglePageApp = () => {
    const [post, setPost] = useState([])
    const {pageId} = useParams()

    useEffect(() => {
        const responce = async () => {
        const request = await axios.get(`https://dummyjson.com/posts/${pageId}`)
        setPost(request.data)
        }
        responce()
    }, [])

  return (
    <>
      <div key={post.id}>
        <h2>Its {`${pageId}`} post</h2>
        <h3>{post.title}</h3>
        <span>{post.body}</span>
        <p>Reactions: {post.reactions}</p>
      </div>
    </>  
  )
}

export default SinglePageApp