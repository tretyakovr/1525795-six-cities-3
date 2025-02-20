import { useAppSelector } from '../../hooks';
import { Comment } from '../../types/comments';
import { getComments } from '../../store/offer-data/selectors';
import { getAuthStatus } from '../../store/user-data/selectors';
import { AuthStatus } from '../../const';
import Feedback from '../feedback/feedback';
import { starsWidth } from '../../utils';

const VIEW_COMMENTS_COUNT = 10;


function Reviews(): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);
  let comments = useAppSelector(getComments);
  const commentsCount = comments.length;

  comments = [...comments].sort((review1, review2) => +new Date(review2.date) - +new Date(review1.date));
  comments = [...comments.slice(0, VIEW_COMMENTS_COUNT)];

  const getFormattedDate = (date: string): string => {
    const commentDate = new Date(date);
    const year = commentDate.getFullYear();
    const month = commentDate.getMonth() + 1;
    const day = commentDate.getDate();

    return `${String(year)}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getDateMMMMYYYY = (date: string): string => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const commentDate = new Date(date);
    const year = commentDate.getFullYear();
    const month = commentDate.getMonth();

    return `${months[month]} ${String(year)}`;
  };

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot;
        <span className="reviews__amount">{commentsCount}</span>
      </h2>
      <ul className="reviews__list">
        { comments.map((item: Comment) => (
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
                  <span style={{ width: starsWidth(item.rating) }}></span>
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
      { authStatus === AuthStatus.Auth ? <Feedback /> : null}
    </section>
  );
}

export default Reviews;
