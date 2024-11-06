import type { NextApiRequest, NextApiResponse } from "next";

type User = {
    name: string;
    email: string;
    isVerified: boolean;
    role: "admin" | "user";
}

const loggedInUser: User = {
    name: "hasin023",
    email: "hasin.admin@yahoo.com",
    isVerified: true,
    role: "admin",
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<User>,
) {
    res.status(200).json(loggedInUser);
}
