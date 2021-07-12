/* eslint-disable react-hooks/exhaustive-deps */
import { LocationTypes } from 'global'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import LocationBox from 'src/components/LocationBox'
import { LocationsGET } from 'src/service/dataFetch'
import { Center } from '../styles/styles'

const Locations = () => {
    const [locations, setLocations] = useState<LocationTypes[]>([])
    const [page, setPage] = useState<number | null>(1)
    const [ref, inView] = useInView()

    const fetchLocations = async () => {
        if (page !== null) {
            const data = await LocationsGET(page)
            setLocations(prev => [...prev, ...data.results])
            if (data.info.next !== null) setPage(Number(data.info.next.split('page=')[1]))
            else setPage(data.info.next)
        } else return
    }

    useEffect(() => {
        fetchLocations()
    }, [])

    useEffect(() => {
        if (inView === true) fetchLocations()
    }, [inView])

    return (
        <Center as='main' justifyContent='flex-start' width='70%'>
            {locations?.map((location, index) => (
                <LocationBox
                    key={location.id}
                    location={location}
                    viewRef={index === locations.length - 1 ? ref : undefined}
                />
            ))}
        </Center>
    )
}

export default Locations
