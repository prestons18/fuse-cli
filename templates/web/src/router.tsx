import { h, Router } from "@prestonarnold/fuse";
import { HomePage } from "./pages/Home";
import { AboutPage } from "./pages/About";
import { NotFoundPage } from "./pages/NotFound";

export const router = new Router();

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
                Current Route: {() => router.currentPath.value}
            </div>
            
            {() => {
                for (const route of routeMatches) {
                    if (route.match.value) return route.component();
                }
                return NotFoundPage();
            }}
        </div>
    );
}