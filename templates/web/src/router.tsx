import { h, Router, createNavLink } from "@prestonarnold/fuse";
import { HomePage } from "./pages/Home";
import { AboutPage } from "./pages/About";
import { NotFoundPage } from "./pages/NotFound";

export const router = new Router();

export const NavLink = createNavLink(router);

const routes: Record<string, () => Node> = {
    "/": HomePage,
    "/about": AboutPage,
};

const routeMatches = Object.keys(routes).map(path => ({
    path,
    match: router.match(path),
    component: routes[path]
}));

export function RouterView() {
    return (
        <div className="router-view">
            <div className="current-route">
                Current Route: <span className="route-path">{() => router.currentPath.value}</span>
            </div>
            
            {() => {
                const currentPath = router.currentPath.value;
                
                for (const route of routeMatches) {
                    if (route.match.value) {
                        return (
                            <div className="route-component" key={currentPath}>
                                {route.component()}
                            </div>
                        );
                    }
                }
                
                return (
                    <div className="route-component not-found" key="not-found">
                        {NotFoundPage()}
                    </div>
                );
            }}
        </div>
    );
}