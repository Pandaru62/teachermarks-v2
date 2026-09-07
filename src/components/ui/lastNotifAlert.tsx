import { useState } from "react";
import { Alert, Typography } from "@material-tailwind/react";
import { useStore } from "zustand";
import { useAuthStore } from "../../hooks/useAuthStore";
 
function Icon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
    </svg>
  )}

export default function LastNotifAlert() {
    const [open, setOpen] = useState(true); 
    const currentUser = useStore(useAuthStore);
    const htmlMessage = currentUser.user?.lastNotif?.message
    
  return (
      <Alert
        open={open}
        className=""
        icon={<Icon />}
        onClose={() => setOpen(false)}
        color="cyan"
      >
        <Typography variant="h3" color="white">
          Nouveautés sur Teachermarks
        </Typography>
        <Typography color="white" className="mt-2 font-normal">
           Le {currentUser.user?.lastNotif?.createdAt}
        </Typography>
        <Typography>
          {currentUser.user?.lastNotif?.title}
        </Typography>
        <div dangerouslySetInnerHTML={{__html: htmlMessage ?? ''}} className="bg-white text-black border-2 p-3 w-full"></div>
      </Alert>
  );
}