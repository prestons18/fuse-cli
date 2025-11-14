import { createLink, h, Router } from "@prestonarnold/fuse";
import { HomePage } from "./pages/Home";
import { AboutPage } from "./pages/About";
import { NotFoundPage } from "./pages/NotFound";

export const router = new Router();

// NAVLINK WILL COME IN NEXT FUSE UPDATE
interface NavLinkProps {
    href: string;
    className?: string;
    children?: any;
    [key: string]: any;
}

export function NavLink(props: NavLinkProps) {
    const { href, className, children, ...rest } = props;
    const baseLink = createLink(router);
    
    return (
        <div className="nav-item">
            {() => {
                router.currentPath.value;
                const isActive = router.match(href).value;
                const linkClass = `${className || ''} ${isActive ? 'active' : ''}`.trim();
                
                return baseLink({
                    ...rest,
                    href,
                    className: linkClass,
                    children
                });
            }}
        </div>
    );
}

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