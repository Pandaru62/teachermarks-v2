import FormInterface from "./form.interface"

export default interface SchoolClassInterface {
    id: string,
    name: string,
    color: string,
    is_archived: boolean,
    form_id: number,
    form?: FormInterface,
    created_at: Date | string,
    updated_at: Date | string
}