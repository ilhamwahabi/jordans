import React from "react";
import ContentLoader from "react-content-loader";

export const AllJobSkeletonViewDesktop = () => (
  <ContentLoader
    speed={1}
    width="100%"
    height={120}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="20" rx="3" ry="3" width="50%" height="19" />
    <rect x="0" y="60" rx="3" ry="3" width="30%" height="19" />
    <rect x="86%" y="30" rx="3" ry="3" width="14%" height="50" />
  </ContentLoader>
);

export const AllJobSkeletonViewMobile = () => (
  <ContentLoader
    speed={1}
    width="100%"
    height={150}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="20" rx="3" ry="3" width="75%" height="19" />
    <rect x="0" y="55" rx="3" ry="3" width="50%" height="19" />
    <rect x="0" y="90" rx="3" ry="3" width="100%" height="48" />
  </ContentLoader>
);

export const JobDetailSkeletonView = () => (
  <ContentLoader
    speed={1}
    width="100%"
    height={260}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="20" rx="3" ry="3" width="80%" height="19" />
    <rect x="0" y="60" rx="3" ry="3" width="25%" height="19" />
    <rect x="0" y="100" rx="3" ry="3" width="50%" height="19" />
    <rect x="0" y="140" rx="3" ry="3" width="100%" height="19" />
    <rect x="0" y="180" rx="3" ry="3" width="100%" height="19" />
    <rect x="0" y="220" rx="3" ry="3" width="100%" height="19" />
  </ContentLoader>
);
