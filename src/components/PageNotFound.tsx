import { FunctionComponent } from "react";

interface PageNotFoundProps {}

const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
  return (
    <>
      <h1 className="display-1 text-center">404 - Page Not Found</h1>
    </>
  );
};

export default PageNotFound;
