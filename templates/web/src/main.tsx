import { h, Link, render } from "@prestonarnold/fuse";
import { router, RouterView } from "./router";

function App() {
    return (
        <div className="app">
            <header>
                <h1>Fuse Router Demo</h1>
                <nav className="main-nav">
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/contact">Contact (not defined)</Link>
                    <button onClick={() => router.back()}>Back</button>
                    <button onClick={() => router.forward()}>Forward</button>
                </nav>
            </header>
            
            <main>
                <RouterView />
            </main>
            
            <footer>
                <p>Current URL: {() => JSON.stringify(router.currentPath.value)}</p>
            </footer>
        </div>
    );
}

render(App(), document.getElementById("root")!);