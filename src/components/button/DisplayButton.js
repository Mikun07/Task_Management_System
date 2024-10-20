import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const DisplayButton = ({ image, useWidth, onClick = () => {}, title = "" }) => {
  return _jsx("button", {
    className: `h-11 bg-white rounded-lg text-primary flex items-center justify-center hover:scale-95 duration-300 ${
      useWidth ? useWidth : "lg:w-48 md:w-full w-full"
    }`,
    onClick: onClick,
    children: _jsxs("div", {
      className: "flex items-center",
      children: [
        image,
        _jsx("p", {
          className:
            "ml-2 capitalize font-semibold text-[14px] leading-5 tracking-tighter",
          children: title,
        }),
      ],
    }),
  });
};
export default DisplayButton;
