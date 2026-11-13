import FormInterface from "./form.interface"

export default interface SchoolClassInterface {
    id: number,
    name: string,
    color: string,
    isArchived: boolean,
    formId: number,
    form?: FormInterface,
    created_at: Date | string,
    updated_at: Date | string
}

export interface SchoolClassWithCountInterface {
    id: number,
    name: string,
    color: string,
    isArchived: boolean,
    formId: number,
    form?: FormInterface,
    created_at: Date | string,
    updated_at: Date | string
    _count: {
        students: number,
        test: number
    }
}

export type CreateSchoolClassInterface = Pick<SchoolClassInterface, "name" | "color" | "formId">;

export type EditSchoolClassInterface = Pick<SchoolClassInterface, "name" | "color" | "isArchived">;

export interface SchoolClassWithPupilsInterface {
    id: number,
    color: string,
    name: string,
    pupils : [
        {
            id: number,
            firstName: string,
            lastName: string
        }
    ]
}

export interface SchoolClassWithPupilsAndAveragesInterface {
    id: number,
    color: string,
    name: string,
    isArchived: boolean,
    pupils: {
        id: number;
        firstName: string;
        lastName: string;
        results: {
            annual: number;
            TR1: number;
            TR2: number;
            TR3: number;
        }
    }[]
}