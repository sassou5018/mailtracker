import { Email } from "@prisma/client"

interface TrackerTableProps {
    trackers? : Email[]
}

/**
 * 
 * @deprecated
 * @param trackers: Email[]
 * @returns 
 */


export default async function TrackerTableManualFill({trackers}: TrackerTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <th>id</th>
                    <th>Tracker subject</th>
                </thead>
                <tbody>
                    {trackers && trackers.length >0 ?
                    trackers.map((tracker) => {
                        return (
                            <tr key={tracker.id}>
                                <td>{tracker.id}</td>
                                <td>{tracker.subject}</td>
                            </tr>
                        )
                    })
                    :
                    <tr>
                        <td colSpan={2} className="text-center">No trackers found</td>
                    </tr>
                }
                </tbody>
            </table>
        </div>
    )
}