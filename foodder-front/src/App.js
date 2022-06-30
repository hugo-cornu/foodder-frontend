import "./App.css"
import React from "react"
import PlacesAutocomplete, { geocodeByAddress } from "react-places-autocomplete"

function App() {
  const [address, setAddress] = React.useState("")

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value)

    const adressComponent = results[0].address_components
    const data = {}

    // get country and cca2 info
    for (let value of adressComponent) {
      if (value.types[0].toLowerCase() === "country") {
        data.country = value.long_name
        data.cca2 = value.short_name
      }
    }
    // Get city name info
    for (let value of adressComponent) {
      if (value.types[0].toLowerCase() === "locality") {
        data.city = value.long_name
      }
    }
    console.log("data:", data)
    setAddress(value)
  }

  // Gonstrain Google Maps API predictions to certain place types
  const searchOptions = {
    types: ["locality", "sublocality", "administrative_area_level_3"],
  }

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({ placeholder: "Type city or address" })}
            />

            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                }

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  )
}

export default App
