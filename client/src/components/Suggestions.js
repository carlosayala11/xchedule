import React from 'react'
import '../styles/Suggestions.css'

const Suggestions = (props) => {
  const options = props.results.map(r => (

    <li key={r.bid}>Business Name: {r.bname}
      <ul class="b">
        <li> Start Working Hours:{r.sworkingHours}</li>
        <li> End Working Hours{r.eworkingHours}</li>
        <li> Address: {r.baddress},{r.city},{r.country},{r.zip}</li>
      </ul>
    </li>
  ))
  return <ul class='a'>{options}</ul>
}

export default Suggestions