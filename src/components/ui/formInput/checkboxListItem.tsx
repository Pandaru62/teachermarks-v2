import { Checkbox, ListItem, ListItemPrefix, Typography } from "@material-tailwind/react";

interface CheckboxListItemProps {
    id: string,
    label: string,
    onClick: () => void,
    checked?: boolean
}

export default function CheckBoxListItem(props : CheckboxListItemProps ) {

    const {id, label, onClick, checked = false} = props;

    return (
        <ListItem className="p-0 w-1/2" key={id}>
            <label
                htmlFor={id}
                className="flex cursor-pointer items-center px-3 py-2"
            >
                <ListItemPrefix className="mr-3">
                <Checkbox
                    color="amber"
                    id={id}
                    ripple={false}
                    onChange={onClick}
                    checked={checked}
                    className="hover:before:opacity-0"
                    containerProps={{
                    className: "p-0",
                    }}
                />
                </ListItemPrefix>
                <Typography color="blue-gray" className="font-medium">
                    {label}
                </Typography>
            </label>
        </ListItem>
    )
}