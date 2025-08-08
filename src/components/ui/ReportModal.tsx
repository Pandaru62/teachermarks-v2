import { DialogHeader, DialogBody, DialogFooter, Button, Accordion, AccordionBody, AccordionHeader } from "@material-tailwind/react";
import ReportInterface from "../../interfaces/report.interface";
import StudentInterface from "../../interfaces/student.interface";
import ReportForm from "../forms/ReportForm";
import { TrimesterEnum } from "../../interfaces/test.interface";
import { useState } from "react";

interface ReportModalProps {
  handleOpen: () => void;
  reports : ReportInterface[];
  student : StudentInterface;
}

export default function DiagramModal(props : ReportModalProps) {

    const {handleOpen, reports, student} = props;
    const [openAccordion, setOpenAccordion] = useState(TrimesterEnum.TR1);
    const handleAccordionOpen = (value : TrimesterEnum) => setOpenAccordion(value);

    return (
        <>
          <DialogHeader>Appréciations de {student.firstName} {student.lastName}</DialogHeader>
          <DialogBody>
            {Object.keys(TrimesterEnum).map((tr) => 
              <Accordion open={openAccordion === tr} key={tr}>
                <AccordionHeader onClick={() => handleAccordionOpen(tr as TrimesterEnum)}>
                  Appréciation {tr}
                </AccordionHeader>
                <AccordionBody>
                  <ReportForm trimester={tr as TrimesterEnum} report={reports.find(r => r.trimester === tr)}/>
                </AccordionBody>
              </Accordion>
            )}
          </DialogBody>
          <DialogFooter>
            <Button variant="gradient" color="gray" onClick={handleOpen}>
              <span>Fermer</span>
            </Button>
          </DialogFooter>
        </>
    )
}