declare function Error({ label, title, ...rest }: {
    [x: string]: any;
    label?: string;
    title?: string;
}): import("react/jsx-runtime").JSX.Element;
export default Error;
