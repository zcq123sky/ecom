interface LeverCoinSlotProps {
  amount: number;
  onPullLever?: () => void;
}

export function LeverCoinSlot({ amount, onPullLever }: LeverCoinSlotProps) {
  return (
    <div className="flex gap-5 justify-center items-center">
      <div className="flex flex-col gap-1.5 items-center">
        <span className="text-text-light-muted text-xs">拉杆</span>
        <button
          className="w-[90px] h-[120px] bg-text-muted border-3 border-outline rounded-xl relative cursor-pointer active:scale-95 transition-transform"
          onClick={onPullLever}
        >
          <div className="absolute top-0 left-[35px] w-5 h-[70px] bg-text-light-muted border-3 border-outline rounded-t-lg" />
          <div className="absolute top-[62px] left-[18px] w-[54px] h-14 bg-lever-handle border-3 border-outline rounded-full" />
          <div className="absolute top-3 left-3.5 w-3.5 h-9 bg-white/35 rounded" />
          <div className="absolute top-[72px] left-6 w-[18px] h-3.5 bg-white/25 rounded-full" />
        </button>
      </div>

      <div className="flex flex-col gap-2 items-center">
        <span className="text-text-light-muted text-xs">投币口</span>
        <div className="w-[90px] h-15 bg-coin-slot border-3 border-outline rounded-xl flex items-center justify-center">
          <div className="w-[50px] h-2 bg-black border-2 border-outline rounded" />
        </div>
        <div className="w-[90px] h-[34px] bg-coin-slot border-3 border-outline rounded-lg flex items-center justify-center">
          <span className="text-machine-accent-dark text-base font-bold">¥{amount}</span>
        </div>
      </div>
    </div>
  );
}
