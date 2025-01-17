import React from 'react'

export default function Section({ children }: { children: React.ReactNode }) {
  return (
    <div className='mt-6 flex h-full w-full items-center justify-center px-5 pb-4 sm:px-12 md:px-16 lg:px-28 xl:px-36 2xl:px-44'>
      {children}
    </div>
  )
}
