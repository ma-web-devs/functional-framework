"use strict"
import dom from '../utils/dom'


export default (props) => {

  return (
    <section className="container">
      <div className="row">
        <div className="jumbotron">
          <div className="header">
            <p className="lead">
            Thank you for your interest in the Democracy Center! Please fill out the form below and we will respond as quickly as possible.
            </p>
          </div>
          {/* Buttons that we will remove from Demo-Center Site and Put in App*/}
          <div className="col-lg-3 col-sm-4">
            <button disabled className="btn btn-success">
              Book a Room
            </button>
          </div>
          <div className="col-lg-3 col-sm-4">
            <button disabled className="btn btn-info">
              Subscribe
            </button>
          </div>
          <div className="col-lg-3 col-sm-4">
            <button disabled className="btn btn-warning">
              Donate
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
