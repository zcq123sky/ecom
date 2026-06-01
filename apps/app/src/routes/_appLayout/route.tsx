import { Outlet, createFileRoute } from '@tanstack/react-router'
// import { HorizScroll} from "@/components/horiz-scroll.tsx"
// import { KnownBox} from "@/components/knownbox.tsx"

export const Route = createFileRoute('/_appLayout')({
  component: AppLayoutComponent,
})

function AppLayoutComponent() {
  return (
    <div>

      <div>
        <Outlet />
      </div>
    </div>
  )
}
