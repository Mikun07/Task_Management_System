import React from "react";
interface UserData {
    id: number;
    role: string;
    email: string;
    username: string;
    last_name: string;
    first_name: string;
    is_active: boolean;
    hashed_password: string;
}
interface HeaderProps {
    pageName: string;
    data: UserData | null;
    isLoading: boolean;
}
declare const Header: React.FC<HeaderProps>;
export default Header;
