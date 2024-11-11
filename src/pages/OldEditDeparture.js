import React, { Component } from 'react'
import SingleFlight from '../components/SingleFlight'
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
import SearchIcon from '@mui/icons-material/Search';
import { withRouter } from 'react-router';
import NoResults from '../components/NoResults'
import '../style/EditFlight.css';
import moment from 'moment';
import MyHeader from '../components/MyHeader';
import SingleFlightConfirm from '../components/SingleFlightConfirm';
import api from '../api'

class EditDeparture extends Component {
   
        deptTrip ={
            FlightNumber: "1175",
            DepartureTime: "10:10",
            ArrivalTime: "12:10",
            DepartureDate: "2021-12-09",
            ArrivalDate: "2021-12-10",
            EconomySeats: {
                AvailableSeats: 20,
                PriceAdult: 1000,
                PriceChild: 700,
                Seats: [
                    {
                        Seat: "A1",
                        Reserved: true,
                    }, {
                        Seat: "A1",
                        Reserved: true,
                    },
                    {
                        Seat: "A1",
                        Reserved: true,
                    }],
                    BaggageAllowance: {
                        Number: 4,
                        Size: 20
                    }
            },
            
    
            BusinessSeats: {
                AvailableSeats: 20,
                PriceAdult: 1500,
                PriceChild: 850,
                Seats: [
                    {
                        Seat: "A1",
                        Reserved: true,
                    }, {
                        Seat: "A1",
                        Reserved: true,
                    },
                    {
                        Seat: "A1",
                        Reserved: true,
                    }],
                    BaggageAllowance: {
                        Number: 4,
                        Size: 20
                    }
            },
            FirstClassSeats: {
                AvailableSeats: 20,
                PriceAdult: 2000,
                PriceChild: 700,
                Seats: [
                    {
                        Seat: "A1",
                        Reserved: true,
                    }, {
                        Seat: "A1",
                        Reserved: true,
                    },
                    {
                        Seat: "A1",
                        Reserved: true,
                    }],
                    BaggageAllowance: {
                        Number: 4,
                        Size: 20
                    }
            },
    
            DepartureTerminal: 10,
    
            ArrivalTerminal: 15,
    
            DepartureAirport: "LXR",
    
            ArrivalAirport: "CAI",
    
            TripDuration: "24h 30m",
           
        }

        deptTrip2 ={
            FlightNumber: "1175",
            DepartureTime: "10:10",
            ArrivalTime: "12:10",
            DepartureDate: "2021-12-05",
            ArrivalDate: "2021-12-10",
            EconomySeats: {
                AvailableSeats: 0,
                PriceAdult: 1000,
                PriceChild: 700,
                Seats: [
                    {
                        Seat: "A1",
                        Reserved: true,
                    }, {
                        Seat: "A1",
                        Reserved: true,
                    },
                    {
                        Seat: "A1",
                        Reserved: true,
                    }],
                    BaggageAllowance: {
                        Number: 4,
                        Size: 20
                    }
            },
            
    
            BusinessSeats: {
                AvailableSeats: 20,
                PriceAdult: 1500,
                PriceChild: 850,
                Seats: [
                    {
                        Seat: "A1",
                        Reserved: true,
                    }, {
                        Seat: "A1",
                        Reserved: true,
                    },
                    {
                        Seat: "A1",
                        Reserved: true,
                    }],
                    BaggageAllowance: {
                        Number: 4,
                        Size: 20
                    }
            },
            FirstClassSeats: {
                AvailableSeats: 20,
                PriceAdult: 2000,
                PriceChild: 700,
                Seats: [
                    {
                        Seat: "A1",
                        Reserved: true,
                    }, {
                        Seat: "A1",
                        Reserved: true,
                    },
                    {
                        Seat: "A1",
                        Reserved: true,
                    }],
                    BaggageAllowance: {
                        Number: 4,
                        Size: 20
                    }
            },
    
            DepartureTerminal: 10,
    
            ArrivalTerminal: 15,
    
            DepartureAirport: "CAI",
    
            ArrivalAirport: "LXR",
    
            TripDuration: "24h 30m",
           
        }

        state = {
            flightsArr: [this.deptTrip,this.deptTrip,this.deptTrip2,this.deptTrip,this.deptTrip,this.deptTrip2], //all flights
            searchResults:[], 
            depDateSearch: "", 
            cabinSearch:"EconomySeats", 
            searchFlight:"", 
            date:"", 
            departureFlag:false,
            clickedSearch : false,
            minDate : ""  , 
            maxDate : "" 
        }

 

