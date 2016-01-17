jest.dontMock('../Presenter');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Slide = require('../Slide').default;

let fixture = (history) => (
  <Presenter>
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
  </Presenter>
);

let renderFixture = (history) => TestUtils.renderIntoDocument( fixture(history) );

describe('Presenter', () => {
  let history, elements, node;

  let checkContentEquals = (content) =>
  expect(node.textContent).toEqual(content)

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
    let checkContentOnRoute = (route, content) => {
      return () => {
        history.push(route);
        checkContentEquals(content);
      }
    }

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

    let t = (name, path, content) => it(name, checkContentOnRoute(path, content))

    t('routes to first slide', '/', 'Luke')
    t('routes by index',       '/1', 'Vincent Vega')
    t('routes by indices',     '/1/1', 'Jules effing Winnfield')
    t('routes by name',        '/return-of-the-jedi/luke', 'Luke')
  });
});
