import React from 'react';
import { Route, Switch } from 'react-router-dom';
import _ from 'lodash';

const BaseRouteComponent = (props) => {
  let url = '';
  if (props.match) {
    url = `${props.match.url}/`;
  }

  const routeWithSubRoutes = route => (
    <Route
      key={route.path}
      exact={route.exact || false}
      path={`${url}${route.path}`}
      render={childProps => (
        // Pass the sub-routes down to keep nesting
        <route.component {...childProps} routes={route.routes || []} routeProps={route.routeProps} onMount={props.onMount} matchedRoutes={props.matchedRoutes} />
      )}
    />
  );

  return (
    <Switch>
      {props.routes.map(route => routeWithSubRoutes(route))}
    </Switch>
  );
};

export default BaseRouteComponent;