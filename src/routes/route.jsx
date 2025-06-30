import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RouteConfig from '@/routes/route-config'

const wrapWith = (element, wrappers = []) =>
    wrappers.reduceRight((acc, Wrapper) => React.cloneElement(Wrapper, {}, acc), element);


const AppRoutes = () => {
    return (
        <Routes>
            {RouteConfig.map(({ path, element, wrappers }) => {
                const wrappedElement = wrapWith(element, wrappers);
                return <Route key={path} path={path} element={wrappedElement} />;
            })}
        </Routes>
    );

}

export default AppRoutes