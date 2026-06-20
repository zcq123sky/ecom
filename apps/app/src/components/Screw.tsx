interface ScrewProps {
  className?: string;
}

export function Screw({ className }: ScrewProps) {
  return (
    <div className={`absolute w-3 h-3 bg-screw-brass border-2 border-outline rounded-full ${className}`}>
      <div className="w-2 h-3 bg-outline/60 rounded-sm" style={{ margin: '0 2px' }} />
    </div>
  );
}
