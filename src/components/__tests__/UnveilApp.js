jest.dontMock('../UnveilApp');
jest.dontMock('../Slide');
jest.dontMock('../../helpers/History');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const UnveilApp = require('../UnveilApp').default;
const Slide = require('../Slide').default;
const history = require('../../helpers/History').default;

let fixture = () => (
    <UnveilApp>
        <slide key="0">
            <slide key="0">First</slide>
        </slide>
        <slide key="1">
            <slide key="0">
                Second
            </slide>
            <slide key="1">
                Third
            </slide>
        </slide>
    </UnveilApp>
);

describe('UnveilApp', () => {

    it('renders the first slide', () => {
        let unveil = TestUtils.renderIntoDocument(fixture());
        let unveilNode = ReactDOM.findDOMNode(unveil);
        expect(unveilNode.textContent).toEqual('First');
    }),

    it('renders the first subslide', () => {
        let unveil = TestUtils.renderIntoDocument(fixture());
        let unveilNode = ReactDOM.findDOMNode(unveil);
        expect(unveilNode.textContent).toEqual('First');
    }),

    it('renders slide according to path', () => {
        history.push('/1');
        let unveil = TestUtils.renderIntoDocument(fixture());
        let unveilNode = ReactDOM.findDOMNode(unveil);
        expect(unveilNode.textContent).toEqual('Second');
    }),

    it('renders subslide according to path', () => {
        history.push('/1/1');
        let unveil = TestUtils.renderIntoDocument(fixture());
        let unveilNode = ReactDOM.findDOMNode(unveil);
        expect(unveilNode.textContent).toEqual('Third');
    });

});
