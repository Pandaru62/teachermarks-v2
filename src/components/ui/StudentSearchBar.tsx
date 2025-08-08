import { Input } from "@material-tailwind/react";
import { useState } from "react";
import useAllStudentsQuery from "../../hooks/student/useAllStudentsQuery";
import StudentInterface from "../../interfaces/student.interface";
import { useNavigate } from "react-router-dom";

export default function StudentSearchBar() {

    const navigate = useNavigate();
    const {allStudents} = useAllStudentsQuery();
    const [query, setQuery] = useState("");
    const [filtered, setFiltered] = useState<StudentInterface[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleChange = (e : any) => {
        const value = e.target.value;
        setQuery(value);
        if (value.length > 0 && allStudents) {
        const matches = allStudents.filter((item) =>
            item.firstName.toLowerCase().includes(value.toLowerCase()) || item.lastName.toLowerCase().includes(value.toLowerCase())
        );
        setFiltered(matches);
        setShowSuggestions(true);
        } else {
        setFiltered([]);
        setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion: StudentInterface) => {
        setQuery("");
        setFiltered([]);
        setShowSuggestions(false);
        navigate("/student/" + suggestion.id)
    };

    return (
        <div className="relative w-72">
            <Input
                label="Rechercher un élève"
                value={query}
                onChange={handleChange}
                onFocus={() => query && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                className="text-white"
                color="white"
            />
            {showSuggestions && filtered.length > 0 && (
            <ul className="absolute z-[100000] w-full bg-white border border-gray-300 rounded-md mt-1 shadow-md max-h-60 overflow-auto">
            {filtered.map((item) => (
                <li key={item.id} className="text-black">
                    <button
                        type="button"
                        className="w-full text-left px-4 py-2 hover:bg-blue-100 cursor-pointer"
                        onClick={() => handleSuggestionClick(item)}
                    >
                        {item.lastName} {item.firstName}
                    </button>
                </li>
            ))}
            </ul>
            )}
        </div>
    );
}
