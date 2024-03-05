import { Fn } from "@angular-ru/cdk/typings";
import { SioColorType } from "../../types";

export interface SioCoreItemOptionInterface {
    text?: string | undefined;
    icon?: string | undefined;
    color?: SioColorType;
    default?: boolean;
    fnHandler? : Fn;
}

export interface SioCoreItemOptionsInterface {
    options: SioCoreItemOptionInterface[];
}