import React, {Component} from 'react';
import axios from 'axios';
import {saveAs} from 'file-saver';
import './App.css';

class App extends Component {

  constructor(props){
    super(props)
    this.state={
      name : '',
      receiptId : 0,
      price1 : 0,
      price2 : 0
    }
  }  

  handlechange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  downloadPdf = () => {
    console.log('downloadPdf')
    axios.post('/create-pdf',this.state)
    .then(() => 
      axios.get('fetch-pdf', {responseType : 'blob'}))
      .then((res) => {
        const pdfBlob = new Blob([res.data], {type : 'application/pdf'})
        saveAs(pdfBlob, 'newPdf.pdf')
      })
    
  }

  render(){
  return (
    <div className="App">
        <input type="text" name="name" placeholder="enter name" onChange={(e) => this.handlechange(e)}/>
        <input type="number" name="receiptId" placeholder="enter number" onChange={(e) => this.handlechange(e)}/>
        <input type="number" name="price1" placeholder="enter number" onChange={(e) => this.handlechange(e)}/>
        <input type="number" name="price2" placeholder="enter number" onChange={(e) => this.handlechange(e)}/>
        <button onClick={() => this.downloadPdf()}>
          Download PDF
        </button>
    </div>
  );  
  }
  
}

export default App;
