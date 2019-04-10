import React, { Component } from 'react';
import {Switch, Route}from 'react-router-dom';
import $ from 'jquery';

class Detail extends Component{
constructor(props)
{super(props)
this.state={go:true,data:[]}


}



  componentDidMount(){

    console.log("mount")
    $.ajax({
          url:"http://demo9197058.mockable.io/users",
          dataType: 'json',
          cache: false,
          success: (data) => {
      let result=   data.find((report)=>{
           return this.props.match.params.id==report.id
         })
            this.setState({data: result});
          }
          });

  }





  render(){

return(



<div>
<strong><h3>{this.state.data.first_name}</h3></strong>
<table class="table">
  <thead>
    <tr>
      <th  id="cl" scope="col"></th>
        <th scope="col"></th>

        </tr>
  </thead>
  <tbody>




  <tr>
  <h4> <td>Last_Name</td></h4>
    <td>
<h4>{this.state.data.last_name}</h4>
 </td>
  </tr>
  <tr>   <td><h4>City</h4></td>
     <td>
<h4>{this.state.data.city}</h4>
 </td>
  </tr>
    <tr>
     <td><h4>Company_Name</h4></td>
      <td>
<h4>{this.state.data.company_name}</h4>
 </td>
  </tr>
    <tr>
    <td><h4>State</h4></td>
      <td>
<h4>{this.state.data.state}</h4>
 </td>
  </tr>
    <tr>
    <td><h4>Age</h4></td>
    <td>
<h4>{this.state.data.age}</h4>
</td>
  </tr>
    <tr>
    <td><h4>Id</h4></td>
    <td>
<h4>{this.state.data.id}</h4>
</td>
  </tr>
</tbody>
</table>
</div>


);



  }
}


export default Detail;
