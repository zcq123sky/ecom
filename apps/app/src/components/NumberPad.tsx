interface NumberPadProps {
  onPress?: (key: string) => void;
}

const rows = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['*', '0', '#'],
];

export function NumberPad({ onPress }: NumberPadProps) {
  return (
    <div className="flex flex-col gap-2.5 items-center">
      {rows.map((row, ri) => (
        <div key={ri} className="flex gap-3">
          {row.map((key) => (
            <button
              key={key}
              className="w-[76px] h-11 bg-button-default border-3 border-outline rounded-lg flex items-center justify-center text-text-dark text-lg font-bold cursor-pointer active:translate-y-0.5 active:shadow-none transition-all"
              style={{ boxShadow: '2px 2px 0 0 #2C1810' }}
              onClick={() => onPress?.(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
