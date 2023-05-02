import React from 'react'
const index = () => {
  return (
    <div>
        <div className='bg-zinc-200 flex justify-center items-center h-screen'>
            <div className='bg-white h-[500px] rounded-lg w-[350px]'>
                <div className='flex justify-center items-center flex-col '>
                    <p className=' pl-72 mt-1'><i className="ri-pencil-fill"></i></p>
                    <img className='rounded-full w-20 h-20 object-cover' src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                    <h1 className='text-gray-800 font-semibold text-xl mt-2'>Anney Doe</h1>
                </div>
                <div className='mr-5 pt-5 flex justify-between align-center'>
                    <p className='text-zinc-600 font-semibold text-lg ml-5 text-center '>Email : </p>
                    <input className='h-10 px-5 border border-sm  rounded-md' type="email" pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" required placeholder='abc@example.com' />
                </div>
                <div className='mr-5 pt-5 flex justify-between align-center'>
                    <p className='text-zinc-600 font-semibold text-lg ml-5 text-center '>Phone : </p>
                    <input className='h-10 px-5 border border-sm  rounded-md' type="number" placeholder='9876543210' />
                </div>
                <div className='mr-5 pt-5 flex justify-between align-center'>
                    <p className='text-zinc-600 font-semibold text-lg ml-5 text-center '>Address :</p>
                    <input className='h-10 px-5 border border-sm  rounded-md' type="text" placeholder='lorem ipsum sit amet' />
                </div>
                <div className='mr-5 pt-5 flex justify-between align-center'>
                    <p className='text-zinc-600 font-semibold text-lg ml-5 text-center'>Upload</p>
                    <input className='px-5' type="file" />
                </div>
                <div className='ml-5 mr-5 mt-7'>
                    <button className='bg-red-400 h-10 rounded hover:bg-red-600 duration-300 w-full text-white font-semibold'>Save Profile</button>
                </div>
            </div>
        </div>
    </div>
  )
}
export default index