import { forwardRef, useImperativeHandle, useState } from 'react'
const Togglable = forwardRef((props, ref) => {
  const [hide, setHide] = useState(true)

  const invisibilityCloak = { display: hide ? 'none' : '' }
  const visibilityCloak = { display: !hide ? 'none' : '' }

  const toggleHide = () => {
    setHide(!hide)
  }

  useImperativeHandle(ref, () => ({toggleHide}))

  return <>
    <div style={invisibilityCloak}>
      {props.children}
      <button onClick={toggleHide}>Cancel</button>
    </div>
    <div style={visibilityCloak}>
      <button onClick={toggleHide}>Create new blog</button>
    </div>
  </>;
})

Togglable.displayName = 'Togglable'

export default Togglable;