import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage (){
    return (
      <div className='text-center'>
        <p>404 Page Not Found</p>
        <p>
          <Link to="/">Go to Home </Link>
        </p>
      </div>
    )
}
