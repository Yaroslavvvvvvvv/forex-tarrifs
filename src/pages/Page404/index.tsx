import ErrorPage from '@/components/common/ErrorPage';

export default function Page404() {
  return (
    <ErrorPage
      code="404"
      title="Page not found"
      message="The page you are looking for doesn’t exist or was moved."
    />
  );
}
