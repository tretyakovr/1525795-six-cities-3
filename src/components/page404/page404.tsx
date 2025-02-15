import { Link } from 'react-router-dom';
import { getErrorMessage } from '../../store/app-data/selectors';
import { useAppSelector } from '../../hooks';


function Page404(): JSX.Element {
  const message = useAppSelector(getErrorMessage);

  console.trace('s;dlkjsd');
  return (
    <div>
      <h1>Error 404: Page not found</h1>
      <h4>There is no life on Mars</h4>
      {message !== '' ? <p>Error: {message} </p> : ''}
      <img src="https://thumbs.dreamstime.com/b/black-white-page-design-web-application-error-big-numbers-space-shuttle-carries-cable-drawing-style-doodle-259540361.jpg"/>
      <p>Back to <Link to="/"><strong>main page</strong></Link></p>
    </div>
  );
}

export default Page404;
