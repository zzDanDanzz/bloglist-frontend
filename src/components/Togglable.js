import { useState} from 'react'
const Togglable = (props) => {
  const [hide, setHide] = useState(true)

  const invisibilityCloak = { display: hide ? 'none' : '' }
  const visibilityCloak = { display: !hide ? 'none' : '' }

  const toggleHide = () => {
    setHide(!hide)
  }

  return <>
  <div style={invisibilityCloak}>
    {props.children}
    <button onClick={toggleHide}>Cancel</button>
  </div>
  <div style={visibilityCloak}>
    <button onClick={toggleHide}>Create new blog</button>
  </div>
  </>;
};

export default Togglable;