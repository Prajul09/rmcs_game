import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient();
export const callApi = (url: any, data: any) => {
    //console.log(data, '==========')
    try {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                return res;
            });
    } catch (error) {
        return error
    }
}