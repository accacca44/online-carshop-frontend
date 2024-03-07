import { createRoot } from 'react-dom/client';
import App from './components/App';
import './i18n';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Could not find root element.');
}

createRoot(root).render(<App />);
