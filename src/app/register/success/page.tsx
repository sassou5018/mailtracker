import Link from "next/link";

export default function Page() {
    return(
        <main>
            <div className=" h-screen flex flex-col justify-center items-center bg-base-100">
                <h1><span className="text-success text-2xl">Successfully</span> Registered You!!</h1>
                <Link href="/api/auth/signin" className="btn btn-primary mt-3">Log in Here</Link>
            </div>
        </main>
    )
}