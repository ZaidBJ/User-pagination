import React, { Component } from 'react';
import {Link } from 'react-router-dom'
import './App.css';
import $ from 'jquery';
var current_data;
var num=[];
var first_name_count=0;
var last_name_count=0;
var company_name_count=0;
var city_count=0;
var state_count=0;
var age_count=0;
var id_count=0;






class App extends Component {

  constructor(){

super()
    this.state={error:false,name:"",data:[],current:[],page:0,next:0,page_count:0,id:0,go:false,sort_first_name:false,sort_last_name:false,sort_company_name:false,sort_city:false,sort_state:false,sort_age:false,sort_id:false};
this.update=this.update.bind(this);
  }

RemoveFilter(){
  let arr=this.state.data.slice(this.state.page,this.state.page+5);
  this.setState({current:arr,error:false})
}

componentDidUpdate(){
  let buttons =document.getElementsByClassName('classbtn');
  for(var k=0;k<buttons.length;k++)
  buttons[k].classList.remove("btn-primary")
let i=this.state.id;
let obj=  document.getElementById(i);
  if(obj!=null)
obj.classList.add("btn-primary");

}

update(arb){

  arb.sort(function(a, b){return (a.first_name).localeCompare(b.first_name)});
  let  array=arb.slice(this.state.page,this.state.page+5);
this.setState({data:arb,current:array,sort_first_name:true,sort_last_name:false,sort_company_name:false,sort_city:false,sort_state:false,sort_age:false,sort_id:false})


}


  componentDidMount(){
    console.log("mount")
    $.ajax({
          url:"http://demo9197058.mockable.io/users",
          dataType: 'json',
          cache: false,
          success: (data) => {
           current_data=data.slice(this.state.page,this.state.page+5);
          num= data.slice(0,10);
            this.setState({data: data,current:current_data,error:false});
          }
          });

  }

search(){
let result=this.state.data.find((record)=>{
  return record.first_name==this.state.name
})
if(result)
this.setState({current:[result],error:false})
else {
  this.setState({current:[],error:true})
}


}

  page_change(){
    var  page_no = this.state.page+5;
    var pg=this.state.page_count+1;

    current_data=this.state.data.slice(page_no,page_no+5);
    if( (this.state.page_count%9==0+parseInt(this.state.page_count/9)-1) && !(this.state.page_count==0))
    this.setState((prevState)=>{
      return {page:page_no,current:current_data,next:prevState.next+10,page_count:pg,id:prevState.id+1,error:false}
    })
    else {
      this.setState((prevState)=>{
        return {page:page_no,current:current_data,page_count:pg,id:prevState.id+1,error:false}
      });
    }
  }

last(){

  let pg=499;
  let  current_data=this.state.data.slice(pg,pg+5);
  this.setState({current:current_data})
}


