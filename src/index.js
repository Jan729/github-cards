import React from 'react'; //version 16.13.1 (can also use {React.version})
import ReactDOM from 'react-dom';
import './index.css';

const testData = [
    { name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook" },
    { name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu" },
    { name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook" },
];

//Learning Tip:
//function component for CardList
//holds the list of Cards
//{...testData} "spread" operator
//.map converts array of testData objects into array of Card elements
const CardList = (props) => (
    <div>
        {props.profiles.map(profile => <Card {...profile}/>)}

    </div>
);

//Card component for profile
class Card extends React.Component {
    render() {
        const profile = this.props;

        return (
            //Learning Tip:
            //"javascript inline 'style'" removes need for className and external style sheet
            //{{}} is object literal inside normal JSX syntax
            //camelCase css properties, strings for values
            //use either method when appropriate

            //javascript styles good for conditional styling
            
            <div className="github-profile" style={{ margin: '1rem'}}>
                <img src={profile.avatar_url} />
                <div className="info" style={{display: 'inline-block', marginLeft: 10}}>
                    <div className="name">{profile.name}</div>
                    <div className="company">{profile.company}</div>
                </div>
            </div>

        );
    }
}

//search for github user
//make username "required" before user can submit form
class Form extends React.Component {

    //userNameInput = React.createRef(); //ref is like a fancy ID
    //don't use ref, use state object instead

    state = { userName: '' };

    handleSubmit = (event) => {
        //prevent default form submission from refreshing page
        event.preventDefault();
        console.log(
            this.state.userName
        );
    }

    //use onChange to tell React when to take control
    //if you use value by default, React will control 100% of the time
    //event.target.value is the text that user typed
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    value={this.state.userName}
                    onChange={event => this.setState({ userName: event.target.value})}
                    placeholder="GitHub username"
                    required />
                <button >Add Profile Card</button>
            </form>
        );
    }
}

//highest level component
class App extends React.Component {

   //Learning Tip: DONT use constructor. too much typing
    /*
    constructor(props) {
        super(props);
        this.state = {
            profiles: testData,
        };
    }
    */

     //get state object. store profiles here
    //shorthand for constructor above. uses Babel
    //called Class field syntax
    state = {
        profiles: testData,
    };

    render() {
        return (
            <div>
                <div className="header">{this.props.title}</div>
                <Form/>
                <CardList profiles={this.state.profiles}/>

            </div>
            );
    }
}

ReactDOM.render(
    <App title="The GitHub Cards App" />,
    document.getElementById("root"),
);