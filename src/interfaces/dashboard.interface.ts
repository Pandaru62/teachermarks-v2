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
        absents: number
    }[]
    schoolClasses: {
        id: number,
        color: string,
        name: string,
        _count: {
            students: number,
            test: number
        }
    }[]
}
