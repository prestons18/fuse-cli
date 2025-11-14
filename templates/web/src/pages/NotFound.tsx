import { h } from "@prestonarnold/fuse";
import { router } from "../router";

export function NotFoundPage() {
    return (
        <>
            <h1>404 Not Found</h1>
            <button onClick={() => router.navigate("/", true)}>Go Home</button>
        </>
    )
}