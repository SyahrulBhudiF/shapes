import {z} from "zod";
import {FormulaType, ShapeName} from "@/lib/enum";

// schema for validation at form
const shapeSchema = z.object({
    shapeName: z.enum([ShapeName.square, ShapeName.circle, ShapeName.triangle, ShapeName.cuboid, ShapeName.cube, ShapeName.cylinder]),
    type: z.enum([FormulaType.area, FormulaType.volume]),
    formula: z.string(),
    parameters: z.string(),
    formulaType: z.enum([FormulaType.area, FormulaType.volume]),
});

export default shapeSchema;