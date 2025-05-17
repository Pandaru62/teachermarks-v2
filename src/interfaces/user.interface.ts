import ProfileInterface from "./profile.interface";

export default interface UserInterface {
    id: number;
    email: string;
    password: string;
    role: "teacher" | "admin";
    is_validated: boolean;
    profile: ProfileInterface
  }
  