    page_change_back(){
      var  page_no = this.state.page-5;
        var pg=this.state.page_count-1;
      current_data=this.state.data.slice(page_no,page_no+5);

      if((this.state.page_count%9==0+parseInt(this.state.page_count/9)) && !(this.state.page_count==0))
      this.setState((prevState)=>{
        return {page:page_no,current:current_data,next:prevState.next-10,page_count:pg,id:prevState.id-1,error:false}
      })
   else{
      this.setState((prevState)=>{
        if(this.state.page>0)
        return {page:page_no,current:current_data,page_count:pg,id:prevState.id-1,error:false}
      });}

    }

page_jump(i){
  var  page_no = i*5;
    var pg=i;
  current_data=this.state.data.slice(page_no,page_no+5);




  this.setState((prevState)=>{
    return {page:page_no,current:current_data,id:i,page_count:pg,error:false}
  })
}



handleClick(e){

  this.setState({name:e.target.value})
}







///////////////////////////////////////////////////////////

sort(header)
{
  var arb=this.state.data;

  if(header=="first")
  {first_name_count+=1;
  if(first_name_count%2==1){
    let d=document.getElementsByClassName("head");
for(var i=0;i<d.length;i++)
d[i].classList.remove("btn-info")

    document.getElementById("first").classList.add("btn-info");


   last_name_count=0;
     company_name_count=0;
     city_count=0;
     state_count=0;
     age_count=0;
     id_count=0;



this.update(arb)


}
else{


  let d=document.getElementsByClassName("head");
for(var i=0;i<d.length;i++)
d[i].classList.remove("btn-info")
arb.sort(function(a, b){return a.id-b.id});
  let  array=arb.slice(this.state.page,this.state.page+5);
this.setState({data:arb,current:array,sort_first_name:false,sort_last_name:false,sort_company_name:false,sort_city:false,sort_state:false,sort_age:false,sort_id:true})


}
}
else
if(header=="last")
{last_name_count+=1;
if(last_name_count%2==1){
  let d=document.getElementsByClassName("head");
for(var i=0;i<d.length;i++)
d[i].classList.remove("btn-info")

  document.getElementById("last").classList.add("btn-info");

   first_name_count=0;

   company_name_count=0;
   city_count=0;
  state_count=0;
   age_count=0;
   id_count=0;



    arb.sort(function(a, b){return (a.last_name).localeCompare(b.last_name)});
      let  array=arb.slice(this.state.page,this.state.page+5);
this.setState({data:arb,current:array,sort_first_name:false,sort_last_name:true,sort_company_name:false,sort_city:false,sort_state:false,sort_age:false,sort_id:false})
}
else
{


/////
let d=document.getElementsByClassName("head");
for(var i=0;i<d.length;i++)
d[i].classList.remove("btn-info")

arb.sort(function(a, b){return a.id-b.id});
  let  array=arb.slice(this.state.page,this.state.page+5);
this.setState({data:arb,current:array,sort_first_name:false,sort_last_name:false,sort_company_name:false,sort_city:false,sort_state:false,sort_age:false,sort_id:true})

}


}
else
if(header=="company")

{

  company_name_count+=1;
if(company_name_count%2==1){
  let d=document.getElementsByClassName("head");
  for(var i=0;i<d.length;i++)
  d[i].classList.remove("btn-info")

    document.getElementById("company").classList.add("btn-info");
   first_name_count=0;
   last_name_count=0;

   city_count=0;
   state_count=0;
   age_count=0;
   id_count=0;

    arb.sort(function(a, b){return (a.company_name).localeCompare(b.company_name)});
      let  array=arb.slice(this.state.page,this.state.page+5);
this.setState({data:arb,current:array,sort_first_name:false,sort_last_name:false,sort_company_name:true,sort_city:false,sort_state:false,sort_age:false,sort_id:false})
}
else{


  let d=document.getElementsByClassName("head");
for(var i=0;i<d.length;i++)
d[i].classList.remove("btn-info")
arb.sort(function(a, b){return a.id-b.id});
  let  array=arb.slice(this.state.page,this.state.page+5);
this.setState({data:arb,current:array,sort_first_name:false,sort_last_name:false,sort_company_name:false,sort_city:false,sort_state:false,sort_age:false,sort_id:true})
}


}
else
if(header=="city")
{city_count+=1;
if(city_count%2==1){
let d=document.getElementsByClassName("head");
for(var i=0;i<d.length;i++)
d[i].classList.remove("btn-info")
  document.getElementById("city").classList.add("btn-info");

  first_name_count=0;
   last_name_count=0;
   company_name_count=0;

   state_count=0;
   age_count=0;
   id_count=0;

    arb.sort(function(a, b){return (a.city).localeCompare(b.city)});
      let  array=arb.slice(this.state.page,this.state.page+5);
this.setState({data:arb,current:array,sort_first_name:false,sort_last_name:false,sort_company_name:false,sort_city:true,sort_state:false,sort_age:false,sort_id:false})
}

else {
  {


    let d=document.getElementsByClassName("head");
for(var i=0;i<d.length;i++)
d[i].classList.remove("btn-info")
arb.sort(function(a, b){return a.id-b.id});
  let  array=arb.slice(this.state.page,this.state.page+5);
this.setState({data:arb,current:array,sort_first_name:false,sort_last_name:false,sort_company_name:false,sort_city:false,sort_state:false,sort_age:false,sort_id:true})
  }
}

}
else
if(header=="state")
{state_count+=1;
if(state_count%2==1){
  let d=document.getElementsByClassName("head");
  for(var i=0;i<d.length;i++)
  d[i].classList.remove("btn-info")

  document.getElementById("state").classList.add("btn-info");


  first_name_count=0;
   last_name_count=0;
   company_name_count=0;
   city_count=0;

 age_count=0;
   id_count=0;


    arb.sort(function(a, b){return (a.state).localeCompare(b.state)});
      let  array=arb.slice(this.state.page,this.state.page+5);
this.setState({data:arb,current:array,sort_first_name:false,sort_last_name:false,sort_company_name:false,sort_city:false,sort_state:true,sort_age:false,sort_id:false})
}
else {
  let d=document.getElementsByClassName("head");
for(var i=0;i<d.length;i++)
d[i].classList.remove("btn-info")
arb.sort(function(a, b){return a.id-b.id});
  let  array=arb.slice(this.state.page,this.state.page+5);
this.setState({data:arb,current:array,sort_first_name:false,sort_last_name:false,sort_company_name:false,sort_city:false,sort_state:false,sort_age:false,sort_id:true})


}


}
else
if(header=="age")
{age_count+=1;
if(age_count%2==1){
  let d=document.getElementsByClassName("head");
  for(var i=0;i<d.length;i++)
  d[i].classList.remove("btn-info")


  document.getElementById("age").classList.add("btn-info");

  first_name_count=0;
   last_name_count=0;
   company_name_count=0;
   city_count=0;
   state_count=0;

  id_count=0;




    arb.sort(function(a, b){return a.age-b.age});
      let  array=arb.slice(this.state.page,this.state.page+5);
this.setState({data:arb,current:array,sort_first_name:false,sort_last_name:false,sort_company_name:false,sort_city:false,sort_state:false,sort_age:true,sort_id:false})
}

else{

  let d=document.getElementsByClassName("head");
for(var i=0;i<d.length;i++)
d[i].classList.remove("btn-info")

arb.sort(function(a, b){return a.id-b.id});
  let  array=arb.slice(this.state.page,this.state.page+5);
this.setState({data:arb,current:array,sort_first_name:false,sort_last_name:false,sort_company_name:false,sort_city:false,sort_state:false,sort_age:false,sort_id:true})
}

}
else
if(header=="id")
{id_count+=1;
if(id_count%2==1){
  let d=document.getElementsByClassName("head");
  for(var i=0;i<d.length;i++)
  d[i].classList.remove("btn-info")

document.getElementById("id").classList.add("btn-info");

  first_name_count=0;
   last_name_count=0;
   company_name_count=0;
   city_count=0;
   state_count=0;
  age_count=0;




    arb.sort(function(a, b){return a.id-b.id});
      let  array=arb.slice(this.state.page,this.state.page+5);
this.setState({data:arb,current:array,sort_first_name:false,sort_last_name:false,sort_company_name:false,sort_city:false,sort_state:false,sort_age:false,sort_id:true})
}
else{


  let d=document.getElementsByClassName("head");
for(var i=0;i<d.length;i++)
d[i].classList.remove("btn-info")


arb.sort(function(a, b){return a.id-b.id});
  let  array=arb.slice(this.state.page,this.state.page+5);
this.setState({data:arb,current:array,sort_first_name:false,sort_last_name:false,sort_company_name:false,sort_city:false,sort_state:false,sort_age:false,sort_id:true})
}


}



}


