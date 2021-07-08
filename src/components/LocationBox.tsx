/* eslint-disable react-hooks/exhaustive-deps */
import { CharacterTypes, LocationTypes } from 'global'
import { useEffect, useState } from 'react'
import { Characters } from 'src/service/axios'
import { Button, Center, MainHeading, Text } from 'src/styles/styles'
import CharacterCard from './CharacterCard'

type LocationBoxTypes = {
    location: LocationTypes
    viewRef?: (node?: Element | null | undefined) => void
}

const LocationBox = ({ location, viewRef }: LocationBoxTypes) => {
    const [characters, setCharacters] = useState<CharacterTypes[] | undefined>(undefined)
    const [currentCharacterIndex, setCurrentCharacterIndex] = useState(6)

    const getCharacters = async () => {
        const charactersInitial: CharacterTypes[] = []
        for (let i = 0; i < location.residents.length; i++) {
            const characterInfo: CharacterTypes = await Characters.GET(location.residents[i])
            charactersInitial.push(characterInfo)
        }
        setCharacters(charactersInitial)
    }

    useEffect(() => {
        getCharacters()
    }, [])

    return (
        <Center
            as='section'
            ref={viewRef}
            border='1px solid #5252FF'
            borderRadius='6px'
            padding='1em'
            margin='0 0 2em 0'
        >
            <MainHeading textAlign='start'>{`#${location.id}-${location.name}`}</MainHeading>

            <Text>
                {`This is a ${location.type} located in ${location.dimension}. There are total of ${location.residents.length} known residents that are originated from here`}
            </Text>

            <Center flexDirection='row' alignItems='flex-start'>
                {characters?.map((character, index) => {
                    if (index < currentCharacterIndex)
                        return <CharacterCard key={character.id} character={character} />
                    else return null
                })}
            </Center>
            {location.residents.length > 6 && (
                <Button
                    display={currentCharacterIndex >= location.residents.length ? 'none' : 'block'}
                    onClick={() =>
                        setCurrentCharacterIndex(prev =>
                            prev > location.residents.length ? location.residents.length : prev + 6
                        )
                    }
                >
                    Load More
                </Button>
            )}
        </Center>
    )
}

export default LocationBox
