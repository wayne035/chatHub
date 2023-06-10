
export default function Loading() {
  return (
    <div className='flex justify-center items-center bg-[#000] h-[100vh]  z-10'>
      <span className='text-[72px] md:text-[100px] text-[#fff] font-black'>
        Loading...
      </span>
      <div className='circle'></div>
    </div>
  )
}
