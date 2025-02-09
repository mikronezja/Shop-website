import { Dispatch, SetStateAction } from "react";

export interface UserLoginInterface {
  userLoggedID: string;
  role: "admin" | "user";
  username: string;
  setUserLoggedID: Dispatch<SetStateAction<string>>;
  setRole: Dispatch<SetStateAction<"user" | "admin">>;
  setUsername: Dispatch<SetStateAction<string>>;
}
