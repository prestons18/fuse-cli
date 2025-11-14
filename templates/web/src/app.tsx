import { h } from "@prestonarnold/fuse";
import { NavLink, router, RouterView } from "./router";

export function App() {
    return (
        <div className="app">
            <header className="header">
                <h1 className="title">Fuse Router Demo</h1>
                <nav className="main-nav">
                    <NavLink href="/" className="nav-link">Home</NavLink>
                    <NavLink href="/about" className="nav-link">About</NavLink>
                    <NavLink href="/contact" className="nav-link">Contact (not defined)</NavLink>
                    <button onClick={() => router.back()} className="nav-button back-button">Back</button>
                    <button onClick={() => router.forward()} className="nav-button forward-button">Forward</button>
                </nav>
            </header>
            
            <main className="main">
                <RouterView />
            </main>
            
            <footer className="footer">
                <p className="current-url">
                    Current URL: <span className="url-value">{() => router.currentPath.value}</span>
                </p>
            </footer>
        </div>
    );
}