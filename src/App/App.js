import React, {Component} from 'react';
import logo from './logo.svg';
import EditEnhancer from "../Enhancers/Edit";
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            standardValue: "standard",
            enhancedValue: "enhanced",
            nestedObject: {
                anotherNestedObject: {
                    value: "Deep value",
                }
            }
        };

        this.editable = new EditEnhancer(this);
    }

    onStandardFieldChange = (e) => {
        this.setState({standardValue: e.target.value})
    };

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Edit Enhancer example</h2>
                </div>
                <div className="App-content">

                    <p className="App-intro">
                        This enhancer aims to remove the need to create onChange functions for all interactive
                        components
                        (Text fields, Check boxes, etc)
                    </p>
                    <div>
                        <p>Standard way to edit a text field</p>
                        <input
                            type="text"
                            value={this.state.standardValue}
                            onChange={this.onStandardFieldChange}
                        />
                    </div>

                    <div>
                        <p>Enhanced way to edit a text field</p>
                        <input
                            type="text"
                            value={this.editable.getCurrentValue("enhancedValue")}
                            onChange={(e) => this.editable.setByField("enhancedValue", e.target.value)}
                        />
                    </div>

                    <div>
                        <p>Enhanced way to edit a deeply nested object</p>
                        <input
                            type="text"
                            value={this.editable.getCurrentValue("nestedObject").anotherNestedObject.value}
                            onChange={(e) => this.editable
                                .setByPath("nestedObject", "anotherNestedObject.value", e.target.value)}
                        />
                    </div>

                    <hr />
                    <div>
                        <p>Current State</p>
                        <pre>{JSON.stringify(this.state, null, 4)}</pre>
                    </div>

                    <hr />
                    <a href="https://github.com/facebookincubator/create-react-app">
                        Created using the Create React App package
                    </a>
                </div>
            </div>
        );
    }
}

export default App;
