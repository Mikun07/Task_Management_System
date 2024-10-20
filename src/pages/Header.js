import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AvatarButton from "@/components/button/AvatarButton";
import { logout } from "@/redux/features/loginSlice";
import { useDispatch } from "react-redux";
const Header = ({ pageName, data, isLoading }) => {
    const dispatch = useDispatch();
    const handleSignOut = () => {
        dispatch(logout());
    };
    return (_jsxs("div", { className: "w-full h-12 bg-white flex items-center sticky top-0 p-4 shadow-sm shadow-gray-200 z-20 justify-between", children: [_jsx("p", { className: "font-medium italic capitalize text-base text-primaryGray", children: pageName }), isLoading ? (_jsx("span", { className: "loader" }) // Placeholder for loading state
            ) : (_jsx(AvatarButton, { data: data, loading: isLoading, signOut: handleSignOut }))] }));
};
export default Header;
