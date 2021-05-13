import logo from './logo.svg';
import './App.css';


window.onload = function() {
  const defaultLiffId = '1655976024-YbEzZbBX';
  initializeLiff(defaultLiffId);
};

function initializeLiff(myLiffId) {
  liff
  .init({
      liffId: myLiffId
  })
  .then(() => {
      liff.scanCode().then(result => {
          const stringifiedResult = result.value;
          liff.sendMessages([{
              'type': 'text',
              'text': stringifiedResult
          }]).then(() => {
              liff.closeWindow();
          }).catch((error) => {
              window.alert('Error sending message: ' + error);
          });
      }).catch(err => {
          window.alert('scanCode failed!');
      });
  })
  .catch((err) => {
      window.alert('Something went wrong with LIFF initialization.');
  });
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
