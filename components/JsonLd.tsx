import React from 'react';
import ReactDOM from 'react-dom';

interface JsonLdProps {
    data: Record<string, any>;
}

const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
    // We need a portal to render the script tag into the document head
    return ReactDOM.createPortal(
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />,
        document.head
    );
};

export default JsonLd;
