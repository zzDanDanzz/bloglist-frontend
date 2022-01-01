import Message from "./Message";

const Notif = ({ msg }) => {
  const border = {
    backgroundColor: '#D3D3D3',
    padding: '10px',
    borderStyle: 'groove',
    borderRadius: '10px',
    marginBottom: '10px'
  }
  const redStyle = {
    ...border,
    borderColor: 'red',
    color: "red",
  };
  const greenStyle = {
    ...border,
    borderColor: 'green',
    color: "green",
  };


  if (!msg.content) {
    return <></>
  }

  return msg.color === 'red'
    ? <Message style={redStyle} content={msg.content} />
    : <Message style={greenStyle} content={msg.content} />
};

export default Notif;