  render() {
console.log("count "+ this.state.page_count);


    return (

      <div>
  {this.state.error?<div  className="alert alert-danger msg"><strong> Incorrect </strong>Name , or Wrong Spelling</div>:null}
      <div class="form-group">
      <input id="inp" class="form-control input" placeholder="Search By Name" onChange={this.handleClick.bind(this)}/>

            <button id="search" className="btn btn-secondary" onClick={this.search.bind(this)}>Search</button>
              <button id="remove" className="btn btn-danger" onClick={this.RemoveFilter.bind(this)}>Remove Filter</button>
    </div>

      <table  className="table table-bordered">
  <thead>
  <tr>
    <th id="first" class="head"  onClick={this.sort.bind(this,"first")} scope="col">first_name</th>
    <th id="last" class="head" onClick={this.sort.bind(this,"last")}  scope="col">last_name</th>
    <th id="company" class="head" onClick={this.sort.bind(this,"company")} scope="col">company_name</th>
      <th  id="city"  class="head" onClick={this.sort.bind(this,"city")}scope="col">city</th>
        <th id="state"  class="head" onClick={this.sort.bind(this,"state")}scope="col">state</th>
          <th id="id" class="head"  onClick={this.sort.bind(this,"id")} scope="col">id</th>
              <th  id="age" class="head" onClick={this.sort.bind(this,"age")} scope="col">age</th>
                  <th scope="col">email</th>
                      <th scope="col">web</th>
  </tr>
    </thead>
  <tbody>

  {this.state.current.map((data,index)=>
     <tr key={index}>
    <th   scope="col">{data.first_name}</th>
    <th  scope="col">{data.last_name}</th>
    <th scope="col">{data.company_name}</th>
      <th  scope="col">{data.city}</th>
        <th  scope="col">{data.state}</th>
     <th  scope="col">    <Link to={"/"+data.id}> {data.id}</Link></th>
              <th scope="col">{data.age}</th>
                  <th  scope="col">{data.email}</th>
                      <th  scope="col">{data.web}</th>
                        </tr>
  )}


    </tbody>
  </table>
<br/>
<br/>
    <button className="fix" id="prv" onClick={this.page_change_back.bind(this)}>Previous</button>



      { num.map((data,index) =>
       <button  className ="fix" id={index+this.state.next}  className="classbtn" key={index+this.state.next} onClick={this.page_jump.bind(this,index+this.state.next)}>{index+this.state.next}</button>

      ) }


      <button className="fix" onClick={this.page_change.bind(this)}>Next</button>




    </div>
    );
  }
}

export default App;
