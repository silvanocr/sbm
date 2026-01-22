export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/piloto/:path*', '/admin/:path*'],
}
