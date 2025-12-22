import { useEffect } from "react";

const useTitle = (pageTitle) => {
  useEffect(() => {
    const baseTitle = "InfraFix";
    document.title = pageTitle ? `${pageTitle} | ${baseTitle}` : baseTitle;
  }, [pageTitle]);
};

export default useTitle;
