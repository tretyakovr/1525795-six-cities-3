import { Link } from 'react-router-dom';

type LocationsProps = {
  locations: string[];
  activeLocation: string;
  setActiveLocation(activeLocation: string): void;
}

function Locations({locations, activeLocation, setActiveLocation}: LocationsProps): JSX.Element {
  const classLocation = 'locations__item-link tabs__item';
  const classActiveLocation = `${classLocation} tabs__item--active`;

  return (
    <ul className="locations__list tabs__list">
      {locations.map((item) => (
        <li key={item} className="locations__item">
          <Link className=
            {
              item === activeLocation ? classActiveLocation : classLocation
            } to={`/${item}`} onClick={() => setActiveLocation(activeLocation = item)}
          >
            <span>{item}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}


export default Locations;
