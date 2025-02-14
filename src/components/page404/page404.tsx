import { Link } from 'react-router-dom';

function Page404(): JSX.Element {
  return (
    <div>
      <h1>Error 404: Page not found</h1>
      <h2>There is no life on Mars</h2>
      <img src="https://thumbs.dreamstime.com/b/black-white-page-design-web-application-error-big-numbers-space-shuttle-carries-cable-drawing-style-doodle-259540361.jpg"/>
      <p>Back to <Link to="/"><strong>main page</strong></Link></p>
    </div>
  );
}

export default Page404;
