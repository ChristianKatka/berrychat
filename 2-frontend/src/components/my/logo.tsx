import { cn } from "../../lib/utils";

interface Props {
  size: "xs" | "sm" | "lg";
}

export const Logo: React.FC<Props> = ({ size }) => {
  const sizeMap: Record<string, { width: number; height: number }> = {
    xs: { width: 40, height: 32 },
    sm: { width: 60, height: 48 },
    lg: { width: 80, height: 64 },
  };

  const dimensions = sizeMap[size];

  return (
    <img
      src="/logo.png"
      width={dimensions.width}
      height={dimensions.height}
      alt="Lorien AI logo"
      className={cn(
        "w-auto h-auto",
        size === "xs" && "max-w-[40px]",
        size === "sm" && "max-w-[60px]",
        size === "lg" && "max-w-[80px]"
      )}
    />
  );
};
