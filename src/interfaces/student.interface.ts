export default interface StudentInterface {
    id: number,
    lastName: string,
    firstName: string,
    created_at?: Date | string,
    updated_at?: Date | string,
    classes: {id: number, name: string}[]
}

export type CreateStudentInterface = Pick<StudentInterface, "lastName" | "firstName">;

export type EditStudentInterface = Pick<StudentInterface, "lastName" | "firstName">;