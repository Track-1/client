import { ROUTES } from "../../core/common/routes";
import { ReturnType } from "./returnType";

export type RoutesType = typeof ROUTES[keyof typeof ROUTES] & ReturnType<typeof ROUTES[keyof typeof ROUTES]>;
