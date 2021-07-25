/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import { openDatabase } from 'react-native-sqlite-storage';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Button,
  Text,
  useColorScheme,
  TouchableOpacity,
  View,
} from 'react-native';
import Camera from './Camera'

const errorCB = (err)=>  {
  console.log(err);
}


const openCB = () => {
  console.log("Database OPENED");
}

const db = openDatabase({
  name: 'SQLite',
  location: 'default',
  createFromLocation: '~data.db',
},  openCB, errorCB);


const App = () => {
  useEffect(() => {
    
  }, []);

  //states
  const [showCam, setShowCam] = useState(true);
  const [scannedBeneficiary, setScannedBeneficiary] = useState({});


  //actions
  const getBeneficiaryData = (hhid) => {
    db.transaction((trans) => {
      trans.executeSql("select * from beneficiaries where hhid = ?", [hhid], (trans, results) => {
        let items = [];
        let rows = results.rows;
        for (let i = 0; i < rows.length; i++) {
          var item = rows.item(i);
          items.push(item);
        }
        console.log(items[0]);
        setScannedBeneficiary(items[0])
        setShowCam(!showCam)
        // setProvinces(items);
      },
      (error) => {
        console.log(error);
      });
    });
  }
  return (
    <View style={{flex: 1, padding: 10}}>
      <View style={{ padding: 20, flex: 1, flexDirection: "row", alignItems: 'center' }}>
        <View style={{flex: 1, alignItems: "center" }}>
          
          { showCam ? <Camera getBeneficiaryData={getBeneficiaryData} /> : <></> }

        <TouchableOpacity
          style={{backgroundColor: "#3498db",padding: 10}}
          onPress={() => {setShowCam(!showCam)}}
        >
          <Text style={{color: "#ecf0f1"}}>Turn { showCam ? "off" : "on" } Camera</Text>
        </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1}}>
        <Text><Text style={{fontWeight: "bold"}}>Last Name:</Text> {scannedBeneficiary.last_name}</Text>
        <Text><Text style={{fontWeight: "bold"}}>First Name:</Text> {scannedBeneficiary.first_name}</Text>
        <Text><Text style={{fontWeight: "bold"}}>Middle Name:</Text> {scannedBeneficiary.middle_name}</Text>
        <Text><Text style={{fontWeight: "bold"}}>Birth Date:</Text> {scannedBeneficiary.birthday}</Text>
        <Text><Text style={{fontWeight: "bold"}}>Mothers Name:</Text> {scannedBeneficiary.last_name}</Text>
        <Text><Text style={{fontWeight: "bold"}}>Mobile Number:</Text> {scannedBeneficiary.mobile}</Text>
        <Text><Text style={{fontWeight: "bold"}}>Province:</Text> {scannedBeneficiary.province}</Text>
        <Text><Text style={{fontWeight: "bold"}}>City:</Text> {scannedBeneficiary.city}</Text>
        <Text><Text style={{fontWeight: "bold"}}>Barangay:</Text> {scannedBeneficiary.barangay}</Text>
        <Text><Text style={{fontWeight: "bold"}}>Branch:</Text> {scannedBeneficiary.branch_name}</Text>
        <Text><Text style={{fontWeight: "bold"}}>Card Number:</Text> {scannedBeneficiary.card_number}</Text>
        <Text><Text style={{fontWeight: "bold"}}>SA Number:</Text> {scannedBeneficiary.sa_account}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
