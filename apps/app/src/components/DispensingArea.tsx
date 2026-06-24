interface DispensingAreaProps {
  hasDispensed: boolean;
  dispensedProduct?: string;
}

export function DispensingArea({ hasDispensed, dispensedProduct }: DispensingAreaProps) {
  return (
    <div className="w-full bg-machine-inner border-3 border-t-0 border-outline flex" style={{ minHeight: 360 }}>
      {/* Left: Dispensing Slot */}
      <div className="w-[1040px] flex flex-col items-center justify-center gap-4 py-10 border-r-2 border-outline">
        <span className="text-slot-dark text-base font-bold">↓ 商品掉落区 ↓</span>
        <div className="w-[880px] h-50 bg-slot-dark border-4 border-outline rounded-xl flex items-center justify-center"
          style={{ boxShadow: '6px 6px 0 0 rgba(0,0,0,0.27)' }}
        >
          <div className="w-[820px] h-[140px] bg-coin-slot border-3 border-outline rounded-xl flex items-center justify-center"
            style={{ boxShadow: 'inset 0 0 8px rgba(0,0,0,0.4)' }}
          >
            <span className="text-slot-text text-5xl font-bold">
              {hasDispensed ? `🎉 ${dispensedProduct}` : '哐当！'}
            </span>
          </div>
        </div>
        <span className="text-text-muted text-sm">请弯腰取出您的商品</span>
      </div>

      {/* Right: Brand Info */}
      <div className="w-[400px] bg-machine-frame flex flex-col items-center justify-center gap-4">
        <span className="text-machine-body text-3xl font-bold">VENDY</span>
        <div className="w-20 h-0.5 bg-machine-accent border border-outline" />
        <span className="text-slot-dark text-base font-bold">客服热线 400-123-4567</span>
        <span className="text-text-muted text-sm">24小时自助服务</span>
        <span className="text-text-light-muted text-xs">© 2026 Vendy Inc.</span>
      </div>
    </div>
  );
}
