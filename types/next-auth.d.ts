import NextAuth from "next-auth";
declare module "next-auth" {

    interface User {
        name: string;
        email: string;
        id: number;
        role: string;
        topicsCompleted: number;
   }
    interface Session {
        user: User;
        token: {
            name: string;
        }
    }
    
}