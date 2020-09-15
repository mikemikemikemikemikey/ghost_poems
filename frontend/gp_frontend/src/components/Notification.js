import React from 'react'

const Notification = ({ message }) => {
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    paddingBottom: 14,
    marginTop: 8,
    marginBottom: 0,
  }

  if (!message.error) errorStyle.color = 'green'
  if (message.message === null) {
    return null
  }

  return (
    <div style={errorStyle} className="error" data-cy='message'>
      {message.message}
    </div>
  )
}

export default Notification
