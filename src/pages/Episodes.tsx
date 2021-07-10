/* eslint-disable react-hooks/exhaustive-deps */
import { EpisodeTypes } from 'global';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import EpisodeBox from 'src/components/EpisodeBox';
import { EpisodesGET } from 'src/service/rickAndMorty';
import { Center } from '../styles/styles';

const Episodes = () => {
  const [episodes, setEpisodes] = useState<EpisodeTypes[]>([]);
  const [page, setPage] = useState<number | null>(1);
  const [ref, inView] = useInView();

  const fetchEpisodes = async () => {
    if (page !== null) {
      const data = await EpisodesGET(page);
      setEpisodes((prev) => [...prev, ...data.results]);
      if (data.info.next !== null)
        setPage(Number(data.info.next.split('page=')[1]));
      else setPage(data.info.next);
    } else return;
  };
  useEffect(() => {
    fetchEpisodes();
  }, []);

  useEffect(() => {
    if (inView === true) fetchEpisodes();
  }, [inView]);

  return (
    <Center as="main" justifyContent="flex-start" width="70%">
      {episodes?.map((episode, index) => {
        if (index === episodes.length - 1)
          return (
            <EpisodeBox
              viewRef={ref}
              key={episode.id}
              episode={episode}
              data-testid="serhat"
            />
          );
        else
          return (
            <EpisodeBox
              key={episode.id}
              episode={episode}
              data-testid="serhat"
            />
          );
      })}
    </Center>
  );
};

export default Episodes;
