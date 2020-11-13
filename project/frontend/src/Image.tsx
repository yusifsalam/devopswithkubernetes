import React from 'react'

const Image: React.FC = () => {
  return (
    <div>
      <img src='http://localhost:8081/api/randomImage' alt='pic' height={200} />
    </div>
  )
}

export default Image
