import prisma from "@/utils/prisma"
import { Opens } from "@prisma/client";
import TinyFlag from "./tinyFlag";

interface ViewsTableProps{
    data: Opens[]
}
export default function ViewsTable({data}: ViewsTableProps) {
    return (
        <div className="overflow-x-auto mt-5">
            <table className="table w-full bg-base-300">
                <thead>
                    <tr>
                    <th className="cursor-default"></th>
                    <th className="cursor-default">Seen At</th>
                    <th className="cursor-default">Ip Address</th>
                    <th className="cursor-default">Total: {data ? data.length: "0"}</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length >0 ?
                    data.map((view, index) => {
                        return (
                            <tr key={view.id} className="hover">
                                <td className="cursor-default">{index+1}</td>
                                <td className="cursor-default">{view.createdAt.toLocaleString()}</td>
                                <td className="cursor-default flex justify-center">
                                    {view.ipAddress ? view.ipAddress : "Unknown"}
                                    {view.ipAddress && <TinyFlag className="ml-5" ipAddress={view.ipAddress} />}
                                </td>
                                <td></td>
                            </tr>
                        )
                    })
                    :
                    <tr className="hover">
                        <td colSpan={4} className="text-center cursor-default">No views yet</td>
                    </tr>
                }
                </tbody>
            </table>
        </div>
    )
}