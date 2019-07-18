import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import routes from '../routes';
import NoMatch from './layout/no-match';
import Header from './layout/header';
import Footer from './layout/footer';
import Left from './layout/left';
import Right from './layout/right';

import './App.css';

const App = () => (
  <Container fluid={true}>
    <Row>
      <Col lg="2"></Col>
      <Col lg="8">
        <Switch>
          {routes.map((route: any, index: any) => (
            <Route key={index} path={route.path} exact={route.exact} component={route.header} />
          ))}
          <Route component={Header} />
        </Switch>
      </Col>
      <Col lg="2"></Col>
    </Row>
    <Row>
      <Col xl="2" lg="3" sm="4">
        <Switch>
          {routes.map((route: any, index: any) => (
            <Route key={index} path={route.path} exact={route.exact} component={route.left} />
          ))}
          <Route component={Left} />
        </Switch>
      </Col>
      <Col xl="8" lg="7" sm="8">
        <TransitionGroup>
          <CSSTransition key={location.href} classNames="fade" timeout={300}>
            <Switch>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} exact={route.exact} component={route.main} />
              ))}
              <Route component={NoMatch} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </Col>
      <Col xl="2" lg="2" sm="0">
        <Switch>
          {routes.map((route: any, index: any) => (
            <Route key={index} path={route.path} exact={route.exact} component={route.right} />
          ))}
          <Route component={Right} />
        </Switch>
      </Col>
    </Row>

    <Row>
      <Col>
        <Switch>
          {routes.map((route:any, index: any) => (
            <Route key={index} path={route.path} exact={route.exact} component={route.footer} />
          ))}
          <Route component={Footer} />
        </Switch>
      </Col>
    </Row>
  </Container>
);

export default App;
