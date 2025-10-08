import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { style } from './mystyle';

class ruangan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kodeRuangan: '',
      namaRuangan: '',
      listData: [],
      idUpdate: null,
    };
    this.url = 'http://10.59.119.126/crudapitable/api.php';
  }

  componentDidMount() {
    this.ambilData();
  }

  async ambilData() {
    await fetch(this.url)
      .then(response => response.json())
      .then(json => {
        console.log('Hasil yang didapat:' + JSON.stringify(json.data.result));
        this.setState({ listData: json.data.result });
      })
      .catch(error => {
        console.log(error);
      });
  }

  klikSimpan() {
    if (this.state.kodeRuangan == '' || this.state.namaRuangan == '') {
      Alert.alert(
        'Perhatian',
        'Silahkan masukkan kode Ruangan dan nama Ruangan',
      );
    } else {
      var urlAksi;
      if (this.state.idUpdate) {
        urlAksi = this.url + '/?op=update&id=' + this.state.idUpdate;
      } else {
        urlAksi = this.url + '/?op=create';
      }

      fetch(urlAksi, {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:
          'kodeRuangan=' +
          this.state.kodeRuangan +
          '&namaRuangan=' +
          this.state.namaRuangan,
      })
        .then(response => response.json())
        .then(json => {
          this.setState({ kodeRuangan: '', namaRuangan: '', idUpdate: null });
          this.ambilData();
        });
    }
  }

  // Fungsi Delete
  klikDelete(id) {
    Alert.alert('Konfirmasi', 'Apakah Anda yakin ingin menghapus data ini?', [
      {
        text: 'Batal',
        style: 'cancel',
      },
      {
        text: 'Hapus',
        onPress: () => {
          fetch(this.url + '/?op=delete&id=' + id, {
            method: 'post',
          })
            .then(response => response.json())
            .then(json => {
              this.ambilData();
            });
        },
      },
    ]);
  }

  // Fungsi Edit
  klikEdit(id, kodeRuangan, namaRuangan) {
    this.setState({
      kodeRuangan: kodeRuangan,
      namaRuangan: namaRuangan,
      idUpdate: id,
    });
  }

  render() {
    return (
      <SafeAreaView style={style.container}>
        <StatusBar barStyle="dark-content" />
        <ScrollView style={style.scrollView}>
          <View style={style.formContainer}>
            <Text style={style.title}>Form Ruangan</Text>

            <TextInput
              style={style.input}
              placeholder="Masukkan Kode Ruangan"
              placeholderTextColor="#999"
              value={this.state.kodeRuangan}
              onChangeText={text => this.setState({ kodeRuangan: text })}
            />

            <TextInput
              style={style.input}
              placeholder="Masukkan Nama Ruangan"
              placeholderTextColor="#999"
              value={this.state.namaRuangan}
              onChangeText={text => this.setState({ namaRuangan: text })}
            />

            <Button
              title={this.state.idUpdate ? 'Update' : 'SAVE'}
              onPress={() => this.klikSimpan()}
            />
          </View>

          <View style={style.listContainer}>
            <Text style={style.title}>Daftar Ruangan</Text>

            {this.state.listData.map((item, index) => (
              <View key={index} style={style.itemContainer}>
                <View style={style.itemInfo}>
                  <Text style={style.itemCode}>{item.kodeRuangan}</Text>
                  <Text style={style.itemName}>{item.namaRuangan}</Text>
                </View>
                <View style={style.buttonGroup}>
                  <Button
                    title="Edit"
                    onPress={() =>
                      this.klikEdit(item.id, item.kodeRuangan, item.namaRuangan)
                    }
                  />
                  <View style={style.buttonSpacer} />
                  <Button
                    title="Delete"
                    color="red"
                    onPress={() => this.klikDelete(item.id)}
                  />
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default ruangan;
