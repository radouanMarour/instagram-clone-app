import React from 'react'

function PostDetailsSkeleton() {
    return (
        <div className='post-details' style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#bdbdbd",
        }}>
            <div className='post' style={{
                position: "absolute",
                width: "80%",
                maxWidth: "80%",
                height: "90%",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundcolor: "#bdbdbd",
                borderRadius: "0.5rem",
            }}>

            </div>
        </div>
    )
}

export default PostDetailsSkeleton