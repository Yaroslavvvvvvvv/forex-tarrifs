import ErrorPage from '@/components/common/ErrorPage';

export default function Page500() {
  return (
    <ErrorPage
      code="500"
      title="Server error"
      message="Something went wrong on our side. Please try again later."
    />
  );
}