    async componentDidMount(){
        await api.getAllFlights().then(flights => {
            console.log("fligsht coming from db are "  , flights.data)
            this.setState({
                flightsArr: flights.data,

            })
        })
        if (this.props.location.pathname === "/editDep") {
            
            this.setState({
                searchFlight: JSON.parse(sessionStorage.getItem('depFlight')),
                date:(JSON.parse(sessionStorage.getItem('retFlight'))).DepartureDate,
                departureFlag:true,
                depDateSearch: (JSON.parse(sessionStorage.getItem('depFlight'))).DepartureDate ,
                minDate : new Date().toISOString().substring(0, 10) ,
                maxDate : (JSON.parse(sessionStorage.getItem('retFlight'))).DepartureDate,
         } , () =>  console.log("dates-----------------------------------------",this.state.depDateSearch)) 
        
        }
        else {
           
            this.setState({
                searchFlight: JSON.parse(sessionStorage.getItem('retFlight')),
                date:(JSON.parse(sessionStorage.getItem('depFlight'))).ArrivalDate,
                depDateSearch: (JSON.parse(sessionStorage.getItem('retFlight'))).DepartureDate,
                minDate : (JSON.parse(sessionStorage.getItem('depFlight'))).ArrivalDate,
                departureFlag:false,
         })
         console.log("search flight is",this.state.searchFlight);
        }
        
    }
    handleSearch(e){
         e.preventDefault();
         const value = e.target.value;
         
         this.setState(
           {
             ...this.state,[e.target.name]: value
           }
           );
    }
    andSearch(){
        const{flightsArr,deptCabinClass,searchResults,searchFlight,depDateSearch,cabinSearch,date} = this.state;

        console.log("andSearch",searchFlight);

        if(this.state.departureFlag){
            this.setState({
                searchResults: this.state.flightsArr.filter((f) =>
                  Date.parse(f.DepartureDate) === Date.parse(depDateSearch)
                  && f.DepartureAirport === searchFlight.DepartureAirport
                  && f.ArrivalAirport === searchFlight.ArrivalAirport
                  && f[cabinSearch]["AvailableSeats"] >= Number(1)
                  && Date.parse(f.ArrivalDate) < Date.parse(date)  
                ),
                clickedSearch:true
              })
        }
        else{
            console.log("searching for return " , flightsArr)
            this.setState({
                searchResults: flightsArr.filter((f) =>
                  Date.parse(f.DepartureDate) ===  Date.parse(depDateSearch)
                  && f.DepartureAirport === searchFlight.DepartureAirport
                  && f.ArrivalAirport === searchFlight.ArrivalAirport
                  && f[cabinSearch]["AvailableSeats"] >= Number(1) //double check condition if we are adding child parent pairs
                  && Date.parse(f.DepartureDate) > Date.parse(date)
                ),
                clickedSearch:true
              })
        }
       
           sessionStorage.setItem('cabinSearch', cabinSearch);
    }
  
    
    render() {
        const { searchResults ,flightsArr, depDateSearch,cabinSearch,searchFlight,clickedSearch} = this.state
      
        return (
            <div className = "flex-col">
                <MyHeader/>
                <SingleFlightConfirm departureDate={"02-12-2021"} arrivalDate={ "18-12-2021"} departureTime={"03:10"} arrivalTime={"03:10"} seat={"A1"} cabin={"EconomySeats"} price={"112"}/>
               <div className="search-bar search-bar-box" style={{justifyContent:"center"}}>
                <Form.Group style={{ width:"20%"}} className="mb-2">
                <Form.Label style={{color:"white",fontWeight:"bold"}}>Departure Date</Form.Label>
              
                <Form.Control
                    type="date"
                    placeholder="Departure date"
                    value={depDateSearch}
                    name="depDateSearch"
                    onChange={this.handleSearch.bind(this)}
                    min ={this.state.minDate }
                    max = {this.state.maxDate}
                    // maxDate={new Date("12-12-2021")}
                />
                </Form.Group>

                <Form.Group style={{  width: "20%" }} className="mb-2">
                <Form.Label style={{color:"white",fontWeight:"bold"}}>Cabin Class</Form.Label>
                <Form.Select
                  value={cabinSearch}
                  name="cabinSearch"
                  onChange={this.handleSearch.bind(this)}
                  aria-label="Default select example">
                  <option hidden>Departure cabin </option>
                  <option value="EconomySeats">Economy</option>
                  <option value="BusinessSeats">Business class</option>
                  <option value="FirstClassSeats">First Class</option>
                </Form.Select>
               </Form.Group>

               <div >
                <Button style={{ width: "auto", height: "39px",marginTop:"22px",padding:"1rem" }}
                  onClick={this.andSearch.bind(this)} variant="contained" >
                  <SearchIcon style={{ fontSize: "30px" }} />{" "}
                  
                </Button>
              </div >

                </div>

               
                <div className="flex-col edit-box">
                    { searchResults.length>0? 
                    
                        searchResults.map((t) => (
                        <SingleFlight deptFlight={t}  />
                   
                    ))
                : clickedSearch? 
                <>
                <div className="flex-col no-res">
                    <SearchIcon style={{ fontSize: "5rem" }} />
                    <h2>Sorry, we couldn't find any flights from {searchFlight.DepartureAirport} to {searchFlight.ArrivalAirport} on {depDateSearch}</h2>
                    <h6 style={{ color: "grey" }}>These airports may not have regularly scheduled flights or there may be restrictions that impact this route.
                    </h6>
                </div>
                </>:
                 <div className="flex-col no-res">
                 <SearchIcon style={{ fontSize: "5rem" }} />
                 <h2>Search to find your ideal flight</h2>
                 <h6 style={{ color: "grey" }}>airports may not have regularly scheduled flights or there may be restrictions that impact this route.
                 </h6>
             </div>

                }
                    
                </div>
            </div>
        )
    }
}
export default withRouter(EditDeparture)