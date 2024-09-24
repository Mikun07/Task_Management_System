type CallbackFunction<T extends unknown[]> = (...args: T) => void;

export function debounce<T extends unknown[]>(
  func: CallbackFunction<T>,
  delay: number
): (...args: T) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: T) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}
