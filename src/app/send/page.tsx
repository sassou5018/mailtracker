'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Page() {
    const [radio, setRadio] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const router = useRouter()
    const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRadio(Number(e.target.value))
    }
    const onSubmit = async (e: any) => {
        e.preventDefault()
        setIsLoading(true)
        const data = {
            host: radio === 1 ? e.target.host.value : 'smtp.gmail.com',
            port: radio === 1 ? e.target.port.value : '587',
            username: e.target.username.value,
            password: e.target.password.value,
            recipients: e.target.recipients.value,
            subject: e.target.subject.value,
            contents: e.target.contents.value,
        }
        const res = await fetch('/api/send', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const resData = await res.json()
        if (res.ok) {
            setIsSuccess(true)
            setIsError(false)
            setTimeout(() => {
                router.push(`/tracker/${resData.id}`)
            }
            , 5000)
        } else if(!res.ok){
            setIsError(true)
            setIsSuccess(false)
            setIsLoading(false)
        }
    }
    return (
        <main className='bg-base-100'>
            <div className='flex flex-col items-center justify-center bg-base-100 '>
                <h1 className='mt-5'>SMTP Email Sender:</h1>
                <div className='bg-base-300 p-5 rounded-xl'>
                    <div className='flex justify-center items-center'>
                        <div className='flex justify-center items-center p-2'>
                            <label className='label'>SMTP</label>
                            <input
                                type='radio'
                                value={1}
                                name='radio1'
                                className='radio checked:bg-blue-500'
                                checked={radio === 1 || radio == null}
                                onChange={onRadioChange}
                            />
                        </div>
                        <div className='flex justify-center items-center p-2'>
                            <label className='label'>GMAIL</label>
                            <input
                                type='radio'
                                value={2}
                                name='radio1'
                                className='radio checked:bg-red-500'
                                checked={radio === 2}
                                onChange={onRadioChange}
                            />
                        </div>
                    </div>
                    <form onSubmit={onSubmit} className='flex flex-col items-center'>
                        <div className='md:flex h-full'>
                            <div className='mx-3 grid'>
                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text'>
                                            SMTP Host:
                                        </span>
                                    </label>
                                    <input
                                        type='text'
                                        placeholder={
                                            radio === 1
                                                ? 'smtp.example.com'
                                                : 'smtp.gmail.com'
                                        }
                                        className='input input-bordered'
                                        disabled={radio === 2}
                                        name='host'
                                    />
                                </div>
                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text'>
                                            SMTP Port:
                                        </span>
                                    </label>
                                    <input
                                        type='text'
                                        placeholder={
                                            radio === 1 ? '6969' : '587'
                                        }
                                        className='input input-bordered'
                                        disabled={radio === 2}
                                        name='port'
                                    />
                                </div>
                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text'>
                                            Your{' '}
                                            {radio === 1 ? 'SMTP' : 'Gmail'}{' '}
                                            Username:
                                        </span>
                                    </label>
                                    <input
                                        type='text'
                                        placeholder='username@example.com'
                                        className='input input-bordered'
                                        name='username'
                                    />
                                </div>
                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text'>
                                            Your{' '}
                                            {radio === 1
                                                ? 'SMTP'
                                                : 'Gmail Generated Application'}{' '}
                                            Password:
                                        </span>
                                    </label>
                                    <input
                                        type='password'
                                        placeholder='Password'
                                        className='input input-bordered'
                                        name='password'
                                    />
                                </div>
                            </div>
                            <div className='divider md:divider-horizontal'></div>
                            <div className='mx-3 grid'>
                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text'>
                                            Recipients:
                                        </span>
                                        <span className='label-text-alt'>
                                            {' '}
                                            (separate with spaces)
                                        </span>
                                    </label>
                                    <input
                                        type='text'
                                        className='input input-bordered'
                                        name='recipients'
                                    />
                                </div>
                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text'>
                                            Subject:
                                        </span>
                                    </label>
                                    <input
                                        type='text'
                                        className='input input-bordered'
                                        name='subject'
                                    />
                                </div>
                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text'>
                                            Email Body:
                                        </span>
                                    </label>
                                    <textarea
                                        className='textarea textarea-bordered'
                                        name='contents'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='mt-5 join'>
                            <Link href='/' className='btn join-item'>
                                Cancel
                            </Link>
                            <button className='btn btn-accent join-item' disabled={isLoading}>
                                {isLoading ? <span className="loading loading-dots loading-lg"></span> :'Send ->'}
                            </button>
                        </div>
                        {isSuccess || isError ? <div className={`alert ${isSuccess &&"alert-success"} ${isError &&"alert-error"} mt-5`}>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='stroke-current shrink-0 h-6 w-6'
                                fill='none'
                                viewBox='0 0 24 24'
                            >
                                {isSuccess && <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                                />}
                                {isError && <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />}
                            </svg>
                            <span>{isSuccess && "Email Sent Successfully Redirecting you soon..."}{isError && "Server Error"}</span>
                        </div> : null}
                        <p className='text-xs max-w-lg text-center mt-5'>
                            We&apos;re not saving your SMTP Information for now.
                            Check the{' '}
                            <Link href='https://github.com/sassou5018/mailtracker' className='link'>
                                Github
                            </Link>{' '}
                            for the source code and for trustworthy links.
                            Otherwise I&apos;d suggest hosting your own instance
                            of the app for extra security.
                        </p>
                    </form>
                </div>
            </div>
        </main>
    )
}
