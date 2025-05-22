import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import Colorful from '@uiw/react-color-colorful';
import { useState, useEffect } from "react";

interface PickerProps {
    open : boolean
    handleOpen: () => void;
    handleColorChange: (color: string) => void;
    customColor : string;
}

export default function ColorPickerModal(props : PickerProps) {

    const { open = false, handleOpen, customColor, handleColorChange } = props;
      const [tempColor, setTempColor] = useState(customColor);

    useEffect(() => {
        if (open) setTempColor(customColor);
    }, [open, customColor]);

    return (
        <Dialog
        open={open}
        size="sm"
        handler={handleOpen}
      >
        <DialogHeader className="text-center">Choisissez une couleur personnalisée</DialogHeader>
        <DialogBody className="flex justify-center">
          <Colorful 
            color={tempColor}
            onChange={(color) => setTempColor(color.hexa)}
          />
          
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen()}
            className="mr-1"
          >
            <span>Annuler</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
            handleColorChange(tempColor);
            handleOpen();
          }}
          >
            <span>Confirmer</span>
          </Button>
        </DialogFooter>
      </Dialog>
    )
}