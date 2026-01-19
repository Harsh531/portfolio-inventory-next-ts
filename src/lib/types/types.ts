import z from "zod";
import { projectSchema } from "../zod";

export type TProject = z.infer<typeof projectSchema>;