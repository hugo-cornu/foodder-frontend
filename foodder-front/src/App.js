import "./App.css"
import React from "react"
import PlacesAutocomplete, { geocodeByAddress } from "react-places-autocomplete"
import axios from "axios"
// const baseUrl = process.env.REACT_APP_BACKEND_URL

function App() {
  const [address, setAddress] = React.useState("")
  const [data, setData] = React.useState({})

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value)
    console.log("results:", results)

    const adressComponent = results[0].address_components
    const myObject = {}

    // get country and cca2 info
    for (let value of adressComponent) {
      if (value.types[0].toLowerCase() === "country") {
        myObject.country = value.long_name
        myObject.cca2 = value.short_name
      }
    }
    // Get city name info
    for (let element of adressComponent) {
      if (element.types[0].toLowerCase() === "locality") {
        myObject.city = element.long_name
      }
    }
    console.log("myObject:", myObject)
    setData(myObject)
    setAddress(value)
    console.log("value:", value)
  }

  // Send data to the backend with axios
  const handleSubmit = async (e) => {
    try {
      console.log(data)
      e.preventDefault()
      const dataToSend = { ...data, title: "Test Test", image: "no-image" }

      const res = await axios.post(
        "http://localhost:5005/api/articles",
        dataToSend
      )
      console.log("data:", res.data)
    } catch (err) {
      console.log(err)
    }
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
          <form onSubmit={handleSubmit}>
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
            <button>Submit</button>
          </form>
        )}
      </PlacesAutocomplete>
    </div>
  )
}

export default App
