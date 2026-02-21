import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

export function IconLink({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
      />
    </svg>
  );
}

export function IconPdf({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
      />
    </svg>
  );
}

export function IconGlobe({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 15h16.8" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3c2.6 2.5 4.2 5.7 4.2 9S14.6 18.5 12 21c-2.6-2.5-4.2-5.7-4.2-9S9.4 5.5 12 3Z"
      />
    </svg>
  );
}

export function IconKeywordGovernance({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path
        d="M12 3l8 4v6c0 5-3.5 8-8 8s-8-3-8-8V7l8-4z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 12h8M10 15h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconKeywordDataAi({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M7 7h10v10H7V7z" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M4 9V5h4M20 9V5h-4M4 15v4h4M20 15v4h-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconKeywordTransition({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path
        d="M7 14c3-6 7-6 10 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 3v4M12 17v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconKeywordImpactMeasurement({
  className,
  ...props
}: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M5 19V5h14v14H5z" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 15l2-3 2 2 3-5 1 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconLinkedIn({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.1c.7-1.3 2.4-2.7 5-2.7 5.3 0 6.3 3.5 6.3 8V24h-5V16.5c0-1.8 0-4.2-2.6-4.2-2.6 0-3 2-3 4.1V24h-5V8z" />
    </svg>
  );
}

export function IconGitHub({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.11 3.29 9.44 7.86 10.97.57.1.78-.25.78-.55v-2.1c-3.2.7-3.88-1.55-3.88-1.55-.52-1.33-1.27-1.68-1.27-1.68-1.04-.72.08-.71.08-.71 1.15.08 1.76 1.19 1.76 1.19 1.02 1.76 2.68 1.25 3.33.96.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.45.11-3.02 0 0 .97-.31 3.18 1.18a11.1 11.1 0 012.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.57.24 2.73.12 3.02.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.25 5.68.41.35.77 1.04.77 2.1v3.11c0 .31.2.66.79.55A11.52 11.52 0 0023.5 12C23.5 5.74 18.27.5 12 .5z" />
    </svg>
  );
}

export function IconMail({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M2 4h20v16H2V4zm10 7L4 6v12h16V6l-8 5z" />
    </svg>
  );
}
