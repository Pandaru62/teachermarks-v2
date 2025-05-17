interface PropsInterface {
    label: string,
    type: "text" | "email" | "password",
    name: string,
    value: string,
    onChange: (e: React.ChangeEvent<any>) => void
}

export default function TextInput(props: PropsInterface) {

    const {label, type, name, onChange, value} = props;

    return (
        <div className="flex flex-col">
            <label htmlFor="email" className="text-xl font-semibold text-black text-center mb-1">{label}</label>
            <input 
            type={type}
            id={name}
            name={name}
            onChange={onChange}
            value={value}
            className="rounded-xl p-2 text-black text-center"
            >
            </input>
        </div>
    );
}