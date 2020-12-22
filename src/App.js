import React from "react"
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import { Navbar, Nav, NavItem, NavDropdown, Container, Col, Row, Button, Form, FormControl } from 'react-bootstrap';



class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mCountry: null,
            mCases: 0,
            mDeath: 0,
            city: "",
            spreadDate: null

        }
        
                this.handleFetch = this.handleFetch.bind(this)
                this.handleChange = this.handleChange.bind(this)
                this.handleChangeForDate = this.handleChangeForDate.bind(this)
                
       

    }
    handleChange(event) {
        var string = event.target.value ; 
        var res =  string.charAt(0).toUpperCase() + string.slice(1)
        
        this.setState({ city:  res });
    }
    handleChangeForDate(event) {
        this.setState({ spreadDate: event.target.value });
    }
    async handleFetch() {
        var xx = {}


        await fetch("https://api.covid19api.com/total/dayone/country/" + this.state.city + "/status/confirmed", {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(response => response.json())
            .then(data => {

                xx.mCountry = data[this.state.spreadDate].Country
                xx.mCases = data[this.state.spreadDate].Cases



            });

        this.setState({
            mCountry: xx.mCountry,
            mCases: xx.mCases,



        })
        var dd = {}
        await fetch("https://api.covid19api.com/summary", {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
        )


            .then(response => response.json())
            .then(data => {

                for (let i = 0; i < 192; i++) {
                    if (this.state.city === data.Countries[i].Country) {
                        dd.mDeath = data.Countries[i].TotalDeaths


                    } else if (("Usa" || "USA" || "usa") === (this.state.city)) {
                        dd.mDeath = data.Countries[182].TotalDeaths

                    }

                }



            })

        this.setState({
            mDeath: dd.mDeath


        })



    }
    render() {

        return (

            <div className="app">
            <div className="grid-container">
                <Navbar bg="light" expand="lg" className="nav-item">
                    <Navbar.Brand href="#home" className="title">Deaths And Cases Statistics For COVID-19</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto"></Nav>
                        <Form inline>
                            <NavDropdown title="Contact Us" id="basic-nav-dropdown">
                                <NavDropdown.Item href="https://www.facebook.com/nabil.ball.739" target="_blank">Facebook</NavDropdown.Item>
                                <NavDropdown.Item href="https://twitter.com/MerouaneElamine" target="_blank">Twitter</NavDropdown.Item>
                                <NavDropdown.Item href="https://github.com/merouane2000" target="_blank">GitHub</NavDropdown.Item>
                            </NavDropdown>

                        </Form>
                    </Navbar.Collapse>
                </Navbar>
                <Container fluid="md sm xs" className="li1-item d-flex flex-row justify-content-between md sm xs ">


                    <div className="d-flex justify-content-center align-items-center w-25">
                        <ul class="list-group list-group-flush ">
                            <li class="list-group-item"> <h5>Cases In {this.state.mCountry} At The Day {this.state.spreadDate} :</h5>
                            <h1 className="d-flex justify-content-center">{this.state.mCases}</h1>
                            </li>
                        </ul>
                    </div>


                    <div class="vl"></div>

                    <div className="main-item d-flex justify-content-center w-50">
                        <div className="d-flex align-items-center">
                            <div class="input-group">

                                <div className="d-flex flex-column align-items-center">
                                    <br></br>
                                    <h1>Select the Country :</h1>
                                    <FormControl type="text" value={this.state.city} onChange={this.handleChange} placeholder="Slecte a Country" className="mr-sm-2" />
                                    <br></br>
                                    <h1>Select a Day :</h1>
                                    <FormControl type="text" value={this.state.spreadDate} onChange={this.handleChangeForDate} placeholder="Slecte a Day" className="mr-sm-2" />
                                    <br></br>
                                    <Button variant="outline-primary" onClick={this.handleFetch}>Search</Button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="vl"></div>

                    <div className="li2-item d-flex justify-content-center align-items-center w-25">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"> <h5>Total Deaths In {this.state.mCountry} :</h5>
                            <h1 className="d-flex justify-content-center">{this.state.mDeath}</h1>
                            </li>
                        </ul>
                    </div>

                </Container>
                <br></br>  
                
            
       
                <Container fluid="md sm xs" className="none d-flex flex-column justify-content-between alert alert-danger md sm xs" role="alert">

                    <div className="d-flex justify-content-center">

                        <h1>Wear a mask Save lives </h1>
                    </div>

                    <div className="d-flex justify-content-center">
                        <h2>Wear a mask </h2>
                    </div>


                    <div className="d-flex justify-content-center">
                        <h2> Clean your hands</h2>
                    </div>


                    <div className="d-flex justify-content-center">

                        <h2> Keep a safe distance</h2>

                    </div>


                </Container>  
                </div>
    </div>
        )

    }



}
export default App