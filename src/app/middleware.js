import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

// Middleware runs on every request
export async function middleware(req) {
   const { getUser } = getKindeServerSession();
   const user = await getUser();

   // You can log the user data to confirm session retrieval
   console.log('User in middleware:', user);

   // If the user is logged in, allow access
   if (user) {
      return NextResponse.next();
   }

   // If no user is found, redirect to login
   return NextResponse.redirect(new URL('/api/auth/login', req.url));
}

export const config = {
   matcher: ['/protected/*', '/api/auth/*'], // Adjust to match routes you want protected
};
