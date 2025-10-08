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

class pasiens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NomorRekamMedis: '',
      namaPasien: '',
      tanggalLahir: '',
      jenisKelamin: 'L',
      alamatPasien: '',
      kotaPasien: '',
      usiaPasien: '',
      penyakitPasien: '',
      idDokter: '',
      tanggalMasuk: '',
      nomorKamar: '',
      listData: [],
      idUpdate: null,
      showDateModalLahir: false,
      showDateModalMasuk: false,
      showGenderModal: false,
      selectedYear: 1990,
      selectedMonth: 1,
      selectedDay: 1,
    };
    this.url = 'http://10.59.119.126/crudapipasien/api.php';
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
      showDateModalLahir: false,
    });
  };

  setTanggalMasuk = () => {
    const year = this.state.selectedYear;
    const month = String(this.state.selectedMonth).padStart(2, '0');
    const day = String(this.state.selectedDay).padStart(2, '0');
    this.setState({
      tanggalMasuk: `${year}-${month}-${day}`,
      showDateModalMasuk: false,
    });
  };

  setJenisKelamin = gender => {
    this.setState({
      jenisKelamin: gender,
      showGenderModal: false,
    });
  };

  klikSimpan() {
    if (
      this.state.NomorRekamMedis == '' ||
      this.state.namaPasien == '' ||
      this.state.tanggalLahir == ''
    ) {
      Alert.alert(
        'Perhatian',
        'Silahkan lengkapi minimal Nomor Rekam Medis, Nama, dan Tanggal Lahir',
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
          'NomorRekamMedis=' +
          this.state.NomorRekamMedis +
          '&namaPasien=' +
          this.state.namaPasien +
          '&tanggalLahir=' +
          this.state.tanggalLahir +
          '&jenisKelamin=' +
          this.state.jenisKelamin +
          '&alamatPasien=' +
          this.state.alamatPasien +
          '&kotaPasien=' +
          this.state.kotaPasien +
          '&usiaPasien=' +
          this.state.usiaPasien +
          '&penyakitPasien=' +
          this.state.penyakitPasien +
          '&idDokter=' +
          this.state.idDokter +
          '&tanggalMasuk=' +
          this.state.tanggalMasuk +
          '&nomorKamar=' +
          this.state.nomorKamar,
      })
        .then(response => response.json())
        .then(json => {
          this.setState({
            NomorRekamMedis: '',
            namaPasien: '',
            tanggalLahir: '',
            jenisKelamin: 'L',
            alamatPasien: '',
            kotaPasien: '',
            usiaPasien: '',
            penyakitPasien: '',
            idDokter: '',
            tanggalMasuk: '',
            nomorKamar: '',
            idUpdate: null,
          });
          this.ambilData();
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
    NomorRekamMedis,
    namaPasien,
    tanggalLahir,
    jenisKelamin,
    alamatPasien,
    kotaPasien,
    usiaPasien,
    penyakitPasien,
    idDokter,
    tanggalMasuk,
    nomorKamar,
  ) {
    this.setState({
      NomorRekamMedis: NomorRekamMedis,
      namaPasien: namaPasien,
      tanggalLahir: tanggalLahir,
      jenisKelamin: jenisKelamin,
      alamatPasien: alamatPasien,
      kotaPasien: kotaPasien,
      usiaPasien: usiaPasien,
      penyakitPasien: penyakitPasien,
      idDokter: idDokter,
      tanggalMasuk: tanggalMasuk,
      nomorKamar: nomorKamar,
      idUpdate: id,
    });
  }

  render() {
    const years = Array.from({ length: 70 }, (_, i) => 1960 + i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    return (
      <SafeAreaView style={style.container}>
        <StatusBar barStyle="dark-content" />
        <ScrollView style={style.scrollView}>
          <View style={style.formContainer}>
            <Text style={style.title}>Form Pasien</Text>

            <TextInput
              style={style.input}
              placeholder="Masukkan Nomor Rekam Medis"
              placeholderTextColor="#999"
              value={this.state.NomorRekamMedis}
              onChangeText={text => this.setState({ NomorRekamMedis: text })}
            />

            <TextInput
              style={style.input}
              placeholder="Masukkan Nama Pasien"
              placeholderTextColor="#999"
              value={this.state.namaPasien}
              onChangeText={text => this.setState({ namaPasien: text })}
            />

            <TouchableOpacity
              style={[style.input, { justifyContent: 'center' }]}
              onPress={() => this.setState({ showDateModalLahir: true })}
            >
              <Text
                style={{ color: this.state.tanggalLahir ? '#000' : '#999' }}
              >
                {this.state.tanggalLahir ||
                  'Pilih Tanggal Lahir'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[style.input, { justifyContent: 'center' }]}
              onPress={() => this.setState({ showGenderModal: true })}
            >
              <Text
                style={{ color: this.state.jenisKelamin ? '#000' : '#999' }}
              >
                {this.state.jenisKelamin === 'L'
                  ? 'Laki-laki'
                  : this.state.jenisKelamin === 'P'
                  ? 'Perempuan'
                  : 'Pilih Jenis Kelamin'}
              </Text>
            </TouchableOpacity>

            <TextInput
              style={style.input}
              placeholder="Masukkan Alamat Pasien"
              placeholderTextColor="#999"
              value={this.state.alamatPasien}
              onChangeText={text => this.setState({ alamatPasien: text })}
            />

            <TextInput
              style={style.input}
              placeholder="Masukkan Kota Pasien"
              placeholderTextColor="#999"
              value={this.state.kotaPasien}
              onChangeText={text => this.setState({ kotaPasien: text })}
            />

            <TextInput
              style={style.input}
              placeholder="Masukkan Usia Pasien"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={this.state.usiaPasien}
              onChangeText={text => this.setState({ usiaPasien: text })}
            />

            <TextInput
              style={style.input}
              placeholder="Masukkan Penyakit"
              placeholderTextColor="#999"
              value={this.state.penyakitPasien}
              onChangeText={text => this.setState({ penyakitPasien: text })}
            />

            <TextInput
              style={style.input}
              placeholder="Masukkan ID Dokter"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={this.state.idDokter}
              onChangeText={text => this.setState({ idDokter: text })}
            />

            <TouchableOpacity
              style={[style.input, { justifyContent: 'center' }]}
              onPress={() => this.setState({ showDateModalMasuk: true })}
            >
              <Text
                style={{ color: this.state.tanggalMasuk ? '#000' : '#999' }}
              >
                {this.state.tanggalMasuk ||
                  'Pilih Tanggal Masuk RS'}
              </Text>
            </TouchableOpacity>

            <TextInput
              style={style.input}
              placeholder="Masukkan Nomor Kamar"
              placeholderTextColor="#999"
              value={this.state.nomorKamar}
              onChangeText={text => this.setState({ nomorKamar: text })}
            />

            <Button
              title={this.state.idUpdate ? 'Update Data' : 'Simpan Data'}
              onPress={() => this.klikSimpan()}
            />
          </View>

          {/* Modal Jenis Kelamin */}
          <Modal
            visible={this.state.showGenderModal}
            transparent={true}
            animationType="fade"
          >
            <View style={styles.modalOverlay}>
              <View style={styles.genderModalContent}>
                <Text style={styles.modalTitle}>Pilih Jenis Kelamin</Text>

                <TouchableOpacity
                  style={[
                    styles.genderOption,
                    this.state.jenisKelamin === 'L' &&
                      styles.genderOptionSelected,
                  ]}
                  onPress={() => this.setJenisKelamin('L')}
                >
                  <Text
                    style={[
                      styles.genderText,
                      this.state.jenisKelamin === 'L' &&
                        styles.genderTextSelected,
                    ]}
                  >
                    Laki-laki
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.genderOption,
                    this.state.jenisKelamin === 'P' &&
                      styles.genderOptionSelected,
                  ]}
                  onPress={() => this.setJenisKelamin('P')}
                >
                  <Text
                    style={[
                      styles.genderText,
                      this.state.jenisKelamin === 'P' &&
                        styles.genderTextSelected,
                    ]}
                  >
                    Perempuan
                  </Text>
                </TouchableOpacity>

                <View style={styles.modalButtons}>
                  <Button
                    title="Batal"
                    onPress={() => this.setState({ showGenderModal: false })}
                    color="#999"
                  />
                </View>
              </View>
            </View>
          </Modal>

          {/* Modal Tanggal Lahir */}
          <Modal
            visible={this.state.showDateModalLahir}
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
                    onPress={() => this.setState({ showDateModalLahir: false })}
                    color="#999"
                  />
                  <Button title="OK" onPress={this.setTanggalLahir} />
                </View>
              </View>
            </View>
          </Modal>

          {/* Modal Tanggal Masuk */}
          <Modal
            visible={this.state.showDateModalMasuk}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Pilih Tanggal Masuk</Text>

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
                    onPress={() => this.setState({ showDateModalMasuk: false })}
                    color="#999"
                  />
                  <Button title="OK" onPress={this.setTanggalMasuk} />
                </View>
              </View>
            </View>
          </Modal>

          <View style={style.listContainer}>
            <Text style={style.title}>Daftar Pasien</Text>

            {this.state.listData.map((item, index) => (
              <View key={index} style={style.itemContainer}>
                <View style={style.itemInfo}>
                  <Text style={style.itemCode}>
                    {item.NomorRekamMedis} - {item.namaPasien}
                  </Text>
                  <Text style={style.itemName}>
                    {item.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'},{' '}
                    {item.usiaPasien} tahun
                  </Text>
                  <Text style={style.itemDetail}>
                    Penyakit: {item.penyakitPasien}
                  </Text>
                  <Text style={style.itemDetail}>
                    Kamar: {item.nomorKamar || '-'} | Dokter ID: {item.idDokter}
                  </Text>
                </View>
                <View style={style.buttonGroup}>
                  <Button
                    title="Edit"
                    onPress={() =>
                      this.klikEdit(
                        item.id,
                        item.NomorRekamMedis,
                        item.namaPasien,
                        item.tanggalLahir,
                        item.jenisKelamin,
                        item.alamatPasien,
                        item.kotaPasien,
                        item.usiaPasien,
                        item.penyakitPasien,
                        item.idDokter,
                        item.tanggalMasuk,
                        item.nomorKamar,
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
  genderModalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  genderOption: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  genderOptionSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  genderText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  genderTextSelected: {
    color: 'white',
    fontWeight: 'bold',
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

export default pasiens;
