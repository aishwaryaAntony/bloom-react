
import React, { Component } from 'react'
import SignaturePad from 'react-signature-canvas'
import styles from '../../styles/styles.module.css'
import { Grid, Typography, Button, Table, TableBody, TableRow, TableCell, TableHead, TableContainer, Paper, styled, tableCellClasses } from '@mui/material';


class SignatureWidget extends Component {
  state = {
    trimmedDataURL: null,
    sigPadValue: null

  }
  sigPad = {}

  clear = () => {
    this.sigPad.clear()
  }

  trim = () => {
    this.setState({
      trimmedDataURL: this.sigPad.getTrimmedCanvas()
        .toDataURL('image/png')
    })
  }

  render() {
    let { trimmedDataURL } = this.state
    const { innerWidth: width, innerHeight: height } = window;
    return <div className={styles.container}>
      <div className={styles.sigContainer} >
        <SignaturePad canvasProps={{ className: styles.sigPad }} style={{ width: width / 4 }}
          ref={(ref) => { this.sigPad = ref }} />
      </div>
      <div style={{ flex: 1, flexDirection: "row", marginTop: 20, marginLeft: (width / 3), width: 200 }}>
        <button className={styles.buttons} onClick={this.clear}>
          Clear
        </button>
        <button className={styles.buttons} onClick={this.trim}>
          Save
        </button>
      </div>
      {trimmedDataURL
        ? <img className={styles.sigImage}
          src={trimmedDataURL} />
        : null}
    </div>
  }
}


// SignatureWidget.layout = "default";

export default SignatureWidget;
