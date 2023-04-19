import type { AuthBindings } from "@refinedev/core";

const mockUsers = [{ email: "john@mail.com" }, { email: "jane@mail.com" }];

const authProvider: AuthBindings = {
    login: async ({email, password}) => {
        const user = mockUsers.find((item) => item.email === email);

        if (user) {
            localStorage.setItem("auth", JSON.stringify(user));
            return {
                success : true,
                redirectTo : "/",
            };
        }

        return {
            success :false,
            error : {
                message : "Login Error",
                name : "Invalid email or password",
            },
        };
    },

    check: async () => {
        const user = localStorage.getItem("auth");

        if (user) {
            return {
                authenticated : true,
            };
        }

        return {
            authenticated :false,
            logout : true,
            redirectTo : "/login",
            error : {
                message : "Check failed",
                name : "Unauthorized",
            },
        };
    },
    logout: async () => {
        localStorage.removeItem("auth");
        return {
            success : true,
            redirectTo : "/login",
        };
    },
    onError: async (error) => {
        if (error.status === 401 || error.status === 403) {
            return {
                logout : true,
                redirectTo : "/login",
                error,
            };
        }
        return{};
    },

    getIdentity: async () => {
        const user = localStorage.getItem("auth");

        if (user) {
            const { email, roles } = JSON.parse(user);

            return {
                email,
                roles,
                name: "John Doe",
                avatar: "https://i.pravatar.cc/300",
            };
        }

        return null;
    },

    register : async ({email}) => {
        const user = mockUsers.find((user) => user.email === email);

        if (user) {
            return {
                success : false,
                error : {
                    name : "Register Error",
                    message : "User already Exits"
                },
            };
        }

        mockUsers.push({email});

        return {
            success : true,
            redirectedTo : "/login"
        };
    },

    forgotPassword: async ({email}) => {
        // Send password link

        return {
            success : true,
            redirectTo : "/login",
        };

        return {
            success : false,
            error : {
                name : "Forgot Password Error",
                message : "Email address does not Exist",
            },
        };
    },

    updatePassword :async ({password, confirmPassword, token}) => {
        // Update password here
        console.log(token);

        return {
            success : true,
            redirectTo : "/login",
        };
        
        return {
            success : false,
            error : {
                name : "Forgot Password Error",
                message : "Email Address does not exist",
            },
        };
    },
};

export default authProvider;