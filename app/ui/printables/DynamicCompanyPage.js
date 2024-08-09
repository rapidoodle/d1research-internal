import { forwardRef } from "react";

export const DynamicCompanyPage = forwardRef((props, ref) => (
    <div ref={ref} style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
        <h1>Printable Content</h1>
        <p>This content will be printed using react-to-print.</p>
    </div>
));


