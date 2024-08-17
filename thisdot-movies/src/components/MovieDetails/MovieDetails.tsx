import Image from 'next/image';
import { BackButton } from '@/components/BackButton';
import { FetchMovieDetailsResponse } from '@/types/api';
import defaultMovieThumb from '/public/images/default_movie_thumb.webp';
import classes from './movieDetails.module.css';

type MovieDetailsProps = {
  item: FetchMovieDetailsResponse
}

export const MovieDetails = ({ item }: MovieDetailsProps) => {
  const formattedDate = new Date(item.datePublished).toLocaleDateString();
  const directedBy = item.directors?.join(', ');
  const mainActors = item.mainActors?.join(', ');
  const genres = item.genres.map(genre => genre.title).join(', ');

  return (

    <div className={classes.container}>
      <BackButton />
      <article className={classes.detailsContainer}>
        <figure className={classes.posterContainer}>
          <Image
            className={classes.poster}
            src={item.posterUrl || defaultMovieThumb}
            alt={`${item.title} Poster`}
            width={320}
            height={480}
            priority
          />
          <figcaption className={classes.screenReader}>{item.title} Poster</figcaption>
        </figure>
        <section className={classes.details}>
          <header>
            <h2 className={classes.title}>{item.title}</h2>
          </header>
          <p className={classes.rating}><strong>Rating:</strong> {item.rating}</p>
          <p className={classes.duration}><strong>Duration:</strong> {item.duration}</p>
          <p className={classes.releaseDate}><strong>Released on:</strong> {formattedDate}</p>
          <p className={classes.summary}>{item.summary}</p>
          <section className={classes.metaInfo}>
            <p><strong>Directed by:</strong> {directedBy}</p>
            <p><strong>Main Actors:</strong> {mainActors}</p>
            <p><strong>Genres:</strong> {genres}</p>
            <p className={classes.ratingValue}>
              <strong>Rating:</strong> {item.ratingValue} / {item.bestRating}
            </p>
          </section>
        </section>
      </article>
    </div>
  )
}