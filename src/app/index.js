import React, {Component} from 'react';
import axios from "axios";
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Item from "./components/item";

export class Main extends Component {
    state = {
        data: [{
            _id: '',
            type: '',
            name: {
                first: '',
                last: ''
            },
            warning: '',
            players: 0,
            maxPlayers: 0
        }]
    }

    componentDidMount() {
        axios
            .get('app/data/data.json')
            .then(response => {
                this.setState({
                    data: response.data
                });
            }); 
    }

    render() {
        const {data} = this.state;
        const columns = [{
            Header: 'ID',
            accessor: '_id' // String-based value accessors!
        }, {
            Header: 'Type',
            accessor: 'type',
            Cell: props => <img className='item-img' src={props.value} /> // Custom cell components!
        }, {
            id: 'Name', // Required because our accessor is not a string
            Header: 'Name',
            accessor: d => d.name.first + ' ' + d.name.last // Custom value accessors!
        }, {
            Header: 'Players',
            accessor: 'players' // String-based value accessors!
        }, {
            Header: 'Maximum Players',
            accessor: 'maxPlayers' // String-based value accessors!
        }];

        return (
            <div className="d-flex align-items-center justify-content-center">
                <ReactTable data={data} 
                            columns={columns}
                            getTrProps={(state, rowInfo, column, instance) => ({
                                onClick: e => console.log('A row was clicked!')
                            })}
                />
            </div>
        );
    }
}
