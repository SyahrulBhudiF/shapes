import {z} from "zod";

const userSchema = z.object({
    name: z.string(),
    schoolName: z.string(),
    age: z.number(),
    address: z.string(),
    phone: z.string(),
})

export default userSchema;