import logo from './logo.svg';
import './App.css';
import liff from '@line/liff';

window.onload = function() {
  const defaultLiffId = "1655976024-YbEzZbBX";
  initializeLiff(defaultLiffId);
};

function initializeLiff(myLiffId) {
  
  liff
  .init({
      liffId: "1655976024-YbEzZbBX"
  })
  .then(() => {
    if (liff.isLoggedIn()) {
      window.alert('ログインしています')
    } else {
      window.alert('ログアウト')
    }
  })
  .catch((err) => {
      window.alert('Something went wrong with LIFF initialization.');
  });
}

function App() {
  return (
    <div className="App">
      あああ
    </div>
  );
}

export default App;
