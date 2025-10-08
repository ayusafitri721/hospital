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
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import { style } from './mystyle';

class dokters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idDokter: '',
      namaDokter: '',
      tanggalLahir: '',
      spesialisasi: '',
      lokasiPraktik: '',
      jamPraktik: '',
      listData: [],
      idUpdate: null,
      showDateModal: false,
      showTimeModal: false,
      selectedYear: 1990,
      selectedMonth: 1,
      selectedDay: 1,
      selectedHour: 8,
      selectedMinute: 0,
    };
    this.url = 'http://10.59.119.126/crudapidokters/api.php';
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

  setTanggalLahir = () => {
    const year = this.state.selectedYear;
    const month = String(this.state.selectedMonth).padStart(2, '0');
    const day = String(this.state.selectedDay).padStart(2, '0');
    this.setState({
      tanggalLahir: `${year}-${month}-${day}`,
      showDateModal: false,
    });
  };

  setJamPraktik = () => {
    const hour = String(this.state.selectedHour).padStart(2, '0');
    const minute = String(this.state.selectedMinute).padStart(2, '0');
    this.setState({
      jamPraktik: `${hour}:${minute}`,
      showTimeModal: false,
    });
  };

  klikSimpan() {
    if (
      this.state.idDokter == '' ||
      this.state.namaDokter == '' ||
      this.state.tanggalLahir == ''
    ) {
      Alert.alert(
        'Perhatian',
        'Silahkan lengkapi minimal ID Dokter, Nama, dan Tanggal Lahir',
      );
    } else {
      var urlAksi;
      if (this.state.idUpdate) {
        urlAksi = this.url + '/?op=update&id=' + this.state.idUpdate;
      } else {
        urlAksi = this.url + '/?op=create';
      }

      console.log('URL:', urlAksi);
      console.log('Data yang dikirim:', {
        idDokter: this.state.idDokter,
        namaDokter: this.state.namaDokter,
        tanggalLahir: this.state.tanggalLahir,
        spesialisasi: this.state.spesialisasi,
        lokasiPraktik: this.state.lokasiPraktik,
        jamPraktik: this.state.jamPraktik,
      });

      fetch(urlAksi, {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:
          'idDokter=' +
          encodeURIComponent(this.state.idDokter) +
          '&namaDokter=' +
          encodeURIComponent(this.state.namaDokter) +
          '&tanggalLahir=' +
          encodeURIComponent(this.state.tanggalLahir) +
          '&spesialisasi=' +
          encodeURIComponent(this.state.spesialisasi) +
          '&lokasiPraktik=' +
          encodeURIComponent(this.state.lokasiPraktik) +
          '&jamPraktik=' +
          encodeURIComponent(this.state.jamPraktik),
      })
        .then(response => {
          console.log('Response status:', response.status);
          console.log('Response OK?:', response.ok);
          return response.text();
        })
        .then(text => {
          console.log('======= RAW RESPONSE START =======');
          console.log(text);
          console.log('======= RAW RESPONSE END =======');

          const cleanText = text.trim();

          try {
            const json = JSON.parse(cleanText);
            console.log('Parsed JSON:', json);

            if (json.status === 'success') {
              Alert.alert('Sukses', json.message || 'Data berhasil disimpan!');
              this.setState({
                idDokter: '',
                namaDokter: '',
                tanggalLahir: '',
                spesialisasi: '',
                lokasiPraktik: '',
                jamPraktik: '',
                idUpdate: null,
              });
              this.ambilData();
            } else {
              Alert.alert('Error', json.message || 'Gagal menyimpan data');
            }
          } catch (e) {
            console.log('=== JSON PARSE ERROR ===');
            console.log('Error:', e.message);
            Alert.alert(
              'Error',
              'Response dari server tidak valid: ' +
                cleanText.substring(0, 100),
            );
          }
        })
        .catch(error => {
          console.log('=== FETCH ERROR ===');
          console.log('Error:', error);
          Alert.alert('Error', 'Gagal koneksi: ' + error.message);
        });
    }
  }

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

  klikEdit(
    id,
    idDokter,
    namaDokter,
    tanggalLahir,
    spesialisasi,
    lokasiPraktik,
    jamPraktik,
  ) {
    this.setState({
      idDokter: idDokter || '',
      namaDokter: namaDokter || '',
      tanggalLahir: tanggalLahir || '',
      spesialisasi: spesialisasi || '',
      lokasiPraktik: lokasiPraktik || '',
      jamPraktik: jamPraktik || '',
      idUpdate: id,
    });
  }

  render() {
    const years = Array.from({ length: 70 }, (_, i) => 1960 + i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = Array.from({ length: 60 }, (_, i) => i);

    return (
      <SafeAreaView style={style.container}>
        <StatusBar barStyle="dark-content" />
        <ScrollView style={style.scrollView}>
          <View style={style.formContainer}>
            <Text style={style.title}>Form Dokter</Text>

            <TextInput
              style={style.input}
              placeholder="Masukkan ID Dokter"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={this.state.idDokter}
              onChangeText={text => this.setState({ idDokter: text })}
            />

            <TextInput
              style={style.input}
              placeholder="Masukkan Nama Dokter"
              placeholderTextColor="#999"
              value={this.state.namaDokter}
              onChangeText={text => this.setState({ namaDokter: text })}
            />

            <TouchableOpacity
              style={[style.input, { justifyContent: 'center' }]}
              onPress={() => this.setState({ showDateModal: true })}
            >
              <Text
                style={{ color: this.state.tanggalLahir ? '#000' : '#999' }}
              >
                {this.state.tanggalLahir ||
                  'Pilih Tanggal Lahir'}
              </Text>
            </TouchableOpacity>

            <TextInput
              style={style.input}
              placeholder="Masukkan Spesialisasi"
              placeholderTextColor="#999"
              value={this.state.spesialisasi}
              onChangeText={text => this.setState({ spesialisasi: text })}
            />

            <TextInput
              style={style.input}
              placeholder="Masukkan Lokasi Praktik"
              placeholderTextColor="#999"
              value={this.state.lokasiPraktik}
              onChangeText={text => this.setState({ lokasiPraktik: text })}
            />

            <TouchableOpacity
              style={[style.input, { justifyContent: 'center' }]}
              onPress={() => this.setState({ showTimeModal: true })}
            >
              <Text style={{ color: this.state.jamPraktik ? '#000' : '#999' }}>
                {this.state.jamPraktik ||
                  'Pilih Jam Praktik'}
              </Text>
            </TouchableOpacity>

            <Button
              title={this.state.idUpdate ? 'Update Data' : 'Simpan Data'}
              onPress={() => this.klikSimpan()}
            />
          </View>

          {/* Modal Tanggal Lahir */}
          <Modal
            visible={this.state.showDateModal}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Pilih Tanggal Lahir</Text>

                <View style={styles.pickerRow}>
                  <View style={styles.pickerColumn}>
                    <Text style={styles.pickerLabel}>Tahun</Text>
                    <ScrollView style={styles.scrollPicker}>
                      {years.map(year => (
                        <TouchableOpacity
                          key={year}
                          style={[
                            styles.pickerItem,
                            this.state.selectedYear === year &&
                              styles.pickerItemSelected,
                          ]}
                          onPress={() => this.setState({ selectedYear: year })}
                        >
                          <Text
                            style={
                              this.state.selectedYear === year &&
                              styles.pickerTextSelected
                            }
                          >
                            {year}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>

                  <View style={styles.pickerColumn}>
                    <Text style={styles.pickerLabel}>Bulan</Text>
                    <ScrollView style={styles.scrollPicker}>
                      {months.map(month => (
                        <TouchableOpacity
                          key={month}
                          style={[
                            styles.pickerItem,
                            this.state.selectedMonth === month &&
                              styles.pickerItemSelected,
                          ]}
                          onPress={() =>
                            this.setState({ selectedMonth: month })
                          }
                        >
                          <Text
                            style={
                              this.state.selectedMonth === month &&
                              styles.pickerTextSelected
                            }
                          >
                            {month}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>

                  <View style={styles.pickerColumn}>
                    <Text style={styles.pickerLabel}>Tanggal</Text>
                    <ScrollView style={styles.scrollPicker}>
                      {days.map(day => (
                        <TouchableOpacity
                          key={day}
                          style={[
                            styles.pickerItem,
                            this.state.selectedDay === day &&
                              styles.pickerItemSelected,
                          ]}
                          onPress={() => this.setState({ selectedDay: day })}
                        >
                          <Text
                            style={
                              this.state.selectedDay === day &&
                              styles.pickerTextSelected
                            }
                          >
                            {day}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                </View>

                <View style={styles.modalButtons}>
                  <Button
                    title="Batal"
                    onPress={() => this.setState({ showDateModal: false })}
                    color="#999"
                  />
                  <Button title="OK" onPress={this.setTanggalLahir} />
                </View>
              </View>
            </View>
          </Modal>

          {/* Modal Jam Praktik */}
          <Modal
            visible={this.state.showTimeModal}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Pilih Jam Praktik</Text>

                <View style={styles.pickerRow}>
                  <View style={styles.pickerColumn}>
                    <Text style={styles.pickerLabel}>Jam</Text>
                    <ScrollView style={styles.scrollPicker}>
                      {hours.map(hour => (
                        <TouchableOpacity
                          key={hour}
                          style={[
                            styles.pickerItem,
                            this.state.selectedHour === hour &&
                              styles.pickerItemSelected,
                          ]}
                          onPress={() => this.setState({ selectedHour: hour })}
                        >
                          <Text
                            style={
                              this.state.selectedHour === hour &&
                              styles.pickerTextSelected
                            }
                          >
                            {String(hour).padStart(2, '0')}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>

                  <View style={styles.pickerColumn}>
                    <Text style={styles.pickerLabel}>Menit</Text>
                    <ScrollView style={styles.scrollPicker}>
                      {minutes
                        .filter(m => m % 5 === 0)
                        .map(minute => (
                          <TouchableOpacity
                            key={minute}
                            style={[
                              styles.pickerItem,
                              this.state.selectedMinute === minute &&
                                styles.pickerItemSelected,
                            ]}
                            onPress={() =>
                              this.setState({ selectedMinute: minute })
                            }
                          >
                            <Text
                              style={
                                this.state.selectedMinute === minute &&
                                styles.pickerTextSelected
                              }
                            >
                              {String(minute).padStart(2, '0')}
                            </Text>
                          </TouchableOpacity>
                        ))}
                    </ScrollView>
                  </View>
                </View>

                <View style={styles.modalButtons}>
                  <Button
                    title="Batal"
                    onPress={() => this.setState({ showTimeModal: false })}
                    color="#999"
                  />
                  <Button title="OK" onPress={this.setJamPraktik} />
                </View>
              </View>
            </View>
          </Modal>

          <View style={style.listContainer}>
            <Text style={style.title}>Daftar Dokter</Text>

            {this.state.listData.map((item, index) => (
              <View key={index} style={style.itemContainer}>
                <View style={style.itemInfo}>
                  <Text style={style.itemCode}>Dr. {item.namaDokter}</Text>
                  <Text style={style.itemName}>
                    Spesialisasi: {item.spesialisasi || '-'}
                  </Text>
                  <Text style={style.itemDetail}>
                    TTL: {item.tanggalLahir} | Jam: {item.jamPraktik || '-'}
                  </Text>
                  <Text style={style.itemDetail}>
                    Lokasi: {item.lokasiPraktik || '-'}
                  </Text>
                </View>
                <View style={style.buttonGroup}>
                  <Button
                    title="Edit"
                    onPress={() =>
                      this.klikEdit(
                        item.id,
                        item.idDokter,
                        item.namaDokter,
                        item.tanggalLahir,
                        item.spesialisasi,
                        item.lokasiPraktik,
                        item.jamPraktik,
                      )
                    }
                  />
                  <View style={style.buttonSpacer} />
                  <Button
                    title="Hapus"
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

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  pickerColumn: {
    flex: 1,
    marginHorizontal: 5,
  },
  pickerLabel: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  scrollPicker: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginTop: 5,
  },
  pickerItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  pickerItemSelected: {
    backgroundColor: '#007AFF',
  },
  pickerTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default dokters;
