import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col,Form,Button,Jumbotron } from 'react-bootstrap'
import BinaryTextBox from './Components/BinaryTextBox'
import Header from './Components/Header'
class App extends Component {
  constructor(...args) {
    super(...args);

    this.state = { validated: false,
                   binarytext: '' ,
                   decimalval : ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlebinaryinputchange = this.handlebinaryinputchange.bind(this);
  }
  handlebinaryinputchange(binaryval)
  {
    this.setState({binarytext: binaryval});
  }
  handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.setState({ validated: true });
    if(this.state.binarytext != ''){
      this.convert_to_dec_using_api();
    }
    else{
      this.setState({decimalval : ''});
    }
    
    console.log(this.state.binarytext);
    event.preventDefault();
  }

  // our first get method that uses our backend api to 
  // fetch data from our data base
  convert_to_dec_using_api = () => {
    fetch("http://localhost:3001/api/converttodec/?binary=" + this.state.binarytext)
      .then(data => data.json())
      .then(res => this.setState({ decimalval: res.data }));
  };
  render() {
    const { validated } = this.state;
    return (
      <div className="App">
        <Header></Header>
        <Container>
        <Jumbotron>
          <Form
          noValidate
          validated={validated}
          onSubmit={e => this.handleSubmit(e)}>
            <Form.Row>
                <Form.Group as={Col} md="3" controlId="formBinary">
                  <Form.Label>Binary</Form.Label>
                  <BinaryTextBox className="form-control" required={true} onTextChange={this.handlebinaryinputchange} value={this.state.binarytext} maxlength={8} ></BinaryTextBox>
                </Form.Group>          
            </Form.Row>
            <Form.Row>
            <Button type="submit" size="sm">Convert</Button>
            </Form.Row>
            <Form.Row>
            <Form.Group as={Col} md="3" controlId="formBinary">
                  <Form.Label>Decimal</Form.Label>
                  <Form.Control type="text" placeholder="Decimal Value" readOnly value={this.state.decimalval}></Form.Control>
                </Form.Group>   
            </Form.Row>
            
          </Form>
          </Jumbotron>
        </Container>
      </div>
    );
  }
}

export default App;
