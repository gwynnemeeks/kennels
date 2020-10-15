import React, { useState, useEffect, useContext } from "react"
import { AnimalContext } from "../animal/AnimalProvider"
import { LocationContext } from "../location/LocationProvider"
import { EmployeeContext } from "./EmployeeProvider"
import "./Employees.css"


export const EmployeeDetail = (props) => {
    const { animals, getAnimals } = useContext(AnimalContext)
    const { locations, getLocations } = useContext(LocationContext)
    const { employees, getEmployees } = useContext(EmployeeContext)

    const [locationAnimals, setAnimals] = useState([])
    const [employee, setEmployee] = useState({})
    const [location, setLocation] = useState({})

    useEffect(() => {
        getLocations()
            .then(getEmployees)// eslint-disable-next-line
            .then(getAnimals)
    }, [getAnimals, getEmployees, getLocations])

    useEffect(() => {
        const locAnimals = animals.filter(a => a.locationId === location.id) || []
        setAnimals(locAnimals)// eslint-disable-next-line
    }, [animals, location])

    useEffect(() => {
        const employee = employees.find(e => e.id === parseInt(props.match.params.employeeId)) || {}
        setEmployee(employee)// eslint-disable-next-line
    }, [employees])

    useEffect(() => {
        const location = locations.find(l => l.id === employee.locationId) || {}
        setLocation(location)// eslint-disable-next-line
    }, [employee])

    return (
        <section className="employee">
            <h3 className="employee__name">{employee.name}</h3>
            <div>Currently working at { location.name }</div>
            <div>
                Animals at this location:
                {locationAnimals.map(la => <div>{la.name}</div>)}
            </div>
        </section>
    )
}