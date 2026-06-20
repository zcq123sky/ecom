import { NumberPad } from './NumberPad';
import { ABCButtons } from './ABCButtons';
import { LeverCoinSlot } from './LeverCoinSlot';
import { ReturnSection } from './ReturnSection';
import { Screw } from './Screw';

interface ControlPanelProps {
  amount: number;
  onReturnCoin: () => void;
  onPullLever: () => void;
}

export function ControlPanel({ amount, onReturnCoin, onPullLever }: ControlPanelProps) {
  return (
    <div className="relative w-[400px] bg-machine-frame border-3 border-outline rounded-t-xl p-[36px_28px] flex flex-col gap-6"
      style={{ boxShadow: '8px 8px 0 0 rgba(0,0,0,0.27)' }}
    >
      <Screw className="top-2 left-2" />
      <Screw className="top-2 right-2" />

      <span className="text-white text-center text-base font-bold">— 操作面板 —</span>

      <NumberPad />

      <ABCButtons />

      <LeverCoinSlot amount={amount} onPullLever={onPullLever} />

      <ReturnSection onReturnCoin={onReturnCoin} />

      <div className="w-50 h-0.5 bg-machine-accent border border-outline mx-auto" />

      <span className="text-text-light-muted text-[10px] text-center">VENDY v2.0　|　智能自动售卖</span>

      <div className="absolute bottom-2 left-2" style={{ opacity: 0 }}>
        <Screw />
      </div>
    </div>
  );
}
