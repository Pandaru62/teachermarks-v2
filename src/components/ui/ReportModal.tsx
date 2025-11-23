import { Accordion, AccordionBody, AccordionHeader, Typography } from "@material-tailwind/react";
import ReportInterface from "../../interfaces/report.interface";
import StudentInterface from "../../interfaces/student.interface";
import ReportForm from "../forms/ReportForm";
import { TrimesterEnum } from "../../interfaces/test.interface";
import { useState } from "react";

interface ReportModalProps {
  reports : ReportInterface[];
  student : StudentInterface;
}

export default function DiagramModal(props : ReportModalProps) {

    const {reports, student} = props;
    const [openAccordion, setOpenAccordion] = useState(TrimesterEnum.TR1);
    const handleAccordionOpen = (value : TrimesterEnum) => setOpenAccordion(value);

    return (
        <div className="mx-2">
          <Typography variant="h5">Appréciations de {student.firstName} {student.lastName}</Typography>
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
        </div>
    )
}