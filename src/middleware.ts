import { NextResponse, type NextMiddleware } from 'next/server'

export const config = {
  matcher: [],
}

const middleware: NextMiddleware = async (request, event) => {
  console.log(request, event)

  return NextResponse.next()
}

export default middleware
