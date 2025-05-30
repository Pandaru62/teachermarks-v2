import { Typography } from "@material-tailwind/react";

interface PropsInterface {
    label: string,
    options: { id: number; label: string; }[],
    value: number,
    name: string,
    onChange?: (e: React.ChangeEvent<any>) => void
    error? : any
}

export default function SelectInput(props: PropsInterface) {

    const {label, options, value, name, onChange, error} = props;

    return (
        <div className="flex flex-col">
            <label htmlFor={name} className="text-xl font-semibold text-black text-center mb-1">{label}</label>
            <select
                name={name}
                className="bg-white rounded-xl ps-3 h-10"
                onChange={onChange}
                value={value}
            >
                {options.map((option) => (
                    <option key={option.id} value={option.id}>{option.label}</option>
                ))}
            </select>
            {error && (
                <Typography variant="small" color="pink" className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 20a8 8 0 1 0 0-16a8 8 0 0 0 0 16m0 2C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-1-6h2v2h-2zm0-10h2v8h-2z"/></svg> 
                    {error}
                </Typography>)
            }
        </div>
    );
}