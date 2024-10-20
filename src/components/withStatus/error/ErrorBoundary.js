import { jsx as _jsx } from "react/jsx-runtime";
import { Component } from "react";
import Error from "./Error";
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        };
    }
    static getDerivedStateFromError(_) {
        // Update state to indicate an error has occurred
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        // Optionally log error details or send to a monitoring service
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            // Render fallback UI in case of an error
            return _jsx(Error, { label: "Oops something went wrong..." });
        }
        // Render children if there is no error
        return this.props.children || null;
    }
}
export default ErrorBoundary;
