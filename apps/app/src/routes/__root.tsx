import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRouteWithContext()({
	component: RootComponent,
	// 也可以在这里配置 notFoundComponent
});

function RootComponent() {
	return (
    <>
      {/*<h1>这里根布局，无匹配路由</h1>，空布局*/}
    <Outlet />
    {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-left" />}
  </>


	);
}
