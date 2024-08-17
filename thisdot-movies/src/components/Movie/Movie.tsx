import Image from 'next/image';
import classes from './movie.module.css';
import defaultMovieThumb from '/public/images/default_movie_thumb.webp';

export type MovieProps = {
  id: string;
  title: string;
  posterUrl?: string;
  rating?: string;
}

export const Movie = ({ id, title, posterUrl, rating }: MovieProps) => {
  return (
    <div className={classes.movie_card}>
      <a href={`/movie/${id}`}>
        <h2 className={classes.movie_title}>{title}</h2>
        <Image
          className={classes.movie_img}
          src={posterUrl || defaultMovieThumb}
          alt={title}
          width={256}
          height={320}
          priority
          placeholder='blur'
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/eZ9PQAI1wNHqHKIqAAAAABJRU5ErkJggg=='
        />
      </a>
      {rating && <p className={classes.movie_rating}>Rating: {rating}</p>}
    </div>
  )
}