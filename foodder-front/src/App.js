import "./App.css"
import React from "react"
import PlacesAutocomplete, { geocodeByAddress } from "react-places-autocomplete"

function App() {
  const [address, setAddress] = React.useState("")

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value)
    console.log("results:", results)
    setAddress(value)
  }

  // Gonstrain Google Maps API predictions to certain place types
  const searchOptions = {
    types: [
      "country",
      "locality",
      "sublocality",
      "administrative_area_level_3",
    ],
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
