import Link from "next/link";

// pages/404.js
export default function Custom404() {
    return (
        <div className="text-center text-3xl text-white">
            <h1>404 - Page Not Found in categories</h1>
            <p>Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
            <Link href={"/"} style={{ color: 'blue', textDecoration: 'underline' }}>
                Go back to Home
            </Link>
        </div>
    );
}