jest.dontMock('../UnveilApp');
jest.dontMock('../Slide');
jest.dontMock('../../helpers/History');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const UnveilApp = require('../UnveilApp').default;
const Slide = require('../Slide').default;
const createHistory = require('history/lib/createHashHistory');

let fixture = (history) => (
  <UnveilApp history={history}>
    <Slide key="0" name="return-of-the-jedi">
      Luke
    </Slide>
    <Slide key="1" name="pulp-fiction">
      <Slide name="vincent-vega">
        Vincent Vega
      </Slide>
      <Slide name="jules">
        Jules effing Winnfield
      </Slide>
      <Slide>
        Marsellus Wallace
      </Slide>
    </Slide>
    <Slide key="2">
      <h1>One</h1>
      <p> What happens here? </p>
      <code> Some codez </code>
    </Slide>
    <Slide key="3">
      <Slide><h1>Heading</h1></Slide>
      <Slide name="donnie-darko"><h1>Donnie Darko</h1></Slide>
    </Slide>
  </UnveilApp>
);

let renderFixture = (history) => TestUtils.renderIntoDocument( fixture(history) );


describe('UnveilApp', () => {
  let history, elements, node;

  let checkContentEquals = (assertion) => {

  beforeEach( () => {
    history = createHistory({ queryKey: false });
    elements = renderFixture(history);
    node = ReactDOM.findDOMNode(elements);
  });

  afterEach( () => {
    // please destroy elements and node here
    elements = node = null;
  });

  describe("Rendering", () => {
    it('renders html slide', () => {
      history.push('/2');
      let children = node.children[0].children;
      expect(children.length).toEqual(3);
      expect(children[0].textContent).toEqual('One');
    });

    it('renders html sub slide', () => {
      history.push('/3/1');
      let children = node.children[0].children;
      expect(children[0].tagName.toLowerCase()).toEqual('h1');
      expect(children[0].textContent).toEqual('Donnie Darko');
    });
  });

  describe("Routing", () => {
    let checkContentOnRoute = (route, content) => {
      return () => {
        history.push(route);
        checkContentEquals(content);
      }
    }

    let checkPath = (route, path) => {
      return () => {
        history.push(route);
        let unlisten = history.listen((location) => {
          expect(location.pathname).toEqual(path);
        });
        unlisten();
      };
    }

    it('routes to first slide', checkContentOnRoute('/', 'Luke'))
    it('routes by index',       checkContentOnRoute('/1', 'Vincent Vega'))
    it('routes by indices',     checkContentOnRoute('/1/1', 'Jules effing Winnfield'))
    it('routes by name',        checkContentOnRoute('/return-of-the-jedi/luke', 'Luke'))

    describe("Index to Name remapping", () => {
      it('routes from index to name', checkPath('/0', '/return-of-the-jedi'));
      it('routes from index to default subindex name', checkPath('/1', '/pulp-fiction/vincent-vega'))
      it('routes from subindex to name', checkPath('/3/1', '/3/donnie-darko'));
      it('does not reroute if no nameis available for index', checkPath('/2', '/2'))
      it('does not reroute if no name is available for subindex', checkPath('/3/0', '/3/0'))
    });

    describe("Fallbacks", () => {
      it('fallbacks to first slide if slide index not found', checkPath('/7', '/return-of-the-jedi'))
      it('fallbacks to first slide if slide name not found',  checkPath('/whatever', '/return-of-the-jedi'))
      it('fallbacks to first subslide if subslide not found', checkPath('/pulp-fiction/mia-wallace', '/pulp-fiction/vincent-vega'))
      it('fallbacks to slide if no subslides', checkPath('/2/not-found', '/2'))
    });

  });

});
