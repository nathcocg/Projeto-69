import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

export default class TransactionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domState: "normal",
      hasCameraPermissions: null,
      scanned: false,
      scannedData: ""
    };
  }

  getCameraPermissions = async domState => {

    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    //const { status } = Permissions.askAsync(Permissions.CAMERA);
    //const { status } = await Permissions.askAsync(Permissions);
    //const { status } = await Permissions.askAsync(CAMERA);

    this.setState({
       /*status === "granted" é verdadeiro se o usuário concedeu permissão
         status === "granted" é falso se o usuário não concedeu permissão
        */
      hasCameraPermissions: status === "granted",
      domState: domState,
      scanned: false
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      scannedData: data,
      domState: "normal",
      scanned: true
    });
  };

  render() {
    const { domState, hasCameraPermissions, scannedData, scanned } = this.state;
    if (domState === "scanner") {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {hasCameraPermissions ? scannedData : "Solicitar Permissão para a Câmera"}
        </Text>

        {/*
        <TouchableOpacity
          style={[styles.button, { marginTop: 25 }]}
          onPress= this.getCameraPermissions("scanner")}
        >
          <Text style={styles.buttonText}>Digitalizar QR Code</Text>
        </TouchableOpacity>
        */}

        {
        <TouchableOpacity
          style={[styles.button, { marginTop: 25 }]}
          onPress={() => this.getCameraPermissions("scanner")}
        >
          <Text style={styles.buttonText}>Digitalizar QR Code</Text>
        </TouchableOpacity>
        }

        {/*
        <TouchableOpacity
          style={[styles.button, { marginTop: 25 }]}
          onPress={() => this.getCameraPermissions()}
        >
          <Text style={styles.buttonText}>Digitalizar QR Code</Text>
        </TouchableOpacity>
        */}

        {/*
        <TouchableOpacity
          style={[styles.button, { marginTop: 25 }]}
          onPress={() => this.getCameraPermissions("scanner")}
        >
        */}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D0E6F0"
  },
  text: {
    color: "#4C5D70",
    fontSize: 15
  },
  button: {
    width: "43%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FBE5C0",
    borderRadius: 15,
    borderWidth: 2
  },
  buttonText: {
    fontSize: 15,
    color: "#4C5D70"
  }
});
