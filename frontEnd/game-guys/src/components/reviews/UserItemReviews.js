import axios from 'axios'
import { useEffect, useState } from 'react'
import ReactTimeAgo from 'react-time-ago'

export default function UserItemReviews(props) {

    const [username, setUsername] = useState("")
    const [reviewAvatar, setReviewAvatar] = useState('')
    const { data } = props

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        const config = {
            method: 'get',
            url: `http://localhost:4444/get-username`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        axios(config)
            .then(function (response) {
                setUsername(response.data.username)
                setReviewAvatar(response.data.avatar)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    return (
        <div className='bg-gray-700 rounded-md p-5 relative'>
          
                <>
                    <div className='flex w-full'>
                        <div className='mx-6'>
                            <div>
                                {reviewAvatar !== "" &&
                                    <img className='w-16 h-full ' src={reviewAvatar} alt='reviewUser' />
                                }
                            </div>
                            <div className='flex'>
                                {username !== "" &&
                                    <div className='mt-2'>
                                        <p className='text-tertiaryColor'>{username}</p>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='mx-2'>
                            <h3 className='text-white font-bold '>{data.review_title}</h3>
                            <p className='text-white'>{data.review_text}</p>
                        </div>
                    </div>
                    <div className='text-slate-400 absolute top-[12%] right-[2.5%] font-sans'>
                        <ReactTimeAgo date={data.created_at} locale="en-US" timeStyle="twitter" />
                    </div>
                </>     
        </div>
    )
}

