export function EyeOff({ size = 20, className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      className={className}
    >
      <path d="M17.94 17.94A10.06 10.06 0 0 1 12 20c-7 0-11-8-11-8a18.9 18.9 0 0 1 4.22-5.61M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-5.12M3 3l18 18" />
    </svg>
  );
}
