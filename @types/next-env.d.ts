/// <reference types="next" />
/// <reference types="next/types/global" />
declare module '*css';
declare module '*scss';

declare module '*.svg' {
    import React = require('react');
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    // const src: string;
    export default ReactComponent;
}
