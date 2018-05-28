import React, {Component} from 'react';
import './App.css';


const contacts = [
    {
        id: 1,
        name: "Friends",
        type: "Group",
        contacts: [
            {id: 2, name: "Udi", type: "Contact"},
            {id: 3, name: "Tommy", type: "Contact"},
            {
                id: 6,
                name: "Old Friends",
                type: "Group",
                contacts: [
                    {id: 7, name: "Itay", type: "Contact"},
                ]
            },
        ]
    },
    {
        id: 4,
        name: "Family",
        type: "Group",
        contacts: [
            {id: 5, name: "Roni", type: "Contact"},
        ]
    },
    {id: 8, name: "Ori", type: "Contact"},
];


class ContactTree extends React.Component {
    constructor(props) {
        super(props);
        this.contacts = props.contacts;
        this.contactItems = this.contacts.map((contact) =>
            <ContactItem key={contact.id.toString()} contact={contact}/>
        );
    }

    render() {
        return (
            <ul className="app-contacts">{this.contactItems}</ul>
        );
    }
}

class ContactItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {contact: props.contact, expanded: false}
    }

    handleClick = (e) => {
        e.stopPropagation();

        if (this.state.contact.type !== 'Group') return false;

        this.setState(prevState => ({
            expanded: !prevState.expanded
        }))
    };

    render() {
        const contact = this.state.contact,
            expanded = this.state.expanded;

        return (
            <li className={`app-contact ${contact.type} ${expanded ? 'active' : '' }`}
                onClick={this.handleClick}>
                {contact.name}
                {contact.contacts && expanded ? <ContactTree contacts={contact.contacts}/> : ''}
            </li>
        )
    }
}


class App
    extends Component {
    render() {
        return (
            <div className="app">
                <header className="app-header">
                    <h1 className="app-title">Contact Tree</h1>
                </header>
                <section className="app-body">
                    <ContactTree contacts={contacts}/>
                </section>
            </div>
        );
    }
}

export default App;
