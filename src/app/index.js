import React, {Component} from 'react';
import PropTypes from "prop-types";
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
        }],
        warning: []
    }

    static propTypes = {
        data: PropTypes.shape({
            _id: PropTypes.string,
            type: PropTypes.string,
            name: {
                first: PropTypes.string,
                last: PropTypes.string
            },
            warning: PropTypes.bool,
            players: PropTypes.number,
            maxPlayers: PropTypes.number
        })
    }

    componentDidMount() {
        axios
            .get('app/data/data.json')
            .then(response => {
                this.setState({
                    data: response.data,
                    warning: response.data.map(el => {return el.warning})
                });
            }); 
    }

    target = (ev) => {
        console.log(ev.target);
    }

    getTrProps = (rowInfo) => {
        const {warning} = this.state;
        if (rowInfo) {
            rowInfo.data.map(el => {console.log(el.warning)})
            return {
                className: rowInfo.data.map(el => {return el ? 'blinking' : ''})
            }
        }
        return {};
    }

    render() {
        const {data} = this.state;
        const columns = [{
            Header: 'ID',
            accessor: '_id'
        }, {
            Header: 'Type',
            accessor: 'type',
            Cell: props => <img className='item-img' src={props.value} />
        }, {
            id: 'Name',
            Header: 'Name',
            accessor: d => d.name.first + ' ' + d.name.last
        }, {
            Header: 'Players',
            accessor: 'players'
        }, {
            Header: 'Maximum Players',
            accessor: 'maxPlayers'
        }, {
            id: 'Warning',
            Header: 'Warning',
            accessor: d => d.warning.toString()
        }];

        return (
            <div className="d-flex align-items-center justify-content-center" onClick={this.target}>
                <ReactTable data={data} 
                            columns={columns}
                            getTrProps={this.getTrProps}
                />
            </div>
        );
    }
}
