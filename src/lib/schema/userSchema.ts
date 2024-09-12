import {z} from "zod";

// schema for validation at form
const userSchema = z.object({
    name: z.string(),
    schoolName: z.string(),
    age: z.number(),
    address: z.string(),
    phone: z.string(),
})

export default userSchema;