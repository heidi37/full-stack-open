const Notification = ( { message, successStatusClass } ) => {
  return (
    <div>
      <p className={successStatusClass}>{message}</p>
    </div>
  )
}

export default Notification
