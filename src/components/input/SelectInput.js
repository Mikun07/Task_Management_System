import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Select from "react-select";
import { startCase } from "lodash";
import { Controller } from "react-hook-form";
const colorStyles = {
    control: (styles) => ({
        ...styles,
        backgroundColor: "#FFFFFF",
        fontSize: "14px",
    }),
    option: (styles) => ({
        ...styles,
    }),
};
const SelectInput = ({ options, handleChange = () => null, control, label, title = "", }) => {
    return (_jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("label", { htmlFor: label, className: "text-gray-700 text-[12px] font-semibold mb-1", children: _jsx("div", { children: title ? startCase(title) : startCase(label) }) }), _jsx(Controller, { name: label, control: control, render: ({ field }) => {
                    return (_jsx(Select, { ...field, options: options, onChange: (selected) => {
                            field.onChange(selected);
                            handleChange(selected); // Call the external change handler
                        }, styles: colorStyles, isClearable: true, isSearchable: true, closeMenuOnSelect: true, blurInputOnSelect: true, value: field.value, theme: (theme) => ({
                            ...theme,
                            borderRadius: 5,
                            colors: {
                                ...theme.colors,
                                primary25: "#76b1ef",
                                primary: "#007BFF",
                            },
                        }) }));
                } })] }));
};
export default SelectInput;
