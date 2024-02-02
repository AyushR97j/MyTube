import React, { useState } from 'react'
import userIcon from "../assets/images/userIcon.png";
import { useSelector } from 'react-redux';

const commentsData = [
    {
        name: "Ayush Raj",
        text: "lorem ipsum dolor sit am",
        replies: [

        ]
    },
    {
        name: "Ayush Raj",
        text: "lorem ipsum dolor sit am",
        replies: [{
        name: "Ayush Raj",
        text: "lorem ipsum dolor sit am",
        replies: [
            {
                name: "Ayush Raj",
                text: "lorem ipsum dolor sit am",
                replies: [
                    {
                        name: "Ayush Raj",
                        text: "lorem ipsum dolor sit am",
                        replies: [
                
                        ]
                    }
        
                ]
            },
            {
                name: "Ayush Raj",
                text: "lorem ipsum dolor sit am",
                replies: [
        
                ]
            },
            {
                name: "Ayush Raj",
                text: "lorem ipsum dolor sit am",
                replies: [
        
                ]
            }

        ]
    },

        ]
    },
    {
        name: "Ayush Raj",
        text: "lorem ipsum dolor sit am",
        replies: [

        ]
    },
    {
        name: "Ayush Raj",
        text: "lorem ipsum dolor sit am",
        replies: [

        ]
    }
];

const Comment = ({data}) => {
    const {name, text} = data;
    return (
        <div className='flex shadow-sm bg-gray-100 p-2 rounded-lg my-2'>
            <img className='h-12' alt='user' src={userIcon} />
            <div className='px-3'>
                <p className='font-bold'>{name}</p>
                <p>{text}</p>
            </div>
        </div>
        
    )
}

const CommentsList = ( {comments} ) => {
    return comments.map((comment,  index) => (
        <div key={index} >
            <Comment data={comment} />
            <div className='pl-5 border border-l-black ml-5'>
                <CommentsList comments={comment.replies} />
            </div>
        </div>
        
    ));
};

const MockComments = () => {

    const[text, setText] = useState("...show more");
    const[isExpanded, setIsExpanded] = useState(false);
    const theme = useSelector((store) => store.app.theme);


    const handleReadMoreClick = () => {
        setIsExpanded(!isExpanded)
        if(isExpanded){
            setText("...show more")
        }
        else{
            setText("...show less")
        }
    
      };

  return (
    <div className={`m-5 p-2 w-[906px] bg-gray-200 ml-10 rounded-xl opacity-70 text-black ${theme === 'dark' ? 'bg-gray-900 text-white' : ''}`}>
        <div className={`text-xl${theme === 'dark' ? 'bg-black text-white' : ''}`}><span className='font-semibold'>Mock comments:</span> <span className='text-md font-medium'> (Nevermind! Just some random section)</span></div>
        {isExpanded &&
            <CommentsList comments = {commentsData} />
        }
        <span className='text-blue-800 ml-2 cursor-pointer' onClick={handleReadMoreClick}>{text}</span>
    </div>
  );
};

export default MockComments;
