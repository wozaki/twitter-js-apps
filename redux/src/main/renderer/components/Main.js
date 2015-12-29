import React, { Component } from 'react';
import Tweets from './Tweets'
import Header from './header'

export default class Main extends Component {

    get title() {
        //TODO: list対応
        return 'Home';
    }

    render() {
        const {homeTimeline} = this.props;

        return (
            <main className="main">
                <Header title={this.title}/>
                <Tweets
                    tweets={homeTimeline}
                    />
            </main>
        );
    }
}
