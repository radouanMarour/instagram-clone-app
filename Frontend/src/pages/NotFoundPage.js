import React from 'react'
import { Link } from 'react-router-dom'

function NotFoundPage() {
    console.log("not")
    return (
        <div style={{
            height: "100vh",
            textAlign: "center",
            color: "#737373",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <h2 style={{ margin: "1rem" }}>Sorry, this page isn't available</h2>
            <p>
                The link you followed may be broken, or the page my have been removed <Link to="/" style={{ color: "#0095f6", fontWeight: "bold" }} >Go back to Instagram
                </Link>
            </p>
        </div>
    )
}

export default NotFoundPage