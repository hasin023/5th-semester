import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/utils/mongodb";

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { name, email, password } = req.body;
        await dbConnect();
        // await createUser({ name, email, password });

        res.status(201).json({ message: 'Account created', data: { name, email, password } });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: (error as Error).message });
    }
}
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === 'POST')
        return POST(req, res);
    res.status(404).json({ error: 'Invalid Method' });
}
