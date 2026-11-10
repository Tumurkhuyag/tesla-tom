/* Хуудсанд ашиглагддаг бүх SVG icon */

type IconProps = { className?: string };

export function TeslaLogo({ className }: IconProps) {
  return (
    <svg viewBox="0 0 342 35" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M0 .1a9.7 9.7 0 0 0 7 7h11l.5.1v27.6h6.8V7.3L26 7h11a9.8 9.8 0 0 0 7-7H0zm238.6 0h-6.8v34.8H263a9.7 9.7 0 0 0 6-6.8h-30.3V0zm-52.3 6.8c3.6-1 6.6-3.8 7.4-6.9l-38.1.1v20.6h31.1v7.2h-24.4a13.6 13.6 0 0 0-8.7 7h39.9v-21h-31.2v-7zm116.2 28h6.7v-14h24.6v14h6.7v-21h-38zM85.3 7h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7m0 13.8h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7m0 14.1h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7M308.5 7h26a9.6 9.6 0 0 0 7-7h-40a9.6 9.6 0 0 0 7 7"
      />
    </svg>
  );
}

export function SupportIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="9.25" />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.4 2.33c-.55.22-.9.74-.9 1.33V14" strokeLinecap="round" />
      <circle cx="12" cy="17" r=".9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function GlobeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="9.25" />
      <path d="M2.75 12h18.5M12 2.75c2.5 2.6 3.75 5.68 3.75 9.25S14.5 18.65 12 21.25M12 2.75C9.5 5.35 8.25 8.43 8.25 12s1.25 6.65 3.75 9.25" />
    </svg>
  );
}

export function AccountIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="9.25" />
      <circle cx="12" cy="10" r="3.25" />
      <path d="M5.9 18.6c1.2-2.1 3.4-3.35 6.1-3.35s4.9 1.25 6.1 3.35" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className={className}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function ChevronLeft({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path fill="currentColor" d="m14 18-6-6 6-6 1.4 1.4-4.6 4.6 4.6 4.6z" />
    </svg>
  );
}

export function ChevronRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path fill="currentColor" d="M12.6 12 8 7.4 9.4 6l6 6-6 6L8 16.6z" />
    </svg>
  );
}

export function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#fff" d="M7 4v16l13-8z" />
    </svg>
  );
}

export function FindMeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 18.3c3.66 0 6.63-2.82 6.63-6.3S15.66 5.7 12 5.7 5.37 8.52 5.37 12 8.34 18.3 12 18.3Zm0-1.8c2.62 0 4.74-2.01 4.74-4.5S14.62 7.5 12 7.5 7.26 9.51 7.26 12s2.12 4.5 4.74 4.5Z"
        fill="#393C41"
      />
      <ellipse cx="12" cy="12" rx="1.9" ry="1.8" fill="#393C41" />
      <rect x="11.05" y="3" width="1.9" height="3.6" rx=".95" fill="#393C41" />
      <rect x="11.05" y="17.4" width="1.9" height="3.6" rx=".95" fill="#393C41" />
      <rect x="3" y="11.1" width="3.8" height="1.8" rx=".9" fill="#393C41" />
      <rect x="17.2" y="11.1" width="3.8" height="1.8" rx=".9" fill="#393C41" />
    </svg>
  );
}

export function FullscreenIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#666"
        d="m12 19.175 2.125-2.125 1.425 1.4L12 22l-3.55-3.55 1.425-1.4zM4.825 12l2.125 2.125-1.4 1.425L2 12l3.55-3.55 1.4 1.425zm14.35 0L17.05 9.875l1.4-1.425L22 12l-3.55 3.55-1.4-1.425zM12 4.825 9.875 6.95 8.45 5.55 12 2l3.55 3.55-1.425 1.4z"
      />
    </svg>
  );
}

export function SuperchargerIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x=".23" y=".23" width="23.54" height="23.54" rx="11.77" fill="#FF3A3A" stroke="#F4F4F4" strokeWidth=".46" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.334 10.449c0 .146.12.265.267.265h3.91c.205 0 .333.223.23.4l-4.573 7.829c-.137.235-.497.138-.497-.134v-5.257a.266.266 0 0 0-.266-.265H7.49a.266.266 0 0 1-.23-.4l4.578-7.833c.137-.234.497-.137.497.134v5.26Z"
        fill="#fff"
      />
    </svg>
  );
}

export function DestinationChargerIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x=".23" y=".23" width="23.54" height="23.54" rx="11.77" fill="#929292" stroke="#F4F4F4" strokeWidth=".46" />
      <path
        d="M9.523 5.454v2.3H8.108a.708.708 0 0 0-.708.707v4.954a2.831 2.831 0 0 0 2.831 2.831h3.539a2.831 2.831 0 0 0 2.83-2.83V8.46a.708.708 0 0 0-.707-.707h-1.416v-2.3a.53.53 0 1 0-1.061 0v2.3h-2.831v-2.3a.53.53 0 1 0-1.062 0Zm.354 12.915c0 .391.317.708.708.708h2.83a.708.708 0 0 0 .708-.708V17.13a.177.177 0 0 0-.177-.177h-3.892a.177.177 0 0 0-.177.177v1.238Z"
        fill="#fff"
      />
    </svg>
  );
}

export function ChatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" className="flex-none">
      <path fill="#5c5e62" d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H10l-4 3.5V16h-.5A1.5 1.5 0 0 1 4 14.5z" />
      <circle cx="8.5" cy="10" r="1" fill="#fff" />
      <circle cx="12" cy="10" r="1" fill="#fff" />
      <circle cx="15.5" cy="10" r="1" fill="#fff" />
    </svg>
  );
}

export function SendIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#fff" d="M11 20V7.8l-5.6 5.6L4 12l8-8 8 8-1.4 1.4L13 7.8V20z" />
    </svg>
  );
}

export function SteeringWheelIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" className="flex-none">
      <circle cx="12" cy="12" r="9.5" fill="none" stroke="#3e6ae1" strokeWidth="2" />
      <path fill="#3e6ae1" d="M3 11.5c3-1.4 6-2 9-2s6 .6 9 2v1.2c-2.5-.4-4.6.6-5.6 2.3l-1.7 4.8h-3.4L8.6 15C7.6 13.3 5.5 12.3 3 12.7z" />
      <circle cx="12" cy="13.5" r="1.6" fill="#fff" />
    </svg>
  );
}
