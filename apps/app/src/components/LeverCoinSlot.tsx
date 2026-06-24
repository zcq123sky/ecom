interface LeverCoinSlotProps {
  amount: number;
  onPullLever?: () => void;
  onInsertCoin?: () => void;
}

export function LeverCoinSlot({ amount, onPullLever, onInsertCoin }: LeverCoinSlotProps) {
  return (
    <div className="flex gap-5 justify-center items-center">
      <button
        className="w-[90px] h-[120px] bg-text-muted border-3 border-outline rounded-xl relative cursor-pointer active:scale-95 transition-transform"
        onClick={onPullLever}
      >
        <div className="absolute top-0 left-[35px] w-5 h-[70px] bg-text-light-muted border-3 border-outline rounded-t-lg" />
        <div className="absolute top-[62px] left-[18px] w-[54px] h-14 bg-lever-handle border-3 border-outline rounded-full" />
        <div className="absolute top-3 left-3.5 w-3.5 h-9 bg-white/35 rounded" />
        <div className="absolute top-[72px] left-6 w-[18px] h-3.5 bg-white/25 rounded-full" />
      </button>

      <div
        className="w-[54px] h-[90px] bg-coin-slot border-3 border-outline rounded-xl flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
        onClick={onInsertCoin}
      >
        <div className="w-2 h-[50px] bg-black border-2 border-outline rounded" />
      </div>
    </div>
  );
}
