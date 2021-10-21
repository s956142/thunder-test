import React, { Suspense } from 'react';
import { Switch, Route, useLocation,Redirect } from 'react-router-dom';
import { LoadingView } from '~/components/LoadingView';
import { RouteList } from '~/routers/RouteConfig';
/** 最上層的router，統合所有路由 */
const MainRoute = () => {
    const location = useLocation();

    return (
        <Suspense fallback={<LoadingView />}>
            <Switch>
                {RouteList.map((route, index) => (<Route exact={route.exact} key={`route_${index}`} component={route.component} path={route.path} />))}
            </Switch>
        </Suspense>
    )
};

export default MainRoute;