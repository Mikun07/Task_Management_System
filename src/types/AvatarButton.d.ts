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
interface AvatarButtonProps {
    data?: UserData | null;
    loading?: boolean;
    signOut?: () => void;
}
declare const AvatarButton: ({ data, loading, signOut, }: AvatarButtonProps) => import("react/jsx-runtime").JSX.Element;
export default AvatarButton;
