import { Grid } from "@chakra-ui/react";
import { Episode } from "./episode";
import { IEpisodes } from "../../types/episode";

interface IProps {
  favEpisodes: IEpisodes[] | undefined;
}

export function FavEpisodes({ favEpisodes }: IProps) {
  return (
    <Grid gap={4} gridTemplateColumns="repeat(auto-fit, minmax(240px, 1fr))">
      {favEpisodes?.map((episode, idx) => (
        <Episode
          key={idx}
          id={episode.id}
          title={episode.title}
          image={episode.image}
          favorite={true}
        />
      ))}
    </Grid>
  );
}
