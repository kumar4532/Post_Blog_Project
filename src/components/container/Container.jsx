import React from 'react'

function Container({children}) {
  return (
    <div className='min-w-[95%] h-auto max-w-7xl mx-auto px-4'>{children}</div> 
  )
}

export default Container