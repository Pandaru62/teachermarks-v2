export default interface DashboardInterface {
    lastTests: {
        id: number,
        name: string,
        date: Date | string,
        schoolclass: {
            id: number,
            name: string,
        },
        completion: number
    }[]
}
