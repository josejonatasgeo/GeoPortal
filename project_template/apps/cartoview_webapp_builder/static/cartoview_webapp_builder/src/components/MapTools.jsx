import React, {Component} from 'react';
import t from 'tcomb-form';
const mapConfig = t.struct({showAddLayerModal: t.Boolean, showLoadingPanel: t.Boolean, showMeasure: t.Boolean, showAttributesTable: t.Boolean});
const options = {
  fields: {
    showAddLayerModal: {
      label: "Layer Model"
    },
    showLoadingPanel: {
      label: "Loading Panel"
    },
    showMeasure: {
      label: "Measure"
    },
    showAttributesTable: {
      label: "Attributes Table"
    }
  }
};
const Form = t.form.Form;

export default class MapTools extends Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultconf: {
        showAddLayerModal: this.props.state.config.config.showAddLayerModal != undefined
          ? this.props.state.config.config.showAddLayerModal
          : this.props.config
            ? this.props.config.showAddLayerModal
            : true,
        showLoadingPanel: this.props.state.config.config.showLoadingPanel != undefined
          ? this.props.state.config.config.showLoadingPanel
          : this.props.config
            ? this.props.config.showLoadingPanel
            : true,
        showMeasure: this.props.state.config.config.showMeasure != undefined
          ? this.props.state.config.config.showMeasure
          : this.props.config
            ? this.props.config.showMeasure
            : true,
        showAttributesTable: this.props.state.config.config.showAttributesTable != undefined
          ? this.props.state.config.config.showAttributesTable
          : this.props.config
            ? this.props.config.showAttributesTable
            : true
      }
    }
  }

  save() {
    var basicConfig = this.refs.form.getValue();
    if (basicConfig) {
      this.props.onComplete(basicConfig)
    }
  }

  render() {
    return (
      <div className="row">
        <div className="row">
          <div className="col-xs-5 col-md-4">
            <h4>{'Map Tools '}</h4>
          </div>
          <div className="col-xs-7 col-md-8">
            <button style={{
              display: "inline-block",
              margin: "0px 3px 0px 3px"
            }} className="btn btn-primary btn-sm pull-right" onClick={this.save.bind(this)}>{"next >>"}</button>

            <button style={{
              display: "inline-block",
              margin: "0px 3px 0px 3px"
            }} className="btn btn-primary btn-sm pull-right" onClick={() => this.props.onPrevious()}>{"<< Previous"}</button>
          </div>
        </div>
        <hr></hr>
        <Form ref="form" options={options} value={this.state.defaultconf} type={mapConfig}/>
      </div>
    )
  }
}
