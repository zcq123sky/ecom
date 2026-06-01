import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appLayout/')({
  component: IndexPageComponent,
})


function IndexPageComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 顶部区域 */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6">
        Top Bar
      </header>

      {/* 中间区域 */}
      <main className="flex-1 flex flex-col md:flex-row">
        {/* 左侧 - 2/3 */}
        <div className="w-full md:w-2/3 flex-[2] md:flex-auto min-h-0 p-6 bg-gray-50 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/*格子*/}
            {Array.from({ length: 12 }).map((_, i) => (

              <div
                key={i}
                className="bg-white rounded-lg border border-gray-200 flex items-center justify-center text-gray-400"
              >
                Item {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* 右侧 - 1/3 */}
        <div className="w-full md:w-1/3 flex-[1] md:flex-auto p-6 bg-white md:border-l border-t md:border-t-0 border-gray-200">
          Right Content
        </div>
      </main>

      {/* 底部区域 */}
      <footer className="h-16 bg-white border-t border-gray-200 flex items-center px-6">
        Footer
      </footer>
    </div>
  )
}
