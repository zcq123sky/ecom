export function Header() {
  return (
    <div className="flex items-center justify-between h-20 px-10 bg-machine-body border-b-3 border-outline shadow-[0_6px_0_0_rgba(0,0,0,0.27)] relative">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-machine-accent border-3 border-outline rounded-lg" />
        <span className="text-white text-2xl font-bold">VENDY</span>
        <span className="text-machine-accent text-lg" style={{ transform: 'translateY(-6px)' }}>✦</span>
        <span className="text-white/70 text-sm" style={{ transform: 'translateY(4px)' }}>✦</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-4 h-4 bg-green-500 border-2 border-outline rounded-full" />
        <span className="text-white text-sm">营业中</span>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-machine-accent border-t-2 border-outline" />
    </div>
  );
}
