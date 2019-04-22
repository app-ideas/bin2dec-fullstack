import React, { Component } from 'react';
class BinaryTextBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      binaryNumber: ''
    }
  }
  
  handleChange(evt) {
    if(evt.target.value!=''){
    const binaryNumber = (evt.target.validity.valid) ? evt.target.value : this.state.binaryNumber;
    console.log(binaryNumber);
    this.setState({ binaryNumber });
    this.props.onTextChange(binaryNumber);
  }
  else {
    const binaryNumber = ''
    this.setState({binaryNumber});
    this.props.onTextChange(binaryNumber);
  }
  }
  handleFormChange(attr, event){
    console.log(attr, (event.target.validity.valid) ? event.target.value : this.state.binaryNumber)
    if(event.target.value!=''){
    this.setState({
     [attr]: (event.target.validity.valid) ? event.target.value : this.state.binaryNumber
    });
      }
    }
   
  render() {
    return (
      <input type="text" 
        pattern="[0-1]*" 
        required = {this.props.required}
        maxLength={this.props.maxlength} 
        className={this.props.className} 
        onInput={this.handleChange.bind(this)} 
        value={this.state.binaryNumber}
        onChange={this.handleFormChange.bind(this, "value")} />
    )
  }
}
  
export default BinaryTextBox;