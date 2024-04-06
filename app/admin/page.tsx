"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { SolvedTest } from "@prisma/client";
import { useSession } from "next-auth/react";

const Admin = () => {
    const [solvedTests, setSolvedTests] = useState<SolvedTest[]>([]);
    const { data: session, status } = useSession();

    useEffect(() => {
        if (!session) {
            return;
        }
        axios.get("/api/user/test/solved").then((response) => {
            setSolvedTests(response.data);
        });
    }, []);

    return (
        <>
            <h1>Testy</h1>
            <div>
                {solvedTests.map((test, i) => (
                    <div key={i}>
                        <span>{`Test ${test.testId}: `}</span>
                        <span>{test.score}</span>
                    </div>
                ))}
            </div>
        </>
    )
};
export default Admin;