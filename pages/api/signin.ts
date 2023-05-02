import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();
 export default async function handler (req: NextApiRequest, res: NextApiResponse){
    try {
        if(req.method ==='POST'){
            const user = await prisma.user.findMany({
                where:{
                    email: req.body.email,
                    password : req.body.password
                }
            });
            if(user[0].email == req.body.email && user[0].password == req.body.password){
                res.status(200).json({status: true, message: 'Success', data: user});
            }else{
                res.status(401).json({status: false, message:'Invalid credentials', data: null});
            }
        }
    } catch (error) {
        res.status(400).json({status: false, message:error, data: null})
        //console.log("Create User Failed", error)
    }
 }







