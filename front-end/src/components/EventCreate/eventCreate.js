import React, { Component } from 'react';
import api from '../../api.js';
import { Redirect } from 'react-router-dom';



class EventCreate extends Component {
  constructor(props) {
    super(props);

    const { data } = props;

    const today = new Date();
    const startValue = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}T00:00`;
    const endValue = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}T01:00`;

    if (data) {
      this.state = {
        startDate: data.startDate ? data.startDate.replace(/\+.*/, '') : startValue,
        endDate: data.endDate ? data.endDate.replace(/\+.*/, '') : endValue,
        title: data.title ? data.title : '',
        description: data.description ? data.description : '',
        error: '',
        data: null,
      };
    } else {
      this.state = {
        startDate: startValue,
        endDate: endValue,
        title: '',
        description: '',
        error: '',
        data: null,
      };
    }


    this.changeStartDate = this.changeStartDate.bind(this);
    this.changeEndDate = this.changeEndDate.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeStartDate(event) {
    console.log(event.target.value);
    this.setState({startDate: event.target.value});
  }
  changeEndDate(event) {
    this.setState({endDate: event.target.value});
  }
  changeTitle(event) {
    this.setState({title: event.target.value});
  }
  changeDescription(event) {
    this.setState({description: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {
      startDate,
      endDate,
      title,
      description,
    } = this.state;

    const {
      url
    } = this.props;

    const data = {
      startDate: new Date(startDate).getTime(),
      endDate: new Date(endDate).getTime(),
      title,
      description,
    };

    const response = await api.post(url, data);

    const { status } = response;

    if (status === 200) {
      this.setState({ data: response.data });
    } else {
      this.setState({ error: response.data.message });
    }


  }


  render(){

    const {
      startDate,
      endDate,
      title,
      description,
      error,
      data,
    } = this.state

    if (data) {
        return (<Redirect to={{pathname: `/event/${data.id}`, state: {from: this.props.location}}} />)
    }

    console.log(startDate);


    return (
      <div>
        <h2 className="margin_div">Create Event</h2>
        <div className="change_div">
          <p> {error} </p>
          <form>
            <div className="margin_div">
              <label  className="book_edit_label">
                <div>
                  Start date:
                </div>
                <div>
                  <input className="input username" type='datetime-local' value={startDate} onChange={this.changeStartDate}/>
                </div>
              </label>
            </div>
            <div className="margin_div">
              <label className="book_edit_label">
                <div>
                  End date:
                </div>
                <div>
                  <input className="book_edit_input" type='datetime-local' value={endDate} onChange={this.changeEndDate}/>
                </div>
              </label>
            </div>
            <div className="margin_div">
              <label>
                <div>
                  Title:
                </div>
                <div>
                  <input className="book_edit_desc" type='text' value={title} onChange={this.changeTitle}/>
                </div>
              </label>
            </div>
            <div className="margin_div">
            </div>
            <div className="margin_div">
              <label className="book_edit_label">
                <div>
                  Description:
                </div>
                <div>
                  <textarea className="book_edit_input" value={description} onChange={this.changeDescription}/>
                </div>
              </label>
            </div>
            <div>
              <input className='submit' type='submit' value='submit' onClick={this.handleSubmit}></input>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EventCreate;
