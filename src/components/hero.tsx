import { Button } from './ui/button'

const Hero = () => {
  return (
    <>
      <div className="flex px-6 pt-14 lg:px-8   flex-col hero-h  justify-center space text-center items-center ">
        <div>
          <h1 className="mb-10 scroll-m-20  text-7xl  md:text-7xl font-extrabold tracking-tight lg:text-8xl">
            A better note taking app.
          </h1>
        </div>
        <h2 className="text-2xl mb-10">
          Stop forgetting and start organizing. Plan projects with sticky notes.
        </h2>
        <div className="flex gap-3">
          <Button size={'lg'}>Sign up</Button>
          <Button size={'lg'} variant={'secondary'}>
            Features
          </Button>
        </div>
      </div>
    </>
  )
}

export default Hero
