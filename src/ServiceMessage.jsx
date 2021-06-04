import React, { useContext } from "react";
import { withRouter } from "react-router";
import axios from 'axios';

const ServiceMessage = ({ history }) => {

  function getServiveMessageList(accessToken){
    axios.get(`https://sm-php01.herokuapp.com/`)
    .then(res => {
      console.log(res.data)
      setMessages(res.data)
    })
  }

  const [messages, setMessages] = React.useState([])

  React.useEffect(() => {
    const messageList = getServiveMessageList()
  }, [])

  return (
    <div>
      <h1>ServiceMessage</h1>
      <table border="1">
        <tr>
          <th>id</th>
          <th>なまえ</th>
          <th>notification_token</th>
          <th>access_token</th>
          <th>後続メッセージを送る</th>
        </tr>
      { messages.map(item => {
          return <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.notificationToken}</td>
                <td>{item.accessToken}</td>
                <td><a href="#">送る</a></td>
              </tr>
        })
      }
      </table>
    </div>
  );
};

export default withRouter(ServiceMessage);