import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useSearchParams, Link } from 'react-router-dom'

const PaginationPage = () => {
    const [post, setPost] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        if(!searchParams.get("page")) return
        const fetchrequest = async () => {
        const skipPage = (searchParams.get("page") -1) *10
        const request = await axios.get(`https://dummyjson.com/posts?limit=10&skip=${skipPage}`)
        setPost(request.data.posts)
        }
        fetchrequest()
    }, [searchParams])

  return (
    <>
    <div>
        <ol className='list'>
        {[1, 2, 3, 4, 5].map((pageId) => (
            <li  onClick={() => setSearchParams({page: pageId})}>
                {pageId}
            </li>
        ))}
        </ol>
        <ul>
        {post.map((getItem) => (
            <li key={getItem.id}>
                <Link to={`/posts/${getItem.id}`}>{getItem.id} {getItem.title}</Link>
            </li>
        ))}
        </ul>
    </div>
    </>
  )
}

export default PaginationPage
// При повторном переключении на эту страницу (Post page - pagination)
// посты отображаться не будут, т.к. нет исходного. Придется только нажать на
// какой-нибудь из списка и тогда уже будет видно. Исправлять это не стал,
// думаю это врядли ошибка