import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader: React.FC = () => (
    <ContentLoader
        speed={2}
        width={300}
        height={532}
        viewBox="0 0 300 532"
        backgroundColor="#6D91AC"
        foregroundColor="#749CB5"
    >
        <rect x="25" y="10" rx="0" ry="0" width="250" height="350" />
        <rect x="10" y="375" rx="0" ry="0" width="110" height="25" />
        <rect x="10" y="413" rx="0" ry="0" width="280" height="70" />
        <rect x="10" y="495" rx="0" ry="0" width="150" height="25" />
        <rect x="296" y="0" rx="0" ry="0" width="4" height="532" />
        <rect x="0" y="0" rx="0" ry="0" width="4" height="532" />
        <rect x="0" y="528" rx="0" ry="0" width="300" height="4" />
        <rect x="0" y="0" rx="0" ry="0" width="300" height="4" />
    </ContentLoader>
);

export default MyLoader;
