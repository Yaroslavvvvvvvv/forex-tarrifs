import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import './index.scss';

interface ErrorPageProps {
  code: string;
  title: string;
  message?: string;
}

export default function ErrorPage({ code, title, message }: ErrorPageProps) {
  return (
    <div className="error-page">
      <div className="app-container">
        <p className="error-page__code">{code}</p>
        <h1 className="error-page__title">{title}</h1>
        {message && <p className="error-page__message">{message}</p>}
        <Link to="/">
          <Button label="Go home" icon="pi pi-home" />
        </Link>
      </div>
    </div>
  );
}
