interface ReturnSectionProps {
  onReturnCoin?: () => void;
}

export function ReturnSection({ onReturnCoin }: ReturnSectionProps) {
  return (
    <div className="flex gap-5 justify-center items-center">
      <button
        className="w-20 h-13 bg-lever-handle border-3 border-outline rounded-xl flex items-center justify-center cursor-pointer active:translate-y-0.5 transition-all"
        style={{ boxShadow: '2px 2px 0 0 #2C1810' }}
        onClick={onReturnCoin}
      >
        <span className="text-white text-sm font-bold">退币</span>
      </button>

      <div className="w-20 h-13 bg-coin-slot border-3 border-outline rounded-xl flex flex-col items-center justify-center gap-1">
        <div className="w-12 h-2 bg-black border-2 border-outline rounded" />
        <span className="text-machine-accent-dark text-sm">🪙</span>
      </div>
    </div>
  );
}
