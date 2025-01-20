import { Link } from 'react-router-dom';
import { store } from '../../store';

type LocationsProps = {
  locations: string[];
  changeLocationHandler(activeLocation: string): void;
}

function Locations({locations, changeLocationHandler}: LocationsProps): JSX.Element {
  const classLocation = 'locations__item-link tabs__item';
  const classActiveLocation = `${classLocation} tabs__item--active`;
  const activeLocation = store.getState().city;

  const locationClickHandler = (evt: React.MouseEvent<HTMLElement>):void => {
    changeLocationHandler(evt.currentTarget.innerText);
  };

  return (
    <ul className="locations__list tabs__list">
      {locations.map((item) => (
        <li key={item} className="locations__item">
          <Link className=
            {
              item === activeLocation ? classActiveLocation : classLocation
            } to="/" onClick={locationClickHandler}
          >
            <span>{item}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}


export default Locations;
