"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "danger" | "success" | "outline";
  size?: "sm" | "md" | "lg"; // <-- Tambahin pintu ini bre!
  isLoading?: boolean;
}

export const Button = ({
  children,
  variant = "primary",
  size = "md", // Default-nya md ya bre
  isLoading,
  className,
  ...props
}: ButtonProps) => {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    outline:
      "border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs rounded-md", // Kecil sat-set
    md: "px-4 py-2 text-sm rounded-lg", // Standar kuli
    lg: "px-6 py-3 text-base rounded-xl", // Gede mantap
  };

  return (
    <button
      disabled={isLoading || props.disabled}
      className={`font-medium transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 
        ${variants[variant]} 
        ${sizes[size]} 
        ${className}`}
      {...props}>
      {isLoading && (
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
};
