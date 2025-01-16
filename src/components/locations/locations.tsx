import { Link } from 'react-router-dom';

type LocationsProps = {
  locations: string[];
  activeLocation: string;
  changeLocationHandler(activeLocation: string): void;
}

function Locations({locations, activeLocation, changeLocationHandler}: LocationsProps): JSX.Element {
  const classLocation = 'locations__item-link tabs__item';
  const classActiveLocation = `${classLocation} tabs__item--active`;

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
