export const commonRoutes = ["/settings"];
export const VALID_ROUTES_BY_ROLE = {
  admin: {
    paths: [
      "/dashboard",
      "/vod",
      "/add/vod",
      "/vod/:id",
      "/add/category",
      "/users",
      "/addJob",
      "/jobsLeads",
      ...commonRoutes,
    ],
    landingUrl: "/dashboard",
    redirectUrl: "/access-denied",
    signInUrl: "/signIn",
  },
  client: {
    paths: ["/client/dashboard","/client/jobsLeads", "/client/home", ...commonRoutes],
    landingUrl: "/client/home",
    redirectUrl: "/access-denied",
    signInUrl: "/signIn",
  },
};
