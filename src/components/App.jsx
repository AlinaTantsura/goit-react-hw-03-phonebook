import { Component } from "react";
import Container from "./Container.styled";
import Contacts from "./Contacts/Contacts";
import Form from "./Form/Form";
import Filter from "./Filter/Filter";


export class App extends Component{
    state = {
         contacts: [],
        filter: '',
    }
    // state = {
    //     contacts: [
    //         {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    //         {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    //         {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    //         {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    //     ],
    //     filter: '',
    // }
  
    addNewContact = (obj) => {
        this.setState((prev) => { 
            const isExist = prev.contacts.find((item) => (item.name === obj.name));
            if (isExist) { 
                alert(`${obj.name} is already in your contacts`)
                return;
            }
         return prev.contacts.push(obj)
        })
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }
    handleDelete = (event) => {
        const liId = event.target.parentElement.id;
        this.setState((prev) => { 
         return {contacts: prev.contacts.filter((item) => (item.id !== liId))}
        })


    }
    
    render() {
        const filterContacts = this.state.contacts.filter(({ name }) => {
                return (name.toLowerCase().includes(this.state.filter.toLowerCase()));
        })
        return(
            <Container>
                <h1>Phonebook</h1>
                <Form addNewContact={this.addNewContact} />
           
                {this.state.contacts.length > 0 &&
                    <>
                    <h2>Contacts</h2>
                    <Filter inputInfo={this.state} handleChange={this.handleChange} />
                    <Contacts contacts={filterContacts} handleDelete={ this.handleDelete} />
                    </>
            }
            </Container>
        )
    }
}