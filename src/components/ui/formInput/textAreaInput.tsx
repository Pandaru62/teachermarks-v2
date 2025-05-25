import { Typography } from "@material-tailwind/react";

interface PropsInterface {
    label: string,
    name: string,
    value: string,
    onChange?: (e: React.ChangeEvent<any>) => void
    error? : any
    rows: number
}

export default function TextAreaInput(props: PropsInterface) {

    const {label, name, onChange, value, error, rows} = props;

    return (
        <div className="flex flex-col">
            <label htmlFor={name} className="text-xl font-semibold text-black text-center mb-1">{label}</label>
            <textarea 
                id={name}
                name={name}
                onChange={onChange}
                value={value}
                className={`w-full rounded-xl p-2 text-black text-center`}
                rows={rows}
            />
            {error && (
                <Typography variant="small" color="pink" className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 20a8 8 0 1 0 0-16a8 8 0 0 0 0 16m0 2C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-1-6h2v2h-2zm0-10h2v8h-2z"/></svg> 
                    {error}
                </Typography>)
            }
        </div>
    );
}