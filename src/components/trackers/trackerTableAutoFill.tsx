import { getServerSession } from '@/utils/authUtils'
import prisma from '@/utils/prisma'
import Link from 'next/link'
import { redirect } from 'next/navigation'
export default async function TrackerTableAutoFill() {
    const session = await getServerSession()
    if(!session || !session.user || !session.user.name) redirect('/register')
    const user = await prisma.user.findUnique({where:{username:session?.user.name}})
    const data = await prisma.email.findMany({where:{ownerId:user?.id}})
    return (
        <div className='overflow-x-auto p-2'>
            <table className='table table-xs md:table-md w-full'>
                <thead>
                    <tr>
                        <th className='cursor-default'>id</th>
                        <th className='cursor-default'>Created At</th>
                        <th className='cursor-default'>Tracker subject</th>
                        <th className='cursor-default'>Views</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        data.map(async (tracker) => {
                            const views = await prisma.opens.count({
                                where: {
                                    emailId: tracker.id,
                                },
                            })
                            return (
                                <>
                                    <tr key={tracker.id} className='hover'>
                                        <td className='cursor-default'>
                                            {tracker.id}
                                        </td>
                                        <td className='cursor-default'>
                                            {tracker.createdAt.toLocaleString()}
                                        </td>
                                        <td className='cursor-default'>
                                            {tracker.subject}
                                        </td>
                                        <td className='cursor-default'>
                                            {views}
                                        </td>
                                        <td className='flex md:flex-row flex-col items-center md:justify-center'>
                                            <>
                                                <label
                                                    htmlFor={`my-modal-${tracker.id}`}
                                                    className='link mr-2 text-center'
                                                >
                                                    Get Link
                                                </label>
                                                <input
                                                    type='checkbox'
                                                    id={`my-modal-${tracker.id}`}
                                                    className='modal-toggle'
                                                />
                                                <div className='modal'>
                                                    <div className='modal-box'>
                                                        <h3 className='font-bold text-lg'>
                                                            Here is your link
                                                            for tracker id:{' '}
                                                            {tracker.id}
                                                        </h3>
                                                        <h4 className="mt-5">You can manually append an img element with display: hidden to your email and add the tracker link as the source:</h4>
                                                        <pre className='bg-neutral-focus py-2 rounded-md w-fit mt-2'>
                                                            <code className="px-3">
                                                            {
                                                                process.env
                                                                    .NEXT_PUBLIC_BASE_URL
                                                            }
                                                            /api/tracker/
                                                            {tracker.id}
                                                            </code>
                                                        </pre>
                                                        <div className='modal-action'>
                                                            <label
                                                                htmlFor={`my-modal-${tracker.id}`}
                                                                className='btn'
                                                            >
                                                                Ok!
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                            <Link
                                                href={`/tracker/${tracker.id}`}
                                                className='link ml-2 text-center'
                                            >
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                </>
                            )
                        })
                    ) : (
                        <tr className='hover'>
                            <td
                                colSpan={4}
                                className='text-center cursor-default'
                            >
                                No trackers found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
