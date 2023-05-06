import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Make the homepage accessible while signed out
  publicRoutes: ["/"]
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!static|.*\\..*|_next|favicon.ico).*)",
    "/",
  ],
};

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)"],
// };
