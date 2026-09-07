import { List, Card, Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react"
import { TrimesterEnum } from "../../interfaces/test.interface"
import CheckBoxListItem from "./formInput/checkboxListItem"
import useSchoolClassesQueries from "../../hooks/schoolClass/useSchoolClassesQueries"
import useTestTags from "../../hooks/test/useTestTagsQuery"
import { useState } from "react"

interface TestFilterSectionProps {
    trimesterFilters : TrimesterEnum[],
    setTrimesterFilters : React.Dispatch<React.SetStateAction<TrimesterEnum[]>>,
    schoolClassFilters : string[],
    setSchoolClassFilters : React.Dispatch<React.SetStateAction<string[]>>,
    testTagFilters : string[],
    setTestTagFilters : React.Dispatch<React.SetStateAction<string[]>>
}

export default function TestFilterSection(props : TestFilterSectionProps) {

    const [open, setOpen] = useState<boolean>(false);

    const {schoolClassFilters, setSchoolClassFilters, setTrimesterFilters, trimesterFilters, testTagFilters, setTestTagFilters} = props;
    
    const {schoolClasses} = useSchoolClassesQueries();

    const {testTags} = useTestTags();
    
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

    const handleTestTagsFilters = (testTag : string) => {
        if (testTagFilters.includes(testTag)) {
            setTestTagFilters(testTagFilters.filter((tagFilter) => tagFilter !== testTag))
        } else {
            setTestTagFilters([...testTagFilters, testTag])
        }
    }

    function Icon({open} : {open : boolean}) {
        return (
            <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`${open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
            >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
        );
    }

    return (
        <Card className="mx-3">
            <Accordion open={open} icon={Icon({open})}>
                <AccordionHeader  className="p-3" onClick={() => setOpen(!open)}>Filtres</AccordionHeader>
                <AccordionBody className="flex flex-col md:flex-row gap-3 justify-center px-3 flex-wrap">
                    <fieldset className="border-2 border-dashed rounded-xl">
                        <legend className="ms-3">Trimestre</legend>
                        <List className="flex-col">
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
                    <fieldset className="border-2 border-dashed rounded-xl">
                        <legend className="ms-3">Classe</legend>
                        <List className="flex-col">
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
                    <fieldset className="border-2 border-dashed rounded-xl">
                        <legend className="ms-3">Tag</legend>
                        <List className="flex-col">
                        { testTags?.map(tag =>
                            (<CheckBoxListItem 
                                key={tag.id}
                                onClick={() => handleTestTagsFilters(tag.name)}
                                id={tag.name}
                                label={tag.name}
                                checked={testTagFilters.includes(tag.name)}
                            />))}
                        </List>
                    </fieldset>
                </AccordionBody>
            </Accordion>
        </Card>
    )
}