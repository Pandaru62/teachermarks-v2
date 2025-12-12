import { List, Card } from "@material-tailwind/react"
import { TrimesterEnum } from "../../interfaces/test.interface"
import CheckBoxListItem from "./formInput/checkboxListItem"
import useSchoolClassesQueries from "../../hooks/schoolClass/useSchoolClassesQueries"

interface TestFilterSectionProps {
    trimesterFilters : TrimesterEnum[],
    setTrimesterFilters : React.Dispatch<React.SetStateAction<TrimesterEnum[]>>,
    schoolClassFilters : string[],
    setSchoolClassFilters : React.Dispatch<React.SetStateAction<string[]>>
}

export default function TestFilterSection(props : TestFilterSectionProps) {

    const {schoolClassFilters, setSchoolClassFilters, setTrimesterFilters, trimesterFilters} = props;
    
    const {schoolClasses} = useSchoolClassesQueries();

    const handleTrimesterFilters = (trimester : TrimesterEnum) => {
        if (trimesterFilters.includes(trimester)) {
            setTrimesterFilters(trimesterFilters.filter((trimesterFilter) => trimesterFilter !== trimester))
        } else {
            setTrimesterFilters([...trimesterFilters, trimester])
        }
    }

    const handleSchoolClassFilters = (schoolClass : string) => {
        if (schoolClassFilters.includes(schoolClass)) {
            setSchoolClassFilters(schoolClassFilters.filter((schoolClassFilter) => schoolClassFilter !== schoolClass))
        } else {
            setSchoolClassFilters([...schoolClassFilters, schoolClass])
        }
    }

    return (
        <Card className="flex flex-col sm:flex-row justify-center">
            <fieldset className="border-2 border-dashed m-3 rounded-xl sm:w-full">
                <legend className="ms-3">Filtrer par trimestre</legend>
                <List className="flex-col md:flex-row">
                { Object.values(TrimesterEnum).map(trimester =>
                    (<CheckBoxListItem 
                        key={trimester}
                        onClick={() => handleTrimesterFilters(trimester)}
                        id={trimester}
                        label={trimester}
                        checked={trimesterFilters.includes(trimester)}
                    />))}
                </List>
            </fieldset>
            <fieldset className="border-2 border-dashed m-3 rounded-xl sm:w-full">
                <legend className="ms-3">Filtrer par classe</legend>
                <List className="grid md:grid-cols-2">
                { schoolClasses?.map(schoolClass =>
                    (<CheckBoxListItem 
                        key={schoolClass.id}
                        onClick={() => handleSchoolClassFilters(schoolClass.name)}
                        id={schoolClass.name}
                        label={schoolClass.name}
                        checked={schoolClassFilters.includes(schoolClass.name)}
                    />))}
                </List>
            </fieldset>
        </Card>
    )
}