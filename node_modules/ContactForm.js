import React, { Component } from "react";
import axios from "axios";

class ContactForm extends Component {
    constructor(){
        super();
        this.state = {
            name: "",
            email: "",
            message: "",
            status: "Submit"
        };
    }

    changeHandler = e => {
        const field = e.target.id;
        if (field === "name") {
            this.setState({
                name: e.target.value
            })
        } else if (field === "email") {
            this.setState({
                email: e.target.value
            })
        } else if (field === "message") {
            this.setState({
                message: e.target.value
            })
        }
    }

    submitHandler = e => {
        e.preventDefault();
        this.setState({
            status: "Sending"
        });
        axios({
            method: "POST",
            url: "http://localHost:5000/contact",
            data: this.state,
        })
        .then((res) => {
            if (res.data.status === "sent") {
                alert("Message Has Been Sent");
                this.setState({
                    name: "",
                    email: "",
                    message: "",
                    status: "Submit"
                });
            } else if (res.data.status === "failed") {
                alert("Message Could Not Be Sent")
            }
        })
    }

    render() {
        let buttonText = this.state.status;
        return (
            <form onSubmit={this.submitHandler.bind(this)} method="POST">
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value="{this.state.name"
                        onChange={this.changeHandler.bind(this)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={this.state.email}
                        onChange={this.changeHandler.bind(this)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        value={this.state.message}
                        onChange={this.changeHandler.bind(this)}
                        required
                    />
                </div>
                <button type="submit">{buttonText}</button>
            </form>
        );
    }
}

export default ContactForm;