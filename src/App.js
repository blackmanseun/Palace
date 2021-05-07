import React, { Component } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import  'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css'
import {MDBBadge,MDBCollapse, MDBIcon, MDBInput, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBContainer, MDBRow, MDBCol } from "mdbreact"
import Schedule from "./Schedule"
import Button from 'react-bootstrap/Button'
import "./App.css"
import { ButtonGroup } from 'react-bootstrap';
import Switch from '@material-ui/core/Switch';
import { createMuiTheme } from '@material-ui/core';
import green from '@material-ui/core/colors';
export default class App extends Component {

  constructor() {
    super();
    this.state = {
      modal : false,
      dayOfWeek: "",
      calendar: Schedule,
      collapseID: "",
      checkedA: false,
      };
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.clearArray = this.clearArray.bind(this)
    }
  
  handleChange() {
    this.setState((prevState) => {
      return {
        checkedA: !prevState.checkedA,
      };
    });
    //  console.log(this.state.calendar)
  }
  toggleCollapse = (collapseID) => () => {
    this.setState((prevState) => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : "",
    }));
  };
  toggleModal = () =>{
    this.setState({
      modal : !this.state.modal 
    });
  };
  handleInputChange = inputName => value =>{
    const nextValue = value;
    this.setState({
      [inputName]: nextValue
    })
  };
  addEvent =()=>{
    // let dayOfWeek
    var newArray = [...this.state.calendar.Monday];
    newArray.push({
      id: newArray.length? newArray[newArray.length - 1].id + 1 : 1,
      time: this.state.time,
      title: this.state.title,
      location: this.state.location,
      description: this.state.description,
    });
    this.setState(()=>{
      switch (this.state.collapseID) {
        case "MondaySchedule":
          this.state.calendar.Monday = newArray
          break;
      
        default: 
        this.state.calendar.Monday = newArray
          break;
      }
      return{}
    })
      // {Monday: newArray});
    this.setState({
      time: "",
      title: "",
      location: "",
      description: ""
    })
  }
  handleDelete(eventId) {
    this.setState(()=>{
      let dayOfWeek
      switch (this.state.collapseID) {
        case "MondaySchedule":
          dayOfWeek = this.state.calendar.Monday;
          break;
        case "TuesdaySchedule":
          dayOfWeek = this.state.calendar.Tuesday;
          break;
        case "WednesdaySchedule":
          dayOfWeek = this.state.calendar.Wednesday;
          break;
        case "ThursdaySchedule":
          dayOfWeek = this.state.calendar.Thursday;
          break;
        case "FridaySchedule":
          dayOfWeek = this.state.calendar.Friday;
          break;
        case "SaturdaySchedule":
          dayOfWeek = this.state.calendar.Saturday;
          break;
        case "SundaySchedule":
          dayOfWeek = this.state.calendar.Sunday;
          break;
      }
      const events = dayOfWeek.filter(e => e.id !== eventId)
       switch (this.state.collapseID) {
         case "MondaySchedule":
           this.state.calendar.Monday = events;
           break;
         case "TuesdaySchedule":
           this.state.calendar.Tuesday = events;
           break;
         case "WednesdaySchedule":
           this.state.calendar.Wednesday = events;
           break;
         case "ThursdaySchedule":
           this.state.calendar.Thursday = events;
           break;
         case "FridaySchedule":
           this.state.calendar.Friday = events;
           break;
         case "SaturdaySchedule":
           this.state.calendar.Saturday = events;
           break;
         case "SundaySchedule":
           this.state.calendar.Sunday = events;
           break;
          }
      return{
        }
    })

  
  }
  clearArray(){
    this.setState(()=>{
      let dayOfWeek
      switch (this.state.collapseID) {
        case "MondaySchedule":
          dayOfWeek = this.state.calendar.Monday;
          break;
        case "TuesdaySchedule":
          dayOfWeek = this.state.calendar.Tuesday;
          break;
        case "WednesdaySchedule":
          dayOfWeek = this.state.calendar.Wednesday;
          break;
        case "ThursdaySchedule":
          dayOfWeek = this.state.calendar.Thursday;
          break;
        case "FridaySchedule":
          dayOfWeek = this.state.calendar.Friday;
          break;
        case "SaturdaySchedule":
          dayOfWeek = this.state.calendar.Saturday;
          break;
        case "SundaySchedule":
          dayOfWeek = this.state.calendar.Sunday;
          break;
      }
      const clearEvent = dayOfWeek.filter(e => !e.id)
       switch (this.state.collapseID) {
         case "MondaySchedule":
           this.state.calendar.Monday = clearEvent;
           break;
         case "TuesdaySchedule":
           this.state.calendar.Tuesday = clearEvent;
           break;
         case "WednesdaySchedule":
           this.state.calendar.Wednesday = clearEvent;
           break;
         case "ThursdaySchedule":
           this.state.calendar.Thursday = clearEvent;
           break;
         case "FridaySchedule":
           this.state.calendar.Friday = clearEvent;
           break;
         case "SaturdaySchedule":
           this.state.calendar.Saturday = clearEvent;
           break;
         case "SundaySchedule":
           this.state.calendar.Sunday = clearEvent;
           break;
          }
      return{
        }
     })
  }
  render() {
    let eventsNumber;
    switch (this.state.collapseID) {
      case "MondaySchedule":
        eventsNumber = this.state.calendar.Monday.length;
        break;
      case "TuesdaySchedule":
        eventsNumber = this.state.calendar.Tuesday.length;
        break;
      case "WednesdaySchedule":
        eventsNumber = this.state.calendar.Wednesday.length;
        break;
      case "ThursdaySchedule":
        eventsNumber = this.state.calendar.Thursday.length;
        break;
      case "FridaySchedule":
        eventsNumber = this.state.calendar.Friday.length;
        break;
      case "SaturdaySchedule":
        eventsNumber = this.state.calendar.Saturday.length;
        break;
      case "SundaySchedule":
        eventsNumber = this.state.calendar.Sunday.length;
        break;
    }
    const date = new Date();
    const Livedate = date.toTimeString();
    const MondayPlans = this.state.calendar.Monday.map((list) => (
      <Event key={list.id} list={list} handleDelete={this.handleDelete} />
    ))
    const TuesdayPlans = this.state.calendar.Tuesday.map((list) => (
      <Event key={list.id} list={list} handleDelete={this.handleDelete} />
    ))
    const WednesdayPlans = this.state.calendar.Wednesday.map((list) => (
      <Event key={list.id} list={list} handleDelete={this.handleDelete} />
    ))
    const ThursdayPlans = this.state.calendar.Thursday.map((list) => (
      <Event key={list.id} list={list} handleDelete={this.handleDelete} />
    ))
    const FridayPlans = this.state.calendar.Friday.map((list) => (
      <Event key={list.id} list={list} handleDelete={this.handleDelete} />
    ))
    const SaturdayPlans = this.state.calendar.Saturday.map((list) => (
      <Event key={list.id} list={list} handleDelete={this.handleDelete} />
    ))
    const SundayPlans = this.state.calendar.Sunday.map((list) => (
      <Event key={list.id} list={list} handleDelete={this.handleDelete} />
    ))
    
    const theme = createMuiTheme({
      palette: {
        primary: green,
      },
    });

    return (
      <React.Fragment>
        <MDBContainer>
          <MDBRow>
            <MDBCol lg="9">
              <h5 className="text-right">
                <Switch
                  checked={this.state.checkedA}
                  onChange={this.handleChange}
                  color="primary"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
                Dark Theme
              </h5>
              <div className="schedule-items">
                <div>
                  <h2
                    onClick={this.toggleCollapse("MondaySchedule")}
                    className="pt-2 font-weight-bolder text-uppercase"
                  >
                    Monday
                    <MDBIcon
                      className="ml-2 icon-font-size"
                      icon={
                        this.state.collapseID === "MondaySchedule"
                          ? "angle-down"
                          : "angle-right"
                      }
                      fixed
                    />
                  </h2>
                  <MDBCollapse
                    id="MondaySchedule"
                    isOpen={this.state.collapseID}
                  >
                    {MondayPlans}
                    <MDBRow className="mb-4">
                      <MDBCol xl="6" md="6" className="mx-auto text-center">
                        <ButtonGroup>
                          <Button
                            onClick={this.toggleModal}
                            className="mr-3"
                            variant="info"
                          >
                            New Event
                          </Button>
                          <Button onClick={this.clearArray} variant="info">
                            Clear all SChedule
                          </Button>
                        </ButtonGroup>
                      </MDBCol>
                    </MDBRow>
                  </MDBCollapse>
                </div>
                <div>
                  <h2
                    onClick={this.toggleCollapse("TuesdaySchedule")}
                    className="pt-2 font-weight-bolder text-uppercase"
                  >
                    Tuesday
                    <MDBIcon
                      className="ml-2 icon-font-size"
                      icon={
                        this.state.collapseID === "TuesdaySchedule"
                          ? "angle-down"
                          : "angle-right"
                      }
                      fixed
                    />
                  </h2>
                  <MDBCollapse
                    id="TuesdaySchedule"
                    isOpen={this.state.collapseID}
                  >
                    {TuesdayPlans}
                    <MDBRow className="mb-4">
                      <MDBCol xl="6" md="6" className="mx-auto text-center">
                        <ButtonGroup>
                          <Button
                            onClick={this.toggleModal}
                            className="mr-3"
                            variant="info"
                          >
                            New Event
                          </Button>
                          <Button onClick={this.clearArray} variant="info">
                            Clear all SChedule
                          </Button>
                        </ButtonGroup>
                      </MDBCol>
                    </MDBRow>
                  </MDBCollapse>
                </div>
                <div>
                  <h2
                    onClick={this.toggleCollapse("WednesdaySchedule")}
                    className="pt-2 font-weight-bolder text-uppercase"
                  >
                    Wednesday
                    <MDBIcon
                      className="ml-2 icon-font-size"
                      icon={
                        this.state.collapseID === "WednesdaySchedule"
                          ? "angle-down"
                          : "angle-right"
                      }
                      fixed
                    />
                  </h2>
                  <MDBCollapse
                    id="WednesdaySchedule"
                    isOpen={this.state.collapseID}
                  >
                    {WednesdayPlans}
                    <MDBRow className="mb-4">
                      <MDBCol xl="6" md="6" className="mx-auto text-center">
                        <ButtonGroup>
                          <Button
                            onClick={this.toggleModal}
                            className="mr-3"
                            variant="info"
                          >
                            New Event
                          </Button>
                          <Button onClick={this.clearArray} variant="info">
                            Clear all SChedule
                          </Button>
                        </ButtonGroup>
                      </MDBCol>
                    </MDBRow>
                  </MDBCollapse>
                </div>
                <div>
                  <h2
                    onClick={this.toggleCollapse("ThursdaySchedule")}
                    className="pt-2 font-weight-bolder text-uppercase"
                  >
                    Thursday
                    <MDBIcon
                      className="ml-2 icon-font-size"
                      icon={
                        this.state.collapseID === "ThursdaySchedule"
                          ? "angle-down"
                          : "angle-right"
                      }
                      fixed
                    />
                  </h2>
                  <MDBCollapse
                    id="ThursdaySchedule"
                    isOpen={this.state.collapseID}
                  >
                    {ThursdayPlans}
                    <MDBRow className="mb-4">
                      <MDBCol xl="6" md="6" className="mx-auto text-center">
                        <ButtonGroup>
                          <Button
                            onClick={this.toggleModal}
                            className="mr-3"
                            variant="info"
                          >
                            New Event
                          </Button>
                          <Button onClick={this.clearArray} variant="info">
                            Clear all SChedule
                          </Button>
                        </ButtonGroup>
                      </MDBCol>
                    </MDBRow>
                  </MDBCollapse>
                </div>
                <div>
                  <h2
                    onClick={this.toggleCollapse("FridaySchedule")}
                    className="pt-2 font-weight-bolder text-uppercase"
                  >
                    Friday
                    <MDBIcon
                      className="ml-2 icon-font-size"
                      icon={
                        this.state.collapseID === "FridaySchedule"
                          ? "angle-down"
                          : "angle-right"
                      }
                      fixed
                    />
                  </h2>
                  <MDBCollapse
                    id="FridaySchedule"
                    isOpen={this.state.collapseID}
                  >
                    {FridayPlans}
                    <MDBRow className="mb-4">
                      <MDBCol xl="6" md="6" className="mx-auto text-center">
                        <ButtonGroup>
                          <Button
                            onClick={this.toggleModal}
                            className="mr-3"
                            variant="info"
                          >
                            New Event
                          </Button>
                          <Button onClick={this.clearArray} variant="info">
                            Clear all SChedule
                          </Button>
                        </ButtonGroup>
                      </MDBCol>
                    </MDBRow>
                  </MDBCollapse>
                </div>
                <div>
                  <h2
                    onClick={this.toggleCollapse("SaturdaySchedule")}
                    className="pt-2 font-weight-bolder text-uppercase"
                  >
                    Saturday
                    <MDBIcon
                      className="ml-2 icon-font-size"
                      icon={
                        this.state.collapseID === "SaturdaySchedule"
                          ? "angle-down"
                          : "angle-right"
                      }
                      fixed
                    />
                  </h2>
                  <MDBCollapse
                    id="SaturdaySchedule"
                    isOpen={this.state.collapseID}
                  >
                    {SaturdayPlans}
                    <MDBRow className="mb-4">
                      <MDBCol xl="6" md="6" className="mx-auto text-center">
                        <ButtonGroup>
                          <Button
                            onClick={this.toggleModal}
                            className="mr-3"
                            variant="info"
                          >
                            New Event
                          </Button>
                          <Button onClick={this.clearArray} variant="info">
                            Clear all SChedule
                          </Button>
                        </ButtonGroup>
                      </MDBCol>
                    </MDBRow>
                  </MDBCollapse>
                </div>
                <div>
                  <h2
                    onClick={this.toggleCollapse("SundaySchedule")}
                    className="pt-2 font-weight-bolder text-uppercase"
                  >
                    Sunday
                    <MDBIcon
                      className="ml-2 icon-font-size"
                      icon={
                        this.state.collapseID === "SundaySchedule"
                          ? "angle-down"
                          : "angle-right"
                      }
                      fixed
                    />
                  </h2>
                  <MDBCollapse
                    id="SundaySchedule"
                    isOpen={this.state.collapseID}
                  >
                    {SundayPlans}
                    <MDBRow className="mb-4">
                      <MDBCol xl="6" md="6" className="mx-auto text-center">
                        <ButtonGroup>
                          <Button
                            onClick={this.toggleModal}
                            className="mr-3"
                            variant="info"
                          >
                            New Event
                          </Button>
                          <Button onClick={this.clearArray} variant="info">
                            Clear all SChedule
                          </Button>
                        </ButtonGroup>
                      </MDBCol>
                    </MDBRow>
                  </MDBCollapse>
                </div>
              </div>
            </MDBCol>
            <MDBCol md="3">
              <h3 className="text-uppercase pt-2">Schedule</h3>
              {eventsNumber > 0 ? (
                <h6 className="my-3">
                  It is going be busy today. You have
                  <b> {eventsNumber} events</b> planned for the day.
                </h6>
              ) : (
                "You do not have anything planed yet"
              )}

              <h3 className="my-3 font-weight-bold">
                <MDBRow>
                  <MDBCol xs="9">{Livedate}</MDBCol>
                </MDBRow>
              </h3>

              <h1 className="my-3">
                <MDBRow>
                  <MDBCol xs="3" className="text-center">
                    <MDBIcon icon="sun" fixed />
                  </MDBCol>
                  <MDBCol xs="9">Sunny</MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol xs="3" className="text-center">
                    <MDBIcon icon="thermometer-three-quarters" fixed />
                  </MDBCol>
                  <MDBCol xs="9">23°C</MDBCol>
                </MDBRow>
              </h1>
              <p>
                Don't forget to wear your sunglasses. Today will be dry and
                sunny, becoming warm in the afternoon with temperature between
                20 and 25 degrees
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <MDBModal isOpen={this.state.modal} toggle={this.toggleModal}>
          <MDBModalHeader
            className="text-center"
            titleClass="w-100 font-weight-bold"
            toggle={this.toggleModal}
          >
            Add New Event
          </MDBModalHeader>
          <MDBModalBody>
            <form className="mx-3 grey-text">
              <MDBInput
                name="time"
                label="T ime"
                icon="clock"
                hint="12:30"
                group
                type="text"
                getValue={this.handleInputChange("time")}
              />
              <MDBInput
                name="title"
                label="Title"
                icon="edit"
                hint="Brief Me!"
                group
                type="text"
                getValue={this.handleInputChange("title")}
              />
              <MDBInput
                name="location"
                label="Location [Optional]"
                icon="map"
                group
                type="text"
                getValue={this.handleInputChange("location")}
              />
              <MDBInput
                name="description"
                label="Description [Optional]"
                icon="sticky-note"
                group
                type="text"
                getValue={this.handleInputChange("description")}
              />
            </form>
          </MDBModalBody>
          <MDBModalFooter className="justify-content-center">
            <ButtonGroup>
              <Button
                onClick={()=>{
                  this.toggleModal();
                  this.addEvent();}}
                variant="info"

              >
                Add
              </Button>
            </ButtonGroup>
          </MDBModalFooter>
        </MDBModal>
      </React.Fragment>
    );
  }
}
class Event extends Component{
  render(){
    // console.log(this.props.list.id)
    // console.log(this.props.list.time)
  return (
    <React.Fragment >
      <div className="media mt-1">
      <h3 className="h3-responsive font-weight-bold mr-3">{this.props.list.time}</h3>
      <div className="media-body mb3 mb-lg-3">
        <MDBBadge onClick={() => this.props.handleDelete(this.props.list.id)} color="danger" className="ml-2 float-right">-</MDBBadge>
        <h6 className="mt-0 font-weight-bold">{this.props.list.title}</h6>
        <hr className="hr-bold my-2"/>
       {this.props.list.location &&  <React.Fragment>
         <p className="font-smaller mb-0">
          <MDBIcon icon="map-marker-alt" fixed/> {this.props.list.location}</p>

       </React.Fragment>
       
       }
      </div>
      </div>
      {this.props.list.description &&
       <p className="p-2 mb-4 blue-grey lighten-5 blue-grey lighten-5">Description: {this.props.list.description}</p>}
     
      
      </React.Fragment>
  )
}
}