import React, {Component} from 'react';
import t from 'tcomb-form';
const mapConfig = t.struct({showInfoPopup: t.Boolean, showPrint: t.Boolean, showExportImage: t.Boolean, showAbout: t.Boolean, showGeoCoding: t.Boolean});
const options = {
  fields: {
    showInfoPopup: {
      label: "Info Pop-up"
    },
    showPrint: {
      label: "Print"
    },
    showExportImage: {
      label: "Export Image"
    },
    showAbout: {
      label: "About"
    },
    showGeoCoding: {
      label: "Geo Coding"
    }
  }
};
const Form = t.form.Form;

export default class Reporting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultconf: {
        showInfoPopup: this.props.state.config.config.showInfoPopup != undefined
          ? this.props.state.config.config.showInfoPopup
          : this.props.config
            ? this.props.config.showInfoPopup
            : true,
        showPrint: this.props.state.config.config.showPrint != undefined
          ? this.props.state.config.config.showPrint
          : this.props.config
            ? this.props.config.showPrint
            : true,
        showExportImage: this.props.state.config.config.showExportImage != undefined
          ? this.props.state.config.config.showExportImage
          : this.props.config
            ? this.props.config.showExportImage
            : true,
        showAbout: this.props.state.config.config.showAbout != undefined
          ? this.props.state.config.config.showAbout
          : this.props.config
            ? this.props.config.showAbout
            : true,
        showGeoCoding: this.props.state.config.config.showGeoCoding != undefined
          ? this.props.state.config.config.showGeoCoding
          : this.props.config
            ? this.props.config.showGeoCoding
            : true
      }
    }
  }
  componentDidMount() {}
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
            <h4>{'Reporting'}</h4>
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
