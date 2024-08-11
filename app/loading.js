"use client";

import { Watch } from 'react-loader-spinner';

const Loading = () => {

  return (
    <div className='flex h-screen w-full justify-center items-center'>
        <Watch height={50} width={50} color='#fe6600' />
    </div>
  );

}

export default Loading