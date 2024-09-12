import {z} from "zod";

// schema for validation at form
const userSchema = z.object({
    name: z.string().min(5),
    schoolName: z.string().min(5),
    age: z.number().min(5),
    address: z.string().min(5),
    phone: z.string().min(5),
})

export default userSchema;