// api/user.ts

'use server'

import type {NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const {name, schoolName, age, address, phone} = req.body;

        try {
            const user = await prisma.user.create({
                data: {name, schoolName, age, address, phone},
            });
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({error: 'Internal server error'});
        }


    } else if (req.method === 'GET') {
        const {id} = req.query;

        try {
            if (id) {
                const user = await prisma.user.findUnique({
                    where: {id: Number(id)},
                });

                if (user) {
                    res.status(200).json(user);

                } else {
                    res.status(404).json({error: 'User not found'});
                }

            } else {
                const users = await prisma.user.findMany();
                res.status(200).json(users);
            }
        } catch (error) {
            res.status(500).json({error: 'Internal server error'});
        }

    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
