import { NumberPad } from './NumberPad';
import { ABCButtons } from './ABCButtons';
import { LeverCoinSlot } from './LeverCoinSlot';
import { ReturnSection } from './ReturnSection';
import { Screw } from './Screw';

interface ControlPanelProps {
  amount: number;
  onInsertCoin: () => void;
  onPullLever: () => void;
  onReturnCoin: () => void;
}

export function ControlPanel({ amount, onInsertCoin, onPullLever, onReturnCoin }: ControlPanelProps) {
  return (
    <div className="relative w-[400px] bg-machine-frame border-3 border-b-0 border-outline rounded-t-xl p-[36px_28px] flex flex-col"
      style={{ boxShadow: '8px 8px 0 0 rgba(0,0,0,0.27)' }}
    >
      <Screw className="top-2 left-2" />
      <Screw className="top-2 right-2" />

      <div className="flex flex-col items-center gap-6 overflow-hidden justify-center" style={{ flex: 2 }}>
        <NumberPad />
        <ABCButtons />
        <LeverCoinSlot amount={amount} onPullLever={onPullLever} onInsertCoin={onInsertCoin} />
        <ReturnSection onReturnCoin={onReturnCoin} />
      </div>

      <div className="border-t-3 border-outline -mx-[28px]" />

      <div className="flex items-center gap-4 overflow-hidden pt-4 pb-0" style={{ flex: 1 }}>
        <div className="flex-[2] h-full bg-machine-inner border-3 border-outline rounded-lg flex items-center justify-center">
          <span className="text-text-muted text-xs">访客信息</span>
        </div>
        <div className="flex-1 h-full bg-machine-inner border-3 border-outline rounded-lg flex flex-col items-center justify-center gap-1">
          <span className="text-2xl text-machine-accent-dark font-bold">¥{amount}</span>
          <div className="flex gap-0.5 flex-wrap justify-center px-1">
            {Array.from({ length: Math.min(amount, 6) }).map((_, i) => (
              <span key={i} className="text-xs">🪙</span>
            ))}
            {amount > 6 && <span className="text-xs text-text-muted">+{amount - 6}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
