import Link from "next/link";

export default function Page() {
    return(
        <main>
            <div className=" h-screen flex flex-col justify-center items-center bg-base-100">
                <h1><span className="text-error text-2xl">Error</span> unauthorized !!</h1>
                <Link href="/" className="btn btn-primary mt-3">Home</Link>
            </div>
        </main>
    )
}