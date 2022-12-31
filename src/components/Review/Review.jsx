import avatarFallback from '../../img/author_avatar_fallback.png';
const Review = ({ review }) => {
  console.dir(review);
  const { content } = review;
  const BASE_URL = 'https://image.tmdb.org/t/p/w500';

  return (
    <div style={{ padding: '6px', margin: '1rem', border: '1px solid black' }}>
      <p style={{ fontSize: '14px' }}>{content}</p>
      <p style={{ fontSize: '12px', textAlign: 'end' }}>
        {new Date(review?.created_at).toLocaleDateString() ?? 'Once...'}
        <span></span>
      </p>
      <div>
        <img
          style={{ display: 'inline-block', marginRight: '0.5rem' }}
          src={
            review?.author_details?.avatar_path
              ? BASE_URL + review?.author_details?.avatar_path
              : avatarFallback
          }
          alt={review?.author_details?.username}
          width="50"
          height="50"
        />
        <span style={{ fontStyle: 'italic', color: 'darkblue' }}>
          {review?.author_details?.username ?? 'Someone said...'}
        </span>
      </div>
    </div>
  );
};

export default Review;
