import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";

const GET_MOVIE_DETAIL = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
      medium_cover_image
      rating
      isLike @client
    }
  }
`;

// --- Style --- //
const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Image = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
`;

// --- Component --- //
function MovieDetail() {
  const { id } = useParams(); // Access movie ID from URL params
  const {
    loading,
    error,
    data,
    client: { cache },
  } = useQuery(GET_MOVIE_DETAIL, {
    variables: { movieId: id },
  });

  const onClickLike = () => {
    cache.writeFragment({
      id: `Movie:${id}`,
      fragment: gql`
        fragment MovieFragment on Movie {
          isLike
        }
      `,
      data: {
        isLike: !data.movie.isLike,
      },
    });
  };

  // -- Return -- //

  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p>Error fetching movie details: {error.message}</p>;

  const movie = data?.movie; // Handle potential missing data
  if (!movie) return <p>Movie not found.</p>;

  return (
    <Container>
      <Column>
        <Title>{loading ? "Loading..." : `${data.movie?.title}`}</Title>
        <Subtitle>⭐️ {data?.movie?.rating}</Subtitle>
        <button onClick={onClickLike}>
          {data?.movie?.isLike ? "Unlike" : "Like"}
        </button>
      </Column>
      <Image bg={data?.movie?.medium_cover_image} />
    </Container>
  );
}

export default MovieDetail;
