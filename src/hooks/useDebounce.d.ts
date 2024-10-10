type CallbackFunction<T extends unknown[]> = (...args: T) => void;
export declare function debounce<T extends unknown[]>(func: CallbackFunction<T>, delay: number): (...args: T) => void;
export {};
