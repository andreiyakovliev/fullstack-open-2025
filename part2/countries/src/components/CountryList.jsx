const CountryList = (props) => {


    if (props.countries.length > 10) {
        return (
            <div>
                <p>
                    Too many matches, specify another filter
                </p>
            </div>
        )
    } // else if (props.countries.length === 1) {
    //     return (
    //         <CountryDetails />
    //     )
    // }

    return (
        <ul>
            {props.countries.map(country => {
                return (
                    <li key={country.name.common}>
                        {country.name.common}
                        <button onClick={() => props.onClick(country)}>Show</button>
                    </li>
                )
            })}
        </ul>
    )
}
export default CountryList