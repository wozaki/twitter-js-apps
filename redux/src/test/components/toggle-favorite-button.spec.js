import expect from 'expect'
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);
import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-addons-test-utils'
import sinon from 'sinon'
import mockDom from '../mock-dom'
import ToggleFavoriteButton from '../../main/renderer/components/ToggleFavoriteButton'

function render(isFavorited, toggleFavorite) {
    function toElement(props) {
        let renderer = ReactTestUtils.createRenderer();
        renderer.render(<ToggleFavoriteButton {...props} />);
        return renderer.getRenderOutput();
    }

    return _render(isFavorited, toggleFavorite, toElement)

}

function renderInDocument(isFavorited, toggleFavorite) {
    function toElement(props) {
        return ReactDOM.findDOMNode(
            ReactTestUtils.renderIntoDocument(
                <ToggleFavoriteButton {...props} />
            )
        );
    }

    return _render(isFavorited, toggleFavorite, toElement)
}

function _render(isFavorited, toggleFavorite, toElement) {
    let props = {
        isFavorited: isFavorited,
        toggleFavorite: toggleFavorite
    };

    let element = toElement(props);

    return {
        props,
        element
    }
}

describe('ToggleFavoriteButton', () => {
    it('should render unfavorite button if isFavorite is true', () => {
        const isFavorite = true;
        const toggleFavorite = () => {
        };
        const { element } = render(isFavorite, toggleFavorite);

        const expectedElement = (
            <i className="fa fa-star tweet-button-unfavorite"
               onClick={toggleFavorite}/>
        );

        expect(element).toEqualJSX(expectedElement);
    });

    it('should render favorite button if isFavorite is false', () => {
        const isFavorite = false;
        const toggleFavorite = () => {
        };
        const { element } = render(isFavorite, toggleFavorite);

        const expectedElement = (
            <i className="fa fa-star tweet-button-favorite"
               onClick={toggleFavorite}/>
        );

        expect(element).toEqualJSX(expectedElement);
    });

    describe('should invoke toggleFavorite with', () => {
        const isFavoriteds = [true, false];
        isFavoriteds.forEach(isFavorited => {
            it(`${isFavorited}`, () => {
                const toggleFavorite = sinon.spy();
                const { element } = renderInDocument(isFavorited, toggleFavorite);

                ReactTestUtils.Simulate.click(element);
                expect(toggleFavorite.withArgs(isFavorited).callCount).toBe(1);
            });
        });
    });

});
