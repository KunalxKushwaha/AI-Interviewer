import React from 'react'
import { ReactNode } from 'react';

const Authlayout = async ({children}: {children: ReactNode}) => {
 
  return (
    <div className='auth-layout'>
      {children}
    </div>
  )
}

export default Authlayout
