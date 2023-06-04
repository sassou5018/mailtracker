import Image from "next/image";
import Link from "next/link";
import SignOutLink from "./signOutLink";

export default function NavBar(){
    return(
        <header>
                    <div className='navbar bg-base-100'>
                        <div className='navbar-start'>
                            <div className='dropdown'>
                                <label
                                    tabIndex={0}
                                    className='btn btn-ghost btn-circle'
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='h-5 w-5'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth='2'
                                            d='M4 6h16M4 12h16M4 18h7'
                                        />
                                    </svg>
                                </label>
                                <ul
                                    tabIndex={0}
                                    className='menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
                                >
                                    <li>
                                        <Link href="/">Home</Link>
                                    </li>
                                    <li>
                                        <Link href="https://github.com/sassou5018/mailtracker">Github</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='navbar-center'>
                            <Link href="/" className='btn btn-ghost normal-case text-xl'>
                                MailTrackJS
                            </Link >
                        </div>
                        <div className='navbar-end'>
                            {/* <button className='btn btn-ghost btn-circle'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-5 w-5'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                                    />
                                </svg>
                            </button> */}
                            <div className="dropdown dropdown-end dropdown-hover">
                            <label tabIndex={0} className='btn btn-ghost btn-circle'>
                                <div className='indicator'>
                                    <Image
                                        height={20}
                                        width={20}
                                        src="user.svg"
                                        alt="user"
                                        className='h-5 w-5'
                                    />
                                    
                                    <span className='badge badge-xs badge-primary indicator-item'></span>
                                </div>
                            </label>
                            <ul className="menu menu-sm dropdown-content p-2 shadow bg-base-300 rounded-box w-52" tabIndex={0}>
                                    {/* <li><Link href="#">Profile Settings</Link></li> TODO */}
                                    <li><SignOutLink/></li>
                            </ul>
                            </div>
                        </div>
                    </div>
                </header>
    )
}