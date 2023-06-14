import Canva from './Canva'
import Model from './Model'

export default function Body() {
  return (
    <section className='h-[100vh] pt-[60px] bg-[#d4ebf8]'>
      <div className='cursor-default absolute top-[30%] left-1/2 md:left-[10%] translate-x-[-50%] md:translate-x-0 z-10 flex justify-center md:justify-start flex-wrap w-[350px] font-black'>
        <strong className='text-[70px]'>
          Chat 
        </strong>
        <strong className='text-[70px] bg-[#0080FF] rounded-[10px] text-[#fff] px-[10px] mx-[10px]'>
          Hub
        </strong>
        <p className='pt-[30px] text-[24px]'>
          ChatHub是一個線上即時聊天平台，你可以隨機選擇素未謀面的陌生人盡情聊天!!🙂🙂🙂
        </p>
      </div>
      <div className='flex justify-evenly m-auto md:hidden'>
        <span className='emoji text-[30px]'>🤣</span>
        <span className='emoji text-[30px]'>😍</span>
        <span className='emoji text-[30px]'>😙</span>
        <span className='emoji text-[30px]'>😋</span>
        <span className='emoji text-[30px]'>😝</span>
        <span className='emoji text-[30px]'>😜</span>
        <span className='emoji text-[30px]'>😏</span>
      </div>
      <div className='hidden md:block h-full'>
        <Canva>
          <Model file='./model/male.glb' action='./action/talking01.fbx' xyz={{x:0 , y:-0.8 , z:0}} rotationY={.6}/>
          <Model file='./model/female.glb' action='./action/talking.fbx' xyz={{x:1 , y:-0.8 , z:.5}} rotationY={-2.7}/>
        </Canva>
      </div>
    </section>
  )
}
