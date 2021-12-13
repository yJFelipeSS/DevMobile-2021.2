import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { WebView } from 'react-native-webview';


export default function Email({ route }) {
    const { id } = route.params;
    const [info, setInfo] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        fetch('https://mobile.ect.ufrn.br:3002/emails/' + id)
            .then(response => response.json())
            .then(receivedInfo => setInfo(receivedInfo));
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.header}>
                <Text style={styles.headerTittle}>{info.tittle}</Text>
                <Icon name={info.star ? 'star' : 'staro'} size={18} color={info.star ? "#EEAD2D" : "#fff"} />
            </View>
            <View style={styles.emailSendingInfo}>
                <Image style={styles.picture} source={{ uri: info.picture }}></Image>
                <View>
                    <Text style={styles.emailFrom}>{info.from}</Text>
                    <Text style={styles.emailReceiver}>para {info.to}</Text>
                </View>
                <Text style={styles.emailReceiver}>{info.time}</Text>
            </View>
            <View
                style={{
                    borderBottomColor: '#fff',
                    borderBottomWidth: 1,
                    marginHorizontal: 10,
                    opacity: 0.2
                }}
            />
            <WebView
                style={styles.emailBody}
                // O meta é utilizado para deixar o texto num tamanho "aceitável"
                source={{ html: '<meta name="viewport" content="width=device-width, initial-scale=1">' + info.body }}
                scrollEnabled={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#333',
    },
    header: {
        height: 50,

        margin: 18,

        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerTittle: {
        fontSize: 16,
        color: '#fff',
    },
    emailSendingInfo: {
        flexDirection: 'row',

        marginBottom: 12,
    },
    picture: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,

        marginLeft: 20,
        marginRight: 10,

        alignContent: 'center',
    },
    emailFrom: {
        marginRight: 60,
        fontWeight: 'bold',
        fontSize: 14,
        color: '#fff',
    },
    emailReceiver: {
        color: '#777',
        fontSize: 12,
    },
    emailBody: {
        borderRadius: 4,
        margin: 10,

        backgroundColor: 'transparent',
    }
})