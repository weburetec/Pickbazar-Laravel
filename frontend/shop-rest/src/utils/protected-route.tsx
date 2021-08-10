// import { useAuth } from 'contexts/auth';
// import { useRouter } from 'next/router';
export const ProtectRoute = ({ children }: any) => {
  // const { isAuthenticated, isLoading } = useAuth();
  // const { pathname } = useRouter();
  // if (isLoading || (!isAuthenticated && pathname !== '/login')) {
  //   return <p>Loading...</p>;
  // }
  return children;
};
