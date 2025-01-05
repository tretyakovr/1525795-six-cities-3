type LocationsProps = {
  locations: string[];
  activeLocation: string;
}

function Locations({locations, activeLocation}: LocationsProps): JSX.Element {
  const classLocation = 'locations__item-link tabs__item';
  const classActiveLocation = `${classLocation} tabs__item--active`;

  return (
    <ul className="locations__list tabs__list">
      {locations.map((item) => (
        <li key={item} className="locations__item">
          <a className=
            {
              item === activeLocation ? classActiveLocation : classLocation
            } href="#"
          >
            <span>{item}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}


export default Locations;
