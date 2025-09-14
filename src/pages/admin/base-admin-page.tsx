import { Outlet } from "react-router";
import LoginForm from "@/components/login-form.tsx";
import useAuth from "@/hooks/use-auth.ts";

const AdminPage = () => {
    const auth = useAuth();
    if (auth.fetchType === "initial") return <p>fetching....</p>;
    return (
        <>
            {/*auth.isAuthenticated*/ true ? (
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
