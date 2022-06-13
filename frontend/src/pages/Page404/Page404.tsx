import React from 'react'
import { Link } from 'react-router-dom'

const Page404 = () => {
  return (
    <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh'}}>
      <div className="text-center">
        <h1 className="text-muted">Error | 404</h1>
        <Link to='/'>Go back Home </Link>
      </div>
    </div>
  )
}

export default Page404