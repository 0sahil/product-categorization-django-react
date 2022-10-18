import React, { Component } from "react";
import Dropzone from "react-dropzone";
import PopUp from "./PopUp";

import UploadService from "services/UploadFiles";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";

import './UploadFiles.css'

export default class UploadFiles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",
      csv: undefined,
      fileInfos: [],
      seen: false
    };

    this.onDrop = this.onDrop.bind(this);
    this.togglePop = this.togglePop.bind(this);
    this.upload = this.upload.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);

  }

  togglePop = () => {
    this.setState({
     seen: !this.state.seen,
     csv: undefined
    });
   };

  onDrop(files) {
    if (files.length > 0) {
      this.setState({ selectedFiles: files });
    }
  };
  upload = () => {
    let currentFile = this.state.selectedFiles[0];

    this.setState({
      progress: 0,
      currentFile: currentFile,
    });

    UploadService.upload(currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        this.setState({
          seen: true,
          message: response.data.message,
          csv: response.data
        });
        return UploadService.getFiles();
      })
      .then((files) => {
        this.setState({
          fileInfos: files.data,
        });
        // return UploadService.getOutputCSV();
      })
      // .then((file) => 
      //   this.setState({
      //     csv: file.data,
      //   })
      // )
      .catch(() => {
        this.setState({
          progress: 0,
          message: "Could not upload the file!",
          currentFile: undefined,
        });
      });

    this.setState({
      selectedFiles: undefined,
      csv: undefined
    });
  };

  toggleAndUpload() {
    this.upload();
    this.togglePop();
  }

  componentDidMount() {
    UploadService.getFiles().then((response) => {
      this.setState({
        fileInfos: response.data,
      });
    });
};



  render() {
    const { selectedFiles, currentFile, progress, message, csv, fileInfos, seen } = this.state;

    return (
      <div>
        {currentFile && (
          <div className="progress mb-3">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}

        <Dropzone onDrop={this.onDrop} multiple={false}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                {selectedFiles && selectedFiles[0].name ? (
                  <div className="selected-file">
                    {selectedFiles && selectedFiles[0].name}
                  </div>
                ) : (
                  "Drag and drop file here, or click to select file"
                )}
              </div>
              <aside className="selected-file-wrapper">
                <button
                  className="btn btn-success"
                  disabled={!selectedFiles}
                  onClick={this.upload}
                >
                Upload
                </button>
              </aside>
            </section>
          )}
        </Dropzone>

        {/* {message.length > 0 && (<div className="alert alert-light" role="alert">
          {message}
        </div>)} */}

        {/* <div className="alert alert-light" role="alert">
          {csv}
        </div> */}

        {csv !== undefined > 0 && (<Card sx={{ height: "100%" }}>
              <MDBox pt={3} px={3}>
                <MDTypography variant="h6" fontWeight="medium">
                  Output CSV
                </MDTypography>
                <MDBox mt={0} mb={2}>
                  <MDTypography variant="button" color="text" fontWeight="regular">
                    <MDTypography display="inline" variant="body2" verticalAlign="middle">
                    </MDTypography>
                  </MDTypography>
                </MDBox>
              </MDBox>
              <MDBox p={2}>
                {csv}
              </MDBox>
            </Card>)}

        <br/>

        <div>
          {this.state.seen ? <PopUp toggle={this.togglePop} /> : null}
        </div>

        {fileInfos.length > 0 && (
              <Card sx={{ height: "100%" }}>
              <MDBox pt={3} px={3}>
                <MDTypography variant="h6" fontWeight="medium">
                  Previous Uploads
                </MDTypography>
                <MDBox mt={0} mb={2}>
                  <MDTypography variant="button" color="text" fontWeight="regular">
                    <MDTypography display="inline" variant="body2" verticalAlign="middle">
                    </MDTypography>
                  </MDTypography>
                </MDBox>
              </MDBox>
              <MDBox p={2}>
              {fileInfos.map((file, index) => (
                // <li className="list-group-item" key={index}>
                //   <a href={file.fileUrl}>{String(file.fileUrl).slice(38)}</a>
                  <TimelineItem
                  color="success"
                  icon="notifications"
                  title=<a href={file.fileUrl}>{String(file.fileUrl).slice(38)}</a>
                />
              ))}
              </MDBox>
            </Card>
        )}
      </div>
    );
  }
}