const abcDefs = [
  { label: 'A', color: 'bg-product-drink' },
  { label: 'B', color: 'bg-product-snack' },
  { label: 'C', color: 'bg-product-goods' },
];

interface ABCButtonsProps {
  onPress?: (key: string) => void;
}

export function ABCButtons({ onPress }: ABCButtonsProps) {
  return (
    <div className="flex gap-3.5 justify-center">
      {abcDefs.map(({ label, color }) => (
        <button
          key={label}
          className={`w-20 h-11 ${color} border-3 border-outline rounded-lg flex items-center justify-center text-white text-lg font-bold cursor-pointer active:translate-y-0.5 active:shadow-none transition-all`}
          style={{ boxShadow: '2px 2px 0 0 #2C1810' }}
          onClick={() => onPress?.(label)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
