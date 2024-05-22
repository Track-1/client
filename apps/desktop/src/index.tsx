import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

async function enableMocking() {
  const { worker } = await import('../src/api/mocks/browser');

  return worker.start();
}

enableMocking().then(() => {
  root.render(<App />);
});
