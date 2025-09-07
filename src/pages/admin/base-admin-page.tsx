import { useState } from "react";
import { Outlet } from "react-router";
import LoginForm from "@/components/login-form.tsx";
import useAuth from "@/hooks/use-auth.ts";

const AdminPage = () => {
    const auth = useAuth();
    if (auth.fetchType === "initial") return <p>fetching....</p>;
    return (
    	<>
    	<Outlet context={{ authToken: auth.authToken }} />
    	{/*
        <div className="flex items-center justify-center h-screen">
            {auth.isAuthenticated ? (
                <Outlet context={{ authToken: auth.authToken }} />
            ) : (
                <LoginForm {...auth} />
            ) }
        </div>
    	*/}
    	</>
    );
};

export default AdminPage;
