/* eslint-disable react-hooks/exhaustive-deps */
import { CharacterTypes, EpisodeTypes } from 'global'
import { useEffect, useState } from 'react'
import { Characters } from 'src/service/axios'
import { Button, Center, MainHeading, Text } from 'src/styles/styles'
import CharacterCard from './CharacterCard'

type EpisodeBoxTypes = {
    episode: EpisodeTypes
    viewRef?: (node?: Element | null | undefined) => void
}

const EpisodeBox = ({ episode, viewRef }: EpisodeBoxTypes) => {
    const [characters, setCharacters] = useState<CharacterTypes[] | undefined>(undefined)
    const [currentCharacterIndex, setCurrentCharacterIndex] = useState(6)

    const getCharacters = async () => {
        const charactersInitial: CharacterTypes[] = []
        for (let i = 0; i < episode.characters.length; i++) {
            const characterInfo: CharacterTypes = await Characters.GET(episode.characters[i])
            charactersInitial.push(characterInfo)
        }
        setCharacters(charactersInitial)
    }

    useEffect(() => {
        getCharacters()
    }, [])

    return (
        <Center
            data-testid='EpisodeWrapper'
            as='section'
            ref={viewRef}
            border='1px solid #5252FF'
            borderRadius='6px'
            padding='1em'
            margin='0 0 2em 0'
        >
            <MainHeading textAlign='start'>{`#${episode.id}-${episode.name}`}</MainHeading>

            <Text>
                {`This is the ${episode.episode.split('S')[1].split('E')[0]}st episode in ${
                    episode.episode.split('S')[1].split('E')[1]
                }st session. It was aired on ${episode.air_date}. There are total of ${
                    episode.characters.length
                } featured characters in this episode`}
            </Text>

            <Center flexDirection='row' alignItems='flex-start'>
                {characters?.map((character, index) => {
                    if (index < currentCharacterIndex)
                        return <CharacterCard key={character.id} character={character} />
                    else return null
                })}
            </Center>
            {episode.characters.length > 6 && (
                <Button
                    data-testid='LoadMoreCharacterButton'
                    display={currentCharacterIndex >= episode.characters.length ? 'none' : 'block'}
                    onClick={() =>
                        setCurrentCharacterIndex(prev =>
                            prev > episode.characters.length ? episode.characters.length : prev + 6
                        )
                    }
                >
                    Load More
                </Button>
            )}
        </Center>
    )
}

export default EpisodeBox
