import React , { Component }from 'react';
import { Breadcrumb, BreadcrumbItem, Label, Col, Button, Row} from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxlength = (len) => (val) => !(val) || (val.length <= len);
const minlength = (len) => (val) => !(val) || (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Contact extends Component{

  constructor(props){
    super(props);
  //  this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.handleBlur = this.handleBlur.bind(this);
  };

/*  handleInputChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]:value});
  }la

  handleBlur = (field) => (evt) => {
    this.setState({touched: {
      ...this.state.touched , [field]: true
    }});
  }

  validate(firstname, lastname, telnum, email){
    const errors = {
      firstname:'',
      lastname:'',
      telnum:'',
      email:''
    };

    const reg = /^\d+$/;

    if(this.state.touched.firstname && firstname.length < 3 || firstname.length > 10)
      errors.firstname = 'First Name should be greater 3 <= and <= 10';
    else if(this.state.touched.lastname && lastname.length < 3 || lastname.length > 10)
      errors.lastname = ' Last Name should be  3 < =    and < = 10';
    else if(this.state.touched.telnum && !reg.test(telnum))
        errors.telnum = 'Tel. Number should be Decimal Number';
    else if(this.state.touched.email && email.split('').filter(x => x === '@').length != 1)
      errors.email = 'Enter correct email  address.';
    return errors;
    }
*/
    handleSubmit(values){
      console.log(values);
      alert('current state is: '+ JSON.stringify(values))
    }

  render(){
    return(
      <div className="container">
        <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Contact Us</h3>
                    <hr />
                </div>
          </div>
        <div className="row row-content">
          <div className="col-12 text-center">
            <h3>Location Information</h3>
            <hr width="50%"/>
          </div>
          <div className="col-12 col-sm-4 offset-sm-1">
              <h5>Address</h5>
              <address>
                121, Clear Water Bay Road<br />
                Clear Water Bay, Kowloon<br />
                HONG KONG<br />
                <i className="fa fa-phone">: +852 1234 5678</i><br/>
                <i className="fa fa-fax">: +852 1234 5678</i><br/>
                <i className="fa fa-envelope">: confusion@food.net</i>
              </address>
          </div>
          <div className="col-12 col-sm-6 offset-sm-1">
            <h5>Map of Our Location</h5>
          </div>
          <div className="col-12 col-sm-11 offset-sm-1 mt-2">
            <div className="btn-group" role="group">
              <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
              <a role="button" className="btn btn-info" href="tel:+85212345678"><i className="fa fa-skype"></i> Skype</a>
              <a role="button" className="btn btn-success" href="mailto:confusion@food.net" target="_blank" rel="noopener noreferrer"><i className="fa fa-envelope"></i> Email</a>
            </div>
          </div>
        </div>
        <div className="row row-content">
          <div className="col-12 mb-3">
            <h3>Send us your FeedBack</h3>
          </div>
          <div className="col-12 col-md-9">
          <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
            <Row className="form-group">
              <Label htmlFor="firstname" md={2}>First Name</Label>
              <Col md={10}>
                <Control.text model=".firstname" id="firstname" name="firstname" placeholder="First Name" className="form-control" validators={{required, maxlength: maxlength(10), minlength: minlength(3)}}/>
                <Errors className="text-danger"
                model=".firstname"
                show="touched"
                messages={{required: "Required",
                          minlength:"Must be greater than 3 characters.",
                          maxlength:"Must be less than 10 characters."}}/>
              </Col>
            </Row>
            <Row className="form-group">
              <Label htmlFor="lastname" md={2}>Last Name</Label>
              <Col md={10}>
                <Control.text model=".lastname" id="lastname" name="lastname" placeholder="Last Name" className="form-control"  validators={{required, maxlength: maxlength(10), minlength: minlength(3)}}/>
                <Errors className="text-danger"
                model=".lastname"
                show="touched"
                messages={{required: "Required",
                          minlength:"Must be greater than 3 characters.",
                          maxlength:"Must be less than 10 characters."}}/>
              </Col>
            </Row>
            <Row className="form-group">
              <Label htmlFor="telnum" md={2}>Tel. No</Label>
              <Col md={10}>
                <Control.text model=".telnum" id="telnum" name="telnum" placeholder="Tel. Number" className="form-control"  validators={{required, maxlength: maxlength(10), isNumber}}/>
                <Errors className="text-danger"
                model=".telnum"
                show="touched"
                messages={{
                  required: "Required",
                  isNumber: " Enter valid Number."
                          }}/>
              </Col>
            </Row>
            <Row className="form-group">
              <Label htmlFor="email" md={2}>Email Id</Label>
              <Col md={10}>
                <Control.text model=".email" id="email" name="email" placeholder="Email" className="form-control"  validators={{required, validEmail}}/>
                <Errors className="text-danger"
                model=".email"
                show="touched"
                messages={{required: "Required",
                          validEmail:"Enter valid Number."}}/>
              </Col>
            </Row>
            <Row className="form-group">
              <Col md={{size:6,offset:2}}>
                <Row className="form-check">
                  <Label check>
                    <Control.checkbox model=".agree" id="agree" name="agree" className="form-check-input" />
                    {' '}<strong>  May we contact you?
                    </strong>
                  </Label>
                </Row>
              </Col>
              <Col className="ml-auto">
                <Control.select model=".contactType" name="contactType" className="form-control">
                  <option selected>Tel.</option>
                  <option>Email</option>
                </Control.select>
              </Col>
            </Row>
            <Row className="form-group">
              <Label htmlFor="message" md={2}>Your Feedback</Label>
              <Col md={10}>
                <Control.textarea model=".message" id="message" name="message" rows="10" className="form-control" />
              </Col>
            </Row>
            <Row className="form-group">
              <Col md={{size:10,offset:2}}>
                <Button type="submit" value="submit" color="primary">Send FeedBack</Button>
              </Col>
            </Row>

          </LocalForm>
          </div>
        </div>
      </div>
    );
  };
};

export default Contact;
