import { Outlet } from "react-router";
import LoginForm from "@/components/admin/login-form";
import { useQuery } from "@tanstack/react-query";
import { accessTokenOption, csrfOption } from "@/queryOptions";

const AdminPage = () => {
  const csrfQuery = useQuery(csrfOption);
  const accessTokenQuery = useQuery(accessTokenOption(csrfQuery.data?.csrf));

  if (csrfQuery.isLoading || accessTokenQuery.isLoading)
    return (
      <div className="bg-[url('/images/light-loading.gif')] dark:bg-[url('/images/loading.gif')] h-[calc(100svh/2)] w-[calc(100svw*0.75)] bg-center bg-no-repeat mx-auto mt-12"></div>
    );
  return (
    <>
      {accessTokenQuery.isSuccess ? (
        <Outlet context={{ authToken: accessTokenQuery.data.access }} />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <LoginForm error={accessTokenQuery.error} />
        </div>
      )}
    </>
  );
};

export default AdminPage;
