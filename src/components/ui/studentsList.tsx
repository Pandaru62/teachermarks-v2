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
        <table className="w-full min-w-max table-auto text-left">
            <tbody>
            {students.map(({ lastName, firstName, id }) => (
                <tr key={id} className="even:bg-test-200 bg-opacity-60">
                    <td className="p-2 border-r-8 border-white text-center">
                        <Link  to={`/student/${id}`} className="">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {lastName}
                            </Typography>
                        </Link>
                    </td>
                    <td className="p-2 text-center">
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
    )
}