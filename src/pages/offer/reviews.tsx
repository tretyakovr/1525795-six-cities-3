import { Comment } from '../../types/comments';

type ReviewsProps = {
  offerComments: Comment[];
};

function Reviews({offerComments}: ReviewsProps): JSX.Element {

  const getFormattedDate = (date: string): string => {
    const commentDate = new Date(date);
    const year = commentDate.getFullYear();
    const month = commentDate.getMonth() + 1;
    const day = commentDate.getDate();

    return `${String(year)}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getDateMMMMYYYY = (date: string): string => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const commentDate = new Date(date);
    const year = commentDate.getFullYear();
    const month = commentDate.getMonth();

    return `${months[month]} ${String(year)}`;
  };

  return (
    <ul className="reviews__list">
      { offerComments.map((item: Comment) => (
        <li key={item.id} className="reviews__item">
          <div className="reviews__user user">
            <div className="reviews__avatar-wrapper user__avatar-wrapper">
              <img className="reviews__avatar user__avatar" src={item.user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
            </div>
            <span className="reviews__user-name">{item.user.name}</span>
          </div>
          <div className="reviews__info">
            <div className="reviews__rating rating">
              <div className="reviews__stars rating__stars">
                <span style={{ width: `${(Math.round(item.rating) * 100 / 5).toString(10)}%` }}></span>
                <span className="visually-hidden">{item.rating}</span>
              </div>
            </div>
            <p className="reviews__text">
              {item.comment}
            </p>
            <time className="reviews__time" dateTime={getFormattedDate(item.date)}>{getDateMMMMYYYY(item.date)}</time>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Reviews;
