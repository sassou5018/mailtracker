"use client"
import Image from "next/image"
import useSwr from "swr"


interface CountryAPIResponse{
    ip: string
    country: string
}
const fetcher = (ipAddress: string)=>{
    return fetch(`https://api.country.is/${ipAddress}`)
    .then(res => res.json())
}

export default function TinyFlag({ipAddress, className}: {ipAddress: string, className?: string}) {
    const {data, error } = useSwr<CountryAPIResponse, Error>(ipAddress, fetcher)
    if(error) return <span>Error!</span>
    if(!data) return <span>No data</span>
    return (
        <>
        <Image src={data.country ? `https://flagsapi.com/${data.country}/flat/64.png` : '/uknownflag.png'} width="32" height="32" alt="flag" className={className}/>
        </>
    )
}