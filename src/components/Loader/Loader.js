import React from 'react'

export const Loader = ()=> {
  return (
    <div className="text-center m-4">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}