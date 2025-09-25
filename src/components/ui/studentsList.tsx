import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

interface StudentsListProp {
    students : {
        id?: number,
        firstName: string,
        lastName: string,
        schoolClassId?: number,
        hidden?: boolean
    }[]
}

export default function StudentsList(props : StudentsListProp) {

    const {students} = props;

    return (
    <>
        {students !== undefined && students.length > 0 ? (
        <table className="w-full table-auto text-left">
            <tbody>
            {students.map(({ lastName, firstName, id }) => (
                <tr key={id} className="even:bg-test-200 bg-opacity-60">
                    <td className="w-1/2 p-2 border-r-8 border-white text-center">
                        <Link  to={`/student/${id}`} className="">
                            <Typography variant="small" color="blue-gray" className="font-normal md:hidden">
                                {lastName.length > 12 ? lastName.slice(0, 12) + '...' : lastName}
                            </Typography>
                            <Typography variant="small" color="blue-gray" className="font-normal hidden md:inline">
                                {lastName}
                            </Typography>
                        </Link>
                    </td>
                    <td className="w-1/2 p-2 text-center">
                        <Link  to={`/student/${id}`} className="">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {firstName}
                            </Typography>
                        </Link>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        ) : (
        <p className="text-center">
            Aucun élève
        </p>
        )}
    </>)
}