import { Outlet } from "react-router";
import LoginForm from "@/components/admin/login-form";
import useAuth from "@/hooks/use-auth.ts";

const AdminPage = () => {
  const auth = useAuth();
  if (auth.fetchType === "initial")
    return (
      <div className="bg-[url('/images/light-loading.gif')] dark:bg-[url('/images/loading.gif')] h-[calc(100svh/2)] w-[calc(100svw*0.75)] bg-center bg-no-repeat mx-auto mt-12"></div>
    );
  return (
    <>
      {auth.isAuthenticated ? (
        <Outlet context={{ authToken: auth.authToken }} />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <LoginForm {...auth} />
        </div>
      )}
    </>
  );
};

export default AdminPage